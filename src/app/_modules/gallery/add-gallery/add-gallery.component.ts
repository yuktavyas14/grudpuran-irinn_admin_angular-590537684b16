import { GalleryService } from 'src/app/_services/gallery.service';
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
import { ValidationService } from 'src/app/_services/validation.service';
@Component({
  selector: 'app-add-gallery',
  templateUrl: './add-gallery.component.html',
  styleUrls: ['./add-gallery.component.scss']
})
export class AddGalleryComponent implements OnInit {
  addForm: FormGroup | any;
  fileToUpload: any = null;
  galleryId: any;
   error = "photo should be 570 x 1920 size";
  isImageSize= false;
  showImageNameFile = true;
  updateDataById : any;
  constructor(
    private fb: FormBuilder,
    private service: GalleryService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private uService:UtilitydesignService,
    private EncrDecr: EncrdecrService,
    private validationService:ValidationService

  ) {
    this._ac.paramMap.subscribe((param) => {
      // this.galleryId = 1;
      this.galleryId = param.get('id');
    //  this.galleryId = this.EncrDecr.get('123456$#@$^@1BAN',galleryId1);
      console.log( this.galleryId);

      //alert(this.matchId)
    });

    if (this.galleryId) {
      this.addForm = this.fb.group({
        imageName: new FormControl('',[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        file: new FormControl(''),
      });
       this.uService.isLoading = true;

      this.service.get_gallary_byId(this.galleryId).subscribe((res: any) => {
         this.uService.isLoading = false;
         this.updateDataById = res;
        //  console.log(this.updateDataById)
        this.addForm.patchValue({
          imageName: res.data.photoName,
          fileType: res.data.fileType,

        });
      });
    } else {
      this.addForm = this.fb.group({
        imageName: new FormControl('',[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        file: new FormControl('',[Validators.required]),
      });
    }
  }

  ngOnInit(): void {
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
  onReset(value:number){
    if(value ==1){
this.addForm.reset();
    }else{
this.router.navigate(['/gallery'])
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
    formData.append('photoName', this.addForm.value.imageName);

    this.service.addGallaryImage(formData).subscribe((data: any) => {
       this.uService.isLoading = false;

      if (data.status) {
        this.router.navigate(['/gallery']);
      } else {
      }
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
    formData.append('file', this.fileToUpload);
    formData.append('photoName', this.addForm.value.imageName);
    this.service
      .update_gallaryById(formData, this.galleryId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/gallery']);
        } else {
        }
      });
  }


}
