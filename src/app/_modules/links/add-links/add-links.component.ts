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
import { LinksService } from 'src/app/_services/links.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { ValidationService } from 'src/app/_services/validation.service';
@Component({
  selector: 'app-add-links',
  templateUrl: './add-links.component.html',
  styleUrls: ['./add-links.component.scss']
})
export class AddLinksComponent implements OnInit {

  addForm: FormGroup | any;
  fileToUpload: any = null;
  linkId: any;
   error = "photo should be 570 x 1920 size";
  isImageSize= false
  constructor(
    private fb: FormBuilder,
    private service: LinksService,
    private uService: UtilitydesignService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private validationService:ValidationService

  ) {
    this._ac.paramMap.subscribe((param) => {
      this.linkId = param.get('id');
      //alert(this.matchId)
    });

    if (this.linkId) {
      this.addForm = this.fb.group({
        linkMessage: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(10)]),
        linkTitle: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        linkUrl: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)])

      });
       this.uService.isLoading = true;

      this.service.getAllImportantLinksById(this.linkId).subscribe((res: any) => {
         this.uService.isLoading = false;
        this.addForm.patchValue({
          
          linkMessage: res.data.linkMessage,
          linkTitle: res.data.linkTitle,
          linkUrl: res.data.linkUrl,
           
        });
      });
    } else {
      this.addForm = this.fb.group({
        linkMessage: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(10)]),
        linkTitle: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        linkUrl: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)])
      });
    }
  }
 
  ngOnInit(): void {}
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
   
    formData.append('linkMessage', this.addForm.value.linkMessage);
    formData.append('linkTitle', this.addForm.value.linkTitle);
    formData.append('linkUrl', this.addForm.value.linkUrl);
    this.service.addImportantLinks(formData).subscribe((data: any) => {
       this.uService.isLoading = false;
      if (data.status) {
        this.router.navigate(['/links']);
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
    formData.append('linkMessage', this.addForm.value.linkMessage);
    formData.append('linkTitle', this.addForm.value.linkTitle);
    formData.append('linkUrl', this.addForm.value.linkUrl);
    this.service
      .updateImpLink(formData, this.linkId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/links']);
        } else {
        }
      });
  }
  onReset(){
    this.addForm.reset();
  }
  onCancle(){
    this.router.navigate(['/links']);

  }
}
