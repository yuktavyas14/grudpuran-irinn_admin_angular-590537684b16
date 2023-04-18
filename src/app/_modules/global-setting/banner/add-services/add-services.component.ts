import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from 'src/app/_services/banner.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { EncrdecrService } from 'src/app/_services/encrdecr.service';
import { ValidationService } from 'src/app/_services/validation.service';
import { GlobalSettingService } from 'src/app/_services/global-setting.service';
import { LanguageService } from 'src/app/_services/language.service';
import { QuickLinksService } from 'src/app/_services/Quicklinks.service';
import { PagesService } from 'src/app/_services/pages.service';
@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.scss']
})
export class AddServicesComponent implements OnInit {
  addForm: FormGroup | any;
  fileToUpload: any = null;
  settingId: any;
   error = "photo should be 570 x 1920 size";
  isImageSize= false;
  languageList: any;
  languageId=''
  langId:any='';
  pageList:any;
  showImageNameFile = true;
  updateDataById:any;
  constructor(
    private fb: FormBuilder,
    private pageService: PagesService,
    private service: GlobalSettingService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private uService:UtilitydesignService,
    private EncrDecr: EncrdecrService,
    private validationService:ValidationService,
    private _service: QuickLinksService,

    private langService: LanguageService,
  ) {
    this._ac.paramMap.subscribe((param) => {


      this.settingId = param.get('id');
      this.langId = param.get('langId');
      console.log( this.settingId);


    });

    if (this.settingId) {
      this.addForm = this.fb.group({
        subject: new FormControl([''], [Validators.required,Validators.minLength(3)]),
        message: new FormControl([''], [Validators.required,Validators.minLength(3)]),
        languageId: new FormControl([this.langId], [Validators.required]),
        file: new FormControl(''),
        redirectUrl: new FormControl(''),
        readMore:new FormControl(''),
        pageId: new FormControl(['']),
        settingType: new FormControl('1'),

      });
       this.uService.isLoading = true;
       this.getDataById();
       const formData = new FormData();
       formData.append('setting_Id', this.settingId);
      this.service.editBannerServiceById(formData).subscribe((res: any) => {
        this.updateDataById = res;
        console.log(this.updateDataById)
         this.uService.isLoading = false;
        this.addForm.patchValue({
          subject: res.data.subject,
          message: res.data.message,
          languageId: res?.data?.languageId || this.langId,
          file: new FormControl(''),
          redirectUrl: res.data.redirectUrl,
          readMore:res.data.readMore,
          pageId: res?.data?.pageId?.pageId,
        });
      });
    } else {
      this.addForm = this.fb.group({
        subject: new FormControl([''], [Validators.required,Validators.minLength(3)]),
        message: new FormControl([''], [Validators.required,Validators.minLength(3)]),
        file: new FormControl('', [Validators.required]),
        languageId: new FormControl('1', [Validators.required]),
        redirectUrl: new FormControl(''),
        readMore:new FormControl(''),
        settingType: new FormControl('1'),
        pageId: new FormControl(['']),

      });
    }
  }
  get controls() {
    return this.addForm.controls;
  }
  ngOnInit(): void {
    this.pageService.getAllPage().subscribe((res:any)=>{
      this.uService.isLoading= false;
    if(res.status){
      this.pageList= res.data.filter((page:any) => page.status== true);
      console.log(this.pageList)
    }
    })
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList= res.data;

    });
    localStorage.removeItem('editItemId');
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
      this.showImageNameFile = false
    }
    const img = new Image();
    img.src = window.URL.createObjectURL( file );
    reader.readAsDataURL(file);
    reader.onload = () => {

      const width = img.naturalWidth;
      const height = img.naturalHeight;

      window.URL.revokeObjectURL( img.src );
      console.log(height, width);

      // if ((height != 570) && (width != 1920)) {
      //   this.error = "photo should be 570 x 1920 size";
      //   this.toaster.warning(this.error)
      //   this.isImageSize= false;
      //  }
      //  else{
      //   this.isImageSize= true
      //  }
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
  onReset(value:number){
    if(value ==1){
this.addForm.reset();
    }else{
this.router.navigate(['/banner'])
    }

  }
  getDataById() {
    const formData = new FormData();
    formData.append('setting_Id', this.settingId);
   this.service.editBannerServiceById(formData).subscribe((res: any) => {
     this.updateDataById = res;
     console.log(this.updateDataById)
      this.uService.isLoading = false;
     this.addForm.patchValue({
       subject: res.data.subject,
       message: res.data.message,
       languageId: res?.data?.languageId || this.langId,
       file: new FormControl(''),
       redirectUrl: res.data.redirectUrl,
       readMore:res.data.readMore,
       pageId: res?.data?.pageId?.pageId,
     });
   });
  }
  onSubmit() {
    this.addForm.patchValue({
      file:this.fileToUpload
    })
    if(this.addForm.invalid){
      this.addForm.markAllAsTouched()
      return
    }
    // if(!this.isImageSize){
    //   this.toaster.error(this.error)
    //   return
    // }
     this.uService.isLoading = true;

    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('subject', this.addForm.value.subject);
    formData.append('message', this.addForm.value.message);
    formData.append('languageId',this.addForm.value.languageId);
    formData.append('settingType',this.addForm.value.settingType);
    formData.append('readMore', this.addForm.value.readMore);
    formData.append('redirectUrl', this.addForm.value.redirectUrl);
    formData.append('pageId', this.addForm.value.pageId);
    console.log(formData, 'formdata');
    this.service.addBannerService(formData).subscribe((data: any) => {
       this.uService.isLoading = false;

      if (data.status) {
        this.toaster.success(data.message)
        this.router.navigate(['/global-setting/banner']);
      } else {
        this.toaster.error(data.message)

      }
    },error=>{
      this.toaster.error(error.error.message)

    });
  }
  onUpdate() {
    if(this.addForm.invalid){
      this.addForm.markAllAsTouched()
      return
    }
    // if(!this.isImageSize){
    //   this.toaster.error(this.error)
    //   return
    // }
     this.uService.isLoading = true;

    const formData = new FormData();
    formData.append('setting_Id', this.settingId);
    formData.append('languageId', this.addForm.value.languageId);
    formData.append('file', this.fileToUpload);
    formData.append('subject', this.addForm.value.subject);
    formData.append('message', this.addForm.value.message);
    formData.append('redirectUrl', this.addForm.value.redirectUrl);
    formData.append('pageId', this.addForm.value.pageId);
    formData.append('readMore', this.addForm.value.readMore);
    console.log( this.addForm.value.pageId, 'formdata');
    this.service
      .updateBannerServiceById(formData, this.settingId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/global-setting/banner']);
        } else {
        }
      });
  }

}
