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
import { LanguageService } from 'src/app/_services/language.service';
import { GlobalSettingService } from 'src/app/_services/global-setting.service';
@Component({
  selector: 'app-gallery-add',
  templateUrl: './gallery-add.component.html',
  styleUrls: ['./gallery-add.component.scss']
})
export class GalleryAddComponent implements OnInit {

  addForm: FormGroup | any;
  fileToUpload: any = null;
  fileToUpload1: any = null;
  logoAddrssId: any;
  languageId:any='1'
  languageList:any;
  langId: any;
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
        file: new FormControl(''),
      });
       this.uService.isLoading = true;

    } else {
      this.addForm = this.fb.group({
        file: new FormControl(''),
      });
    }
  }

  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
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

  onReset(value:number){
    if(value ==1){
    this.addForm.reset();
        }else{
    this.router.navigate(['/global-setting/editor-gallery'])
        }

  }
  onSubmit() {
    console.log(this.fileToUpload);

    // this.addForm.patchValue({
    //   file:this.fileToUpload
    // })


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
    this.service.uploadImageToEditor(formData).subscribe((data: any) => {
       this.uService.isLoading = false;

      if (data.status) {
        this.router.navigate(['/global-setting/editor-gallery']);
      } else {
      }
    });
  }


}
