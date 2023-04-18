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
import { LanguageService } from 'src/app/_services/language.service';
import { MenuService } from 'src/app/_services/menu.service';
import { PagesService } from 'src/app/_services/pages.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { ValidationService } from 'src/app/_services/validation.service';

@Component({
  selector: 'app-add-master-menu',
  templateUrl: './add-master-menu.component.html',
  styleUrls: ['./add-master-menu.component.scss']
})
export class AddMasterMenuComponent implements OnInit {

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
    private service: MenuService,
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
        headerName: new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        headerRedirectUrl: new FormControl(''),
        headerPosition: new FormControl('',[Validators.required]),
        languageId: new FormControl([this.langId],[Validators.required]),
        pgid: new FormControl(''),
      });
      this.getDataById();
       this.uService.isLoading = true;

     
    } else {
      this.addForm = this.fb.group({
        headerName: new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        headerRedirectUrl: new FormControl(''),
        headerPosition: new FormControl('',[Validators.required]),
        pgid: new FormControl(''),
        languageId: new FormControl('1',[Validators.required]),

         
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
    formData.append('name', this.addForm.value.headerName.trim());
    // formData.append('headerType', this.addForm.value.headerType.trim());
    formData.append('url', this.addForm.value.headerRedirectUrl.trim());
    formData.append('position', this.addForm.value.headerPosition);
    formData.append('pageId', this.addForm.value.pgid.trim());
    formData.append('languageId', this.addForm.value.languageId);

    console.log(formData, 'formdata');
    this.service.addMainHeader(formData).subscribe((data: any) => {
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
    formData.append('name', this.addForm.value.headerName.trim());
    // formData.append('headerType', this.addForm.value.headerType.trim());
    formData.append('url', this.addForm.value.headerRedirectUrl.trim());
    formData.append('position', this.addForm.value.headerPosition);
    formData.append('languageId', this.addForm.value.languageId);
    formData.append('pageid', this.addForm.value.pgid.trim());

    this.service
      .updateMasterMenuById(formData, this.headerId)
      .subscribe((data: any) => {
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
    this.service.getMasterMenuById(this.headerId).subscribe((res: any) => {
      this.uService.isLoading = false;
     let pageId='';
     this.headerType=  res.data.headerType;
     if(res.data.pageid){
       pageId = res.data.pageid.pageid
     }
     this.addForm.patchValue({
       headerName: res.data.name,
       headerRedirectUrl: res.data.url,
       headerPosition: res.data.position,
       pgid:res.data.pageId ? res.data.pageId.pageId : '',
       languageId: res?.data?.languageId || this.langId,
     });
   });
    
  }
}
