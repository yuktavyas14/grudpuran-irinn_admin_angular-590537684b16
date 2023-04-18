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
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addForm: FormGroup | any;
  fileToUpload: any = null;
  fileToUpload2: any = null;
  settingId: any;
  languageList: any;
  languageId=''
  langId:any='';
  showSubImageName = true;
  showImageNameFile = true;
  updateDataById : any;

   error = "photo should be 570 x 1920 size";
  isImageSize= false
  constructor(
    private fb: FormBuilder,
    private service: GlobalSettingService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private uService:UtilitydesignService,
    private EncrDecr: EncrdecrService,
    private langService: LanguageService,

    private validationService:ValidationService
  ) {
    this._ac.paramMap.subscribe((param) => {
      this.settingId = param.get('id');
      this.langId = param.get('langId');

    });

    if (this.settingId) {
      this.addForm = this.fb.group({
        title: new FormControl([''], [Validators.required,Validators.minLength(3)]),
        message: new FormControl([''], [Validators.required,Validators.minLength(3)]),
        subImg: new FormControl(''),
        mainImg: new FormControl(''),
        redirectUrl: new FormControl(''),
        readMore: new FormControl(''),
        languageId: new FormControl(this.langId),
      });
       this.uService.isLoading = true;
       this.getDataById();
    } else {
      this.addForm = this.fb.group({
        title: new FormControl([''], [Validators.required,Validators.minLength(3)]),
        message: new FormControl([''], [Validators.required,Validators.minLength(3)]),
        subImg:  new FormControl([''], [Validators.required]),
        mainImg: new FormControl([''], [Validators.required]),
        redirectUrl: new FormControl(''),
        readMore: new FormControl(''),
        languageId: new FormControl('1'),
      });
    }
  }


  get controls() {
    return this.addForm.controls;
  }
  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList= res.data;

    });
    localStorage.removeItem('editItemId');
  }

  getDataById(){
    if(this.settingId){
    const formData= new FormData()
    this.languageId=this.addForm.value.languageId
    formData.append('languageId',this.languageId)
    formData.append('whatWeHaveId',this.settingId)
    this.service.getWhatWeHaveByIdAndLanguageId(formData).subscribe((res: any) => {
      this.updateDataById = res;
      console.log(this.updateDataById)
      this.uService.isLoading = false;
     this.addForm.patchValue({
      title: res?.data?.title,
      message: res?.data?.message,
      mainImg: new FormControl(''),
      subImg: new FormControl(''),
      redirectUrl: res?.data?.redirectUrl,
      readMore: res?.data?.readMore,
      languageId: res?.data?.languageId || this.langId,
     });
   });
  }
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

  onFileSelected2(event: any) {
    let reader = new FileReader();
    const file: File = event.target.files[0];
    console.log(file);
    if(file){
      this.showSubImageName = false
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
      this.fileToUpload2 = file;

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
this.router.navigate(['/global-setting/wwh'])
    }

  }
  onSubmit() {
    this.addForm.patchValue({
      mainImg:this.fileToUpload
    })
    this.addForm.patchValue({
      subImg:this.fileToUpload2
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
    formData.append('mainImg', this.fileToUpload);
    formData.append('subImg', this.fileToUpload2);
    formData.append('languageId', this.addForm.value.languageId);
    formData.append('message', this.addForm.value.message);
    formData.append('redirectUrl', this.addForm.value.redirectUrl);
    formData.append('readMore', this.addForm.value.readMore);
    formData.append('title', this.addForm.value.title);
    console.log(formData, 'formdata');
    this.service.addWhatWeHaveData(formData).subscribe((data: any) => {
       this.uService.isLoading = false;

      if (data.status) {
        this.toaster.success(data.message)
        this.router.navigate(['/global-setting/wwh']);
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
    formData.append('mainImg', this.fileToUpload);
    formData.append('subImg', this.fileToUpload2);
    formData.append('languageId', this.addForm.value.languageId);
    formData.append('message', this.addForm.value.message);
    formData.append('redirectUrl', this.addForm.value.redirectUrl);
    formData.append('readMore', this.addForm.value.readMore);
    formData.append('title', this.addForm.value.title);
    formData.append('id', this.settingId);
    console.log(formData, 'formdata');
    this.service
      .updateWhatWeHaveById(formData)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/global-setting/wwh']);
        } else {
        }
      });
  }

}
