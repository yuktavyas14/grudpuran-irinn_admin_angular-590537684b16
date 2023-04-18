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
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { EncrdecrService } from 'src/app/_services/encrdecr.service';
import { ValidationService } from 'src/app/_services/validation.service';
import { ProviderService } from 'src/app/_services/provider.service';
import { LanguageService } from 'src/app/_services/language.service';

import { NewsService } from 'src/app/_services/news.service';
@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {
  addForm: FormGroup | any;
  fileToUpload: any = null;
  newsId: any;
  languageList: any;
   error = "photo should be 570 x 1920 size";
  isImageSize= false;
  languageId='';
  showImageNameFile = true;
  updateDataById : any;
  constructor(
    private fb: FormBuilder,
    private service: NewsService,
    private langService: LanguageService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private uService:UtilitydesignService,
    private EncrDecr: EncrdecrService,
    private validationService:ValidationService
  ) {

    this._ac.paramMap.subscribe((param) => {
      this.newsId = param.get('id');
      console.log( this.newsId);

    });

    if (this.newsId) {
      this.addForm = this.fb.group({
        newsTitle: new FormControl([''], [Validators.required]),
        newsDescription: new FormControl(['']),
        readMore: new FormControl(['']),
        redirectUrl: new FormControl(['']),
        file: new FormControl(''),

        languageId:new FormControl(['1'], [Validators.required]),
      });
       this.uService.isLoading = true;
       this.getDataById();
       const formData = new FormData();
       formData.append('setting_Id', this.newsId);

    } else {
      this.addForm = this.fb.group({
        newsTitle: new FormControl([''], [Validators.required]),
        newsDescription: new FormControl([''], [Validators.required]),
        readMore: new FormControl([''], [Validators.required]),
        redirectUrl: new FormControl(['']),

        languageId:new FormControl(['1'], [Validators.required]),
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
    const formData= new FormData()
    this.languageId=this.addForm.value.languageId
    formData.append('languageId',this.languageId)
    formData.append('id',this.newsId)
    this.service.newsById(this.newsId).subscribe((res: any) => {
      this.updateDataById = res;
      // console.log(this.updateDataById)
      this.uService.isLoading = false;
     this.addForm.patchValue({
       subject: res?.data?.subject,
       message: res?.data?.message,
       // file: new FormControl(''),
       redirectUrl: res?.data?.redirectUrl,
       languageId: res?.data?.languageId || this.languageId,
       newsTitle: res?.data?.newsTitle,
       newsDate: res?.data?.newsDate,
       expiryDate: res?.data?.expiryDate,
       readMore: res?.data?.readMore,
       newsDescription: res.data.newsDescription

     });
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
this.router.navigate(['/news'])
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
    // if(!this.isImageSize){
    //   this.toaster.error(this.error)
    //   return
    // }
     this.uService.isLoading = true;

    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('newsTitle', this.addForm.value.newsTitle);
    formData.append('newsDescription', this.addForm.value.newsDescription);
    formData.append('languageId', this.addForm.value.languageId);
    formData.append('readMore', this.addForm.value.readMore);
    formData.append('redirectUrl', this.addForm.value.redirectUrl);
    console.log(formData, 'formdata');
    this.service.addNews(formData).subscribe((data: any) => {
       this.uService.isLoading = false;

      if (data.status) {
        this.toaster.success(data.message)
        this.router.navigate(['/news']);
      } else {
        this.toaster.error(data.message)

      }
    },error=>{
      this.toaster.error(error.error.message)

    });
  }
  onUpdate() {
    this.addForm.patchValue({
      file:this.fileToUpload
    })
    console.log(this.addForm.value);
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
    formData.append('newsTitle', this.addForm.value.newsTitle);
    formData.append('newsDescription', this.addForm.value.newsDescription);
    formData.append('languageId', this.addForm.value.languageId);
    formData.append('readMore', this.addForm.value.readMore);
    formData.append('redirectUrl', this.addForm.value.redirectUrl);
    console.log(formData, 'formdata');
    this.service
      .updateNewsById(formData, this.newsId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/news']);
        } else {
        }
      });
  }

}
