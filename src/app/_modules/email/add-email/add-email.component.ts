import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from 'src/app/_services/email.service';
import { LanguageService } from 'src/app/_services/language.service';
import { MenuService } from 'src/app/_services/menu.service';
import { PagesService } from 'src/app/_services/pages.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { ValidationService } from 'src/app/_services/validation.service';

@Component({
  selector: 'app-add-email',
  templateUrl: './add-email.component.html',
  styleUrls: ['./add-email.component.scss']
})
export class AddEmailComponent implements OnInit {

  addForm: FormGroup | any;
  fileToUpload: any = null;
  headerId: any;
  pageList:any;
  headerType:any;
  languageId:any='1'
  languageList:any;
  langId: any;
  constructor(
    private fb: FormBuilder,
    private service: EmailService,
    private pageService:PagesService,
    private uService: UtilitydesignService,
    private _ac: ActivatedRoute,
    private router: Router,
    private validationService:ValidationService,
    private _toastr:ToastrService,
    private langService: LanguageService,

  ) {
    this._ac.paramMap.subscribe((param) => {
      this.headerId = param.get('id');
      this.langId = param.get('langId');

    this.getAllPage();

      //alert(this.matchId)
    });

    if (this.headerId) {
      this.addForm = this.fb.group({
        sentFrom: new FormControl('', [Validators.required, ]),
        pageContent: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(10)]),
        sentTo: new FormControl("", [Validators.required]),
        subject: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        type: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),

        // headerPosition: new FormControl('',[Validators.required]),
        // languageId: new FormControl([this.langId],[Validators.required]),
        // pgid: new FormControl(''),
      });
      this.getDataById();
       this.uService.isLoading = true;
      this.addForm.controls['type'].disable();

    } else {
      this.addForm = this.fb.group({
        sentFrom: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        pageContent: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(10)]),
        sentTo: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        subject: new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        type: new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),

        // headerPosition: new FormControl('',[Validators.required]),
        // pgid: new FormControl(''),
        // languageId: new FormControl('1',[Validators.required]),


      });
    }
  }

  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
  }
  onCancel(){
    this.router.navigate(['/menu/master-menu'])
  }

  openurl(){
    let url:any="/global-setting/editor-gallery";
    this.router.navigate([url])
    // window.open(url, "_blank")
  }


  onSubmit() {
    console.log(this.addForm.value);
    if( this.addForm.value.pgid =='' && this.addForm.value.headerRedirectUrl == ''){
      this._toastr.error('page or Url one field is reuired')
      return
    }
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }
     this.uService.isLoading = true;

    const formData = new FormData();
    formData.append('sentFrom', this.addForm.value.sentFrom.trim());
    formData.append('sentTo', this.addForm.value.sentTo.trim());
    // formData.append('headerType', this.addForm.value.headerType.trim());
    formData.append('content', this.addForm.value.pageContent);
    // formData.append('url', this.addForm.value.headerRedirectUrl.trim());
    formData.append('subject', this.addForm.value.subject);
    formData.append('type', this.addForm.value.type.trim());
    // formData.append('languageId', this.addForm.value.languageId);

    console.log(formData, 'formdata');
    this.service.addEmail(formData).subscribe((data: any) => {
       this.uService.isLoading = false;

      if (data.status) {
        this.router.navigate(['/menu/master-menu']);
      } else {
      }
    },
    error=>{
      this.uService.isLoading = false;
    }
    );
  }
  onUpdate() {

    console.log(this.addForm.value);
    // if( this.addForm.value.pgid =='' && this.addForm.value.headerRedirectUrl == ''){
    //   this._toastr.error('page or Url one field is reuired')
    //   return
    // }
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }
     this.uService.isLoading = true;

    const formData = new FormData();
    formData.append('sentFrom', this.addForm.value.sentFrom.trim());
    formData.append('sentTo', this.addForm.value.sentTo.trim());
    // formData.append('headerType', this.addForm.value.headerType.trim());
    formData.append('content', this.addForm.value.pageContent);
    // formData.append('url', this.addForm.value.headerRedirectUrl.trim());
    formData.append('subject', this.addForm.value.subject);
    formData.append('type', this.addForm.value.type.trim());

    this.service
      .updateEmailById(formData, this.headerId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/email']);
        } else {
        }
      },
      error=>{
        this.uService.isLoading = false;
      }
      );
  }

  onReset(){
    this.headerType=null;
    this.addForm.reset();
    this.addForm.patchValue({
      headerType:'',
      pgid:''
    })
  }
  onSelectPageType(type:any){
    this.addForm.patchValue({
      headerRedirectUrl:'',
      pgid: '',
    });
    this.headerType= type.value;
  }

  getAllPage(){
      this.uService.isLoading= true;
    this.pageService.getAllPage().subscribe((res:any)=>{
      this.uService.isLoading= false;
    if(res.status){
      this.pageList= res.data.filter((page:any) => page.status== true);
      console.log(this.pageList)

    }else{

    }

    },
    error=>{
      this.uService.isLoading= false;
    }
    )

  }
  getDataById(){

    this.languageId=this.addForm.value.languageId
    this.service.getEmailById(this.headerId).subscribe((res: any) => {
      console.log(res)
      this.uService.isLoading = false;
     let pageId='';
     this.headerType=  res.data.headerType;
     if(res.data.pageid){
       pageId = res.data.pageid.pageid
     }
     this.addForm.patchValue({
       sentFrom: res.data.sentFrom,
       sentTo: res.data.sentTo,
       subject: res.data.subject,
       type: res.data.type,
      //  headerRedirectUrl: res.data.url,
      //  headerPosition: res.data.position,
       pageContent: res.data.content,
      //  languageId: res?.data?.languageId || this.langId,
     });
   });

  }
}

