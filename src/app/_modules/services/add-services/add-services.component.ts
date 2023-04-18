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
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { ServicesService } from 'src/app/_services/services.service';
import { ValidationService } from 'src/app/_services/validation.service';
import { LanguageService } from 'src/app/_services/language.service';
@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.scss']
})
export class AddServicesComponent implements OnInit {

  addForm: FormGroup | any;
  fileToUpload: any = null;
  fileToUploadPDF: any = null;
  serviceId: any;
   error = "photo should be 570 x 1920 size";
  isImageSize= false;
  languageList: any;
  langId: any='1';
  languageId='';
  showImageNameFile = true;
  showPdfName = true;
  updateDataById : any;
  pdfValidation = false;
  constructor(
    private fb: FormBuilder,
    private uService: UtilitydesignService,
    private service: ServicesService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private validationService:ValidationService,
    private langService: LanguageService,

  ) {
    this._ac.paramMap.subscribe((param) => {
      this.serviceId = param.get('id');
      this.langId = param.get('langId');

      //alert(this.matchId)
    });

    if (this.serviceId) {
      this.addForm = this.fb.group({
        redirectUrl: new FormControl(''),
        languageId: new FormControl(this.langId),
        file: new FormControl(''),
        pdfFiles: new FormControl(''),
        logoName: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(2)]),
      });
       this.uService.isLoading = true;

      this.service.get_servicess_id(this.serviceId).subscribe((res: any) => {
         this.uService.isLoading = false;
         this.updateDataById = res;
        //  console.log(this.updateDataById);

        this.addForm.patchValue({
          redirectUrl: res.data.redirectUrl,
          logoName: res.data.logoName,
          languageId: res.data.languageId || this.langId,
        });
      });
    } else {
      this.addForm = this.fb.group({
        redirectUrl: new FormControl(''),
        languageId: new FormControl('1'),
        file: new FormControl(''),
        pdfFiles: new FormControl(''),
        logoName: new FormControl('',[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(2)]),
      });
    }
  }

  ngOnInit(): void {  this.langService.getLanguageList().subscribe((res: any) => {
    this.languageList= res.data;

  });}

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
  onFileSelected1(event: any) {
    let reader = new FileReader();
    const file: File = event.target.files[0];
    console.log(file);
    if(file){
      this.showPdfName = false
    }
    const pdfVadate = file.name.endsWith('.pdf')
    if(!pdfVadate){
      this.pdfValidation = false;
      this.toaster.error('File must be pdf')
    }else{
      this.pdfValidation = true;
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
      this.fileToUploadPDF = file;

      //     const formData = new FormData();
      // console.log(this.fileToUpload);

      // formData.append("thumbnail", file);

      // const upload$ = this.http.post("/api/thumbnail-upload", formData);

      // upload$.subscribe();
    }
  }
  onSubmit() {
    // if(!this.isImageSize){
    //   this.toaster.error(this.error)
    //   return
    // }
    if(this.addForm.invalid){
      this.addForm.markAllAsTouched()
      return
    }
    if(!this.pdfValidation){
      this.toaster.error('File must contain pdf');
      return
    }
     this.uService.isLoading = true;

    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('pdfFiles', this.fileToUploadPDF);
    formData.append('logoName', this.addForm.value.logoName);
    formData.append('redirectUrl', this.addForm.value.redirectUrl);
    formData.append('languageId', this.addForm.value.languageId);
    console.log(formData, 'formdata');
    this.service.addServiceDTL(formData).subscribe((data: any) => {
       this.uService.isLoading = false;
      if (data.status) {
        this.router.navigate(['/services']);
      } else {
      }
    });
  }
  onUpdate() {
    // if(!this.isImageSize){
    //   this.toaster.error(this.error)
    //   return
    // }
    if(this.addForm.invalid){
      this.addForm.markAllAsTouched()
      return
    }

    // if(!this.pdfValidation){
    //   this.toaster.error('File must contain pdf');
    //   return
    // }
     this.uService.isLoading = true;

    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('pdfFiles', this.fileToUploadPDF);
    formData.append('logoName', this.addForm.value.logoName);
    formData.append('redirectUrl', this.addForm.value.redirectUrl);
    formData.append('languageId', this.addForm.value.languageId);
    formData.append('id', this.serviceId);
    console.log(formData, 'formdata');
    this.service
      .updateService(formData)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/services']);
        } else {
        }
      });
  }
  onReset(){
    this.addForm.reset();
  }
  onCancle(){
    this.router.navigate(['/services']);

  }
}
