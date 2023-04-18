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
import { PagesService } from 'src/app/_services/pages.service';
 import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { User } from 'src/app/_models/user';
import { VideoGalleryService } from 'src/app/_services/video-gallery.service';
import { ValidationService } from 'src/app/_services/validation.service';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
@Component({
  selector: 'app-add-video-gallery',
  templateUrl: './add-video-gallery.component.html',
  styleUrls: ['./add-video-gallery.component.scss']
})
export class AddVideoGalleryComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      
      height: '300px',
      minHeight: '200px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
     
};
  htmlContent:any;
  userInfo= new User().getData()
 editor = null;
 initControls = null;
 value = null;



  addForm: FormGroup | any;
  fileToUpload: any = null;
  pageId: any;
   error = "photo should be 570 x 1920 size";
  isImageSize= false
  constructor(
    private fb: FormBuilder,
    private service: VideoGalleryService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private uService:UtilitydesignService,
    private validationService:ValidationService

  ) {
    this._ac.paramMap.subscribe((param) => {
      this.pageId = param.get('id');
      //alert(this.matchId)
    });

    if (this.pageId) {
      this.addForm = this.fb.group({
        videoTitle: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(6)]),
        videoIframe: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(10)]),
        expiryDate: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator()]),

      });
        this.uService.isLoading = true;

      this.service.getVideoById(this.pageId).subscribe((res: any) => {
         this.uService.isLoading = false;
        
         
        this.addForm.patchValue({
          
          videoTitle: res.data.name,
          videoIframe: res.data.url,
          expiryDate: res.data.expiryDate,
           
        });
      });
    } else {
      this.addForm = this.fb.group({
        videoTitle: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(6)]),
        videoIframe: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(10)]),
        expiryDate: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator()]),
      });
    }
  }
 
  ngOnInit(): void {
    
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
 
    }
  }
  onSubmit() {
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
   
    formData.append('name', this.addForm.value.videoTitle);
    formData.append('url', this.addForm.value.videoIframe);
    formData.append('expiryDate', this.addForm.value.expiryDate);
    this.service.addGallaryVideo(formData).subscribe((data: any) => {
        this.uService.isLoading = false;
      if (data.status) {
        this.router.navigate(['/video-gallery']);
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
      this.uService.isLoading = true;

    const formData = new FormData();
    formData.append('name', this.addForm.value.videoTitle);
    formData.append('url', this.addForm.value.videoIframe);
    formData.append('expiryDate', this.addForm.value.expiryDate);
    this.service
      .updateVideoById(formData, this.pageId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/video-gallery']);
        } else {
        }
      });
  }
  onReset(){
    this.addForm.reset();
  }
  onCancle(){
    this.router.navigate(['/video-gallery']);

  }
}