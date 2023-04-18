import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from 'src/app/_services/banner.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { EncrdecrService } from 'src/app/_services/encrdecr.service';
import { LogoAddressService } from 'src/app/_services/logo-address.service';
import { ValidationService } from 'src/app/_services/validation.service';
import { LanguageService } from 'src/app/_services/language.service';
declare const $: any;
@Component({
  selector: 'app-add-logo-address',
  templateUrl: './add-logo-address.component.html',
  styleUrls: ['./add-logo-address.component.scss']
})
export class AddLogoAddressComponent implements OnInit {
  addForm: FormGroup | any;
  fileToUpload: any = null;
  fileToUpload1: any = null;
  logoAddrssId: any;
  languageId:any='1'
  languageList:any;
  langId: any;
  updateDataById : any
   error = "photo should be 570 x 1920 size";
  isImageSize= false;
  showImageNameFile = true;
  showImageNameFooLogo = true;
  constructor(
    private fb: FormBuilder,
    private service: LogoAddressService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private uService:UtilitydesignService,
    private EncrDecr: EncrdecrService,
    private validationService:ValidationService,
    private langService: LanguageService,

  ) {
    this._ac.paramMap.subscribe((param) => {
      // this.logoAddrssId = 1;
  this.logoAddrssId = param.get('id');
  this.langId = param.get('langId');
    //  this.logoAddrssId = this.EncrDecr.get('123456$#@$^@1BAN',logoAddrssId1);
      console.log( this.logoAddrssId);

      //alert(this.matchId)
    });

    if (this.logoAddrssId) {
      this.addForm = this.fb.group({
        message: new FormControl(''),
        file: new FormControl(''),
        fooLogo: new FormControl(''),
        languageId: new FormControl('1'),
        logoName: new FormControl('',[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),

      });
       this.uService.isLoading = true;

      this.service.getLogoDetailsById(this.logoAddrssId).subscribe((res: any) => {
         this.uService.isLoading = false;
         this.updateDataById = res;
         console.log(res);
        this.addForm.patchValue({
          message: res.data.message,
          file: new FormControl(''),
          fooLogo: new FormControl(''),
          logoName: res.data.logoName,
          languageId: res.data.languageId || this.langId,
        });
      });
    } else {
      this.addForm = this.fb.group({
        message: new FormControl(''),
        file: new FormControl(''),
        fooLogo: new FormControl(''),
        languageId: new FormControl('1'),
        logoName: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
      });
    }
  }

  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
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
       this.isImageSize= true

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
  onFileSelected1(event: any) {

    let reader = new FileReader();
    const file: File = event.target.files[0];
    console.log(file);
    if(file){
      this.showImageNameFooLogo = false
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
       this.isImageSize= true

    }
    if (file) {
      this.fileToUpload1 = file;

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
    this.router.navigate(['/logo-address'])
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
    formData.append('fooLogo', this.fileToUpload1);
    formData.append('message', this.addForm.value.message);
    formData.append('logoName', this.addForm.value.logoName);
    formData.append('languageId', this.addForm.value.languageId);
    this.service.addLogoDetails(formData).subscribe((data: any) => {
       this.uService.isLoading = false;

      if (data.status) {
        this.router.navigate(['/logo-address']);
      } else {
      }
    });
  }
  onUpdate() {
    if(this.addForm.invalid){
      this.addForm.markAllAsTouched()
      return
    }
    // console.log(this.isImageSize)
    // if(!this.isImageSize){
    //   this.toaster.error(this.error)
    //   return
    // }
     this.uService.isLoading = true;

    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('fooLogo', this.fileToUpload1);
    formData.append('message', this.addForm.value.message);
    formData.append('logoName', this.addForm.value.logoName);
    formData.append('languageId', this.addForm.value.languageId);


    this.service
      .updateLogoById(formData, this.logoAddrssId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;
         this.toaster.success(data.message)

        if (data.status) {
          this.router.navigate(['/logo-address']);
        } else {
        }
      });
  }



}
