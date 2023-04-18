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
  selector: 'app-add-menu-list',
  templateUrl: './add-menu-list.component.html',
  styleUrls: ['./add-menu-list.component.scss']
})
export class AddMenuListComponent implements OnInit {

  addForm: FormGroup | any;
  fileToUpload: any = null;
  headerId: any;
  masterMenuId: any;
  pageList:any;
  headerType:any;
  isImageSize= false
  languageId:any='1'
  languageList:any;
  langId: any;
  showImageNameFile = true;
  updateDataById : any;
  errorMsg = 'File must be pdf'
  pdf = false;
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
      this.masterMenuId = param.get('masterHeaderId');
      this.headerId = param.get('menuId');
      this.langId = param.get('langId');

    this.getAllPage();

      //alert(this.matchId)
    });
    if (this.headerId) {

      this.addForm = this.fb.group({
        headerName: new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        // headerType: new FormControl('',Validators.required),
        headerRedirectUrl: new FormControl('',[this.validationService.noWhitespaceValidator()]),
        headerPosition: new FormControl('',[Validators.required]),
        pgid: new FormControl(''),
        languageId: new FormControl([this.langId],[Validators.required]),
      });
       this.uService.isLoading = true;
       this.getDataById();

    } else {
      this.addForm = this.fb.group({
        headerName: new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        // headerType: new FormControl('',Validators.required),
        headerRedirectUrl: new FormControl('',[Validators.required, this.validationService.noWhitespaceValidator()]),
        headerPosition: new FormControl('',[Validators.required]),
        languageId: new FormControl(['1'],[Validators.required]),

        pgid: new FormControl('', [Validators.required]),
        subHeaderName: new FormControl(''),
        subHeaderUrl: new FormControl(''),
        submenuName: new FormControl(''),
        submenuUrl: new FormControl(''),
      });
    }
  }

  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
  }
  onCancel(){
    this.router.navigate(['/menu/menu-list',this.masterMenuId]);
  }

  handleFileInput(event: any) {
    let files: any = event.files;
    this.fileToUpload = files[0];
    console.log(this.fileToUpload);
    console.log(files);
  }
  onFileSelected(event: any) {
    let reader = new FileReader();
    const file: File = event.target.files[0];
    console.log(file);
    if(file){
      this.showImageNameFile = false;
    }
    const pdfValidation = file.name.endsWith('pdf')
    if(!pdfValidation){
      this._toastr.error(this.errorMsg);
      this.pdf = false;
    }else{
      this.pdf = true
    }

    const img = new Image();
    img.src = window.URL.createObjectURL( file );
    reader.readAsDataURL(file);
    reader.onload = () => {

      const width = img.naturalWidth;
      const height = img.naturalHeight;

      window.URL.revokeObjectURL( img.src );
      console.log(height, width);

      if ((height != 570) && (width != 1920)) {
        // this.error = "photo should be 570 x 1920 size";
        // this.toaster.warning(this.error)
        // this.isImageSize= false;
       }
       else{
        this.isImageSize= true
       }
       console.log(this.isImageSize);


    }
    if (file) {
      this.fileToUpload = file;

      //     const formData = new FormData();
      // console.log(this.fileToUpload);

      // formData.append("thumbnail", file);

      // const upload$ = this.http.post("/api/thumbnail-upload", formData);

      // upload$.subscribe();
    }
  }
  onSubmit() {
    console.log(this.addForm.value);
    if( this.addForm.value.pgid =='' && this.addForm.value.headerRedirectUrl == ''){
      this._toastr.error('page or Url one field is reuired')
      return
    }
    if(!this.pdf){
      this._toastr.error(this.errorMsg);
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
    formData.append('name', this.addForm.value.headerName.toString());
    // formData.append('url', '');
    formData.append('redirectUrl', this.addForm.value.headerRedirectUrl.toString());
    formData.append('position', this.addForm.value.headerPosition.toString());
     formData.append('file',this.fileToUpload);
    formData.append('masterMenuId', this.masterMenuId.toString());
    formData.append('pageId', this.addForm.value.pgid.toString());
    formData.append('languageId', this.addForm.value.languageId);

    console.log(formData, 'formdata');
    this.service.addMenu(formData).subscribe((data: any) => {
       this.uService.isLoading = false;

      if (data.status) {
      this._toastr.success(data.message)
        this.router.navigate(['/menu/menu-list',this.masterMenuId]);
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
    if( this.addForm.value.pgid =='' && this.addForm.value.headerRedirectUrl == ''){
      this._toastr.error('page or Url one field is reuired')
      return
    }
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }
    if(this.fileToUpload == ''|| this.fileToUpload== null){
      // this.fileToUpload=
    }
    // console.log(this.pdf)
    // if(!this.pdf){
    //   this._toastr.error(this.errorMsg);
    //   return
    // }
     this.uService.isLoading = true;

    const formData = new FormData();
    formData.append('name', this.addForm.value.headerName.toString());
    // formData.append('url', '');
    formData.append('redirectUrl', this.addForm.value.headerRedirectUrl.toString());
    formData.append('position', this.addForm.value.headerPosition.toString());
     formData.append('file',this.fileToUpload);
    formData.append('masterMenuId', this.masterMenuId.toString());
    formData.append('pageId', this.addForm.value.pgid.toString());
    formData.append('languageId', this.addForm.value.languageId);

    this.service
      .updateMenuById(formData, this.headerId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
      this._toastr.success(data.message)

          this.router.navigate(['/menu/menu-list',this.masterMenuId]);

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
    this.service.menuListById(this.headerId).subscribe((res: any) => {
      this.updateDataById = res;
      console.log(this.updateDataById)
      this.uService.isLoading = false;
     let pageId='';
     this.headerType=  res.data.headerType;
     if(res.data.pageid){
       pageId = res.data.pageid.pageid
     }

     this.addForm.patchValue({
       headerName: res.data.name,
       // headerType: res.data.headerType,
       headerRedirectUrl: res.data.redirectUrl,
       headerPosition: res.data.position,
       languageId: res?.data?.languageId || this.langId,
       pgid:res.data.pageId ? res.data.pageId.pageId : '',
     });
   });

  }
}
