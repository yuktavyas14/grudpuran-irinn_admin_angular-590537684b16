import { Location } from '@angular/common';
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
  selector: 'app-add-sub-header',
  templateUrl: './add-sub-header.component.html',
  styleUrls: ['./add-sub-header.component.scss'],
  providers:[Location]
})
export class AddSubHeaderComponent implements OnInit {
 
  addForm: FormGroup | any;
  fileToUpload: any = null;
  menuId: any;
  subMenuId: any;
  pageList:any;
  headerType:any;
  isImageSize= false
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
    private _location:Location,
    private langService: LanguageService,


  ) {
    this._ac.paramMap.subscribe((param) => {
      this.subMenuId = param.get('subMenuId');
      this.menuId = param.get('menuId');
      this.langId = param.get('langId');

    this.getAllPage();

      //alert(this.matchId)
    });
    if (this.subMenuId) {
      
      this.addForm = this.fb.group({
        name: new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        url: new FormControl(''),
        pageId: new FormControl(''),
        languageId: new FormControl([this.langId],[Validators.required]),
        position: new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator()]),
      });
       this.uService.isLoading = true;
       this.getDataById();
   
    } else {
      this.addForm = this.fb.group({
        name: new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator(),Validators.minLength(2)]),
        url: new FormControl(''),
        pageId: new FormControl(''),
        languageId: new FormControl(['1'],[Validators.required]),
        position: new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator()]),
      });
    }
  }

  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
  }
  onBack(){
    this._location.back();

  }
  onCancel(){
    this.router.navigate(['/menu/sub-menu/',this.menuId]);

  }

 
  onSubmit() {
    console.log(this.addForm.value);
    if( this.addForm.value.pageId =='' && this.addForm.value.url == ''){
      this._toastr.error('page or Url one field is reuired')
      return
    }
    // if( this.headerType=='2'){
    //   this.addForm.patchValue({
    //     pgid:0
    //   })

    // }
    // if (this.addForm.invalid) {
    //   this.addForm.markAllAsTouched();
    //   return;
    // }
     this.uService.isLoading = true;

    const formData = new FormData();
    formData.append('name', this.addForm.value.name.trim().toString());
    formData.append('url', this.addForm.value.url.trim().toString());
    formData.append('position', this.addForm.value.position.toString());
    formData.append('menuId', this.menuId.trim().toString());
    formData.append('pageId', this.addForm.value.pageId.trim().toString());
    formData.append('languageId', this.addForm.value.languageId);

    console.log(formData, 'formdata');
    this.service.addSubMenu(formData).subscribe((data: any) => {
       this.uService.isLoading = false;

      if (data.status) {
      this._toastr.success(data.message)
        this.router.navigate(['/menu/sub-menu/',this.menuId]);
      } else {
        this._toastr.error(data.message)
      }
    },
    error=>{
      this.uService.isLoading = false;
      this._toastr.error(error.error.message)
    }
    );
  }


 
  onUpdate() {
    if( this.addForm.value.pageId =='' && this.addForm.value.headerRedirectUrl == ''){
      this._toastr.error('page or Url one field is reuired')
      return
    }
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }
    console.log(this.addForm.value,"!!!")
     this.uService.isLoading = true;

    const formData = new FormData();
    formData.append('name', this.addForm.value.name.trim().toString());
    formData.append('url', this.addForm.value.url.trim().toString());
    formData.append('position', this.addForm.value.position.toString());
    formData.append('menuId', this.menuId.trim().toString());
    formData.append('pageId', this.addForm.value.pageId.toString());
    formData.append('languageId', this.addForm.value.languageId);

    this.service
      .updateSubMenuById(formData, this.subMenuId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
      this._toastr.success(data.message)

          this.router.navigate(['/menu/sub-menu/',this.menuId]);

        } else {
        this._toastr.error(data.message)

        }
      },
      error=>{

        this.uService.isLoading = false;
        this._toastr.error(error.error.message)
      }
      );
  }

  onReset(){
    this.headerType=null;
    this.addForm.reset();
    this.addForm.patchValue({
      pageId:''
    })
  }
  onSelectPageType(type:any){
    this.addForm.patchValue({
      pageId: '',
    });
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
    const formData = new FormData();
   
    formData.append('id', this.subMenuId);
    this.languageId=this.addForm.value.languageId
    this.service.subMenuById(formData).subscribe((res: any) => {
      this.uService.isLoading = false;
     let pageId='';
     this.headerType=  res.data.headerType;
     if(res.data.pageId){
       pageId = res.data.pageId.pageId
     }
     this.addForm.patchValue({
       name: res.data.name,
       url: res.data.url,
       position: res.data.position,
       pageId:pageId,
       languageId: res?.data?.languageId || this.langId,
     });
   });
   
    
    
  }

}
