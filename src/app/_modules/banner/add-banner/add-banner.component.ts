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
import { LanguageService } from 'src/app/_services/language.service';
@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss']
})
export class AddBannerComponent implements OnInit {
  addForm: FormGroup | any;
  fileToUpload: any = null;
  bannerId: any;
  languageList:any;
   error = "photo should be 570 x 1920 size";
  isImageSize= false
  constructor(
    private fb: FormBuilder,
    private service: BannerService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private uService:UtilitydesignService,
    private EncrDecr: EncrdecrService,
    private langService: LanguageService,
    private validationService:ValidationService
  ) {
    this._ac.paramMap.subscribe((param) => {
      /*
      this.bannerId = 1;
      let bannerId1 = param.get('id');
      this.bannerId = this.EncrDecr.get('123456$#@$^@1BAN',bannerId1);
      console.log( this.bannerId);
      alert(this.matchId)
      */
    });

    if (this.bannerId) {
      this.addForm = this.fb.group({
        imageName: new FormControl([''], [Validators.required, this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        description: new FormControl('',[Validators.maxLength(250)]),
        file: new FormControl(''),
        imgUrl: new FormControl(''),
        joinNowUrl: new FormControl(''),
        bannerVideo: new FormControl(''),
        videotitle: new FormControl(''),
        readMore: new FormControl(''),
        languageId: new FormControl('1'),
        position: new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator()]),
      });
       this.uService.isLoading = true;

      this.service.getBannerImageByid(this.bannerId).subscribe((res: any) => {
         this.uService.isLoading = false;
        this.addForm.patchValue({
          imageName: res.data.imageName,
          description: res.data.description,
          file: new FormControl(''),
          imgUrl: res.data.imgUrl,
          position: res.data.position,
          joinNowUrl: res.data.joinNowUrl,
          bannerVideo: res.data.bannerVideo,
          videotitle: res.data.videotitle,
          readMore: res.data.readMore,
          languageId: res.data.languageId,
        });
      });
    } else {
      this.addForm = this.fb.group({
        imageName: new FormControl('', [Validators.required,  this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        description: new FormControl('',[Validators.maxLength(250)]),
        position: new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator()]),
        file: new FormControl('',Validators.required),
        joinNowUrl: new FormControl(''),
        bannerVideo: new FormControl(''),
        videotitle: new FormControl(''),
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
      this.languageList = res.data;
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

    const img = new Image();
    img.src = window.URL.createObjectURL( file );
    reader.readAsDataURL(file);
    reader.onload = () => {

      const width = img.naturalWidth;
      const height = img.naturalHeight;

      window.URL.revokeObjectURL( img.src );
      console.log(height, width);

      if ((height != 570) && (width != 1920)) {
        this.error = "photo should be 570 x 1920 size";
        this.toaster.warning(this.error)
        this.isImageSize= false;
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
  onReset(value:number){
    if(value ==1){
this.addForm.reset();
    }else{
this.router.navigate(['/banner'])
    }

  }
  onSubmit() {
    this.addForm.patchValue({
      file:this.fileToUpload
    })
    if(this.addForm.invalid){
      this.addForm.markAllAsTouched()
      return
    }
    if(!this.isImageSize){
      this.toaster.error(this.error)
      return
    }
     this.uService.isLoading = true;

    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('bannerName', this.addForm.value.imageName);
    formData.append('description', this.addForm.value.description);
    formData.append('position', this.addForm.value.position);
    formData.append('joinNowUrl', this.addForm.value.joinNowUrl);
    formData.append('bannerVideo', this.addForm.value.bannerVideo);
    formData.append('languageId', this.addForm.value.languageId);
    formData.append('videotitle', this.addForm.value.videotitle);
    formData.append('readMore', this.addForm.value.readMore);
    console.log(formData, 'formdata');
    this.service.addMainBanner(formData).subscribe((data: any) => {
       this.uService.isLoading = false;

      if (data.status) {
        this.toaster.success(data.message)
        this.router.navigate(['/banner']);
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
    if(!this.isImageSize){
      this.toaster.error(this.error)
      return
    }
     this.uService.isLoading = true;

     const formData = new FormData();
     formData.append('file', this.fileToUpload);
    formData.append('bannerName', this.addForm.value.imageName);
    formData.append('description', this.addForm.value.description);
    formData.append('position', this.addForm.value.position);
    formData.append('joinNowUrl', this.addForm.value.joinNowUrl);
    formData.append('bannerVideo', this.addForm.value.bannerVideo);
    formData.append('languageId', this.addForm.value.languageId);
    formData.append('videotitle', this.addForm.value.videotitle);
    formData.append('readMore', this.addForm.value.readMore);
 
 
     console.log(formData, 'formdata');
    this.service
      .updateMainBanner(formData, this.bannerId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/banner']);
        } else {
        }
      });
  }

}
