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
import { IspService } from 'src/app/_services/isp.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { ValidationService } from 'src/app/_services/validation.service';
@Component({
  selector: 'app-add-isp',
  templateUrl: './add-isp.component.html',
  styleUrls: ['./add-isp.component.scss']
})
export class AddIspComponent implements OnInit {
  addForm: FormGroup | any;
  fileToUpload: any = null;
  serviceId: any;
   error = "photo should be 570 x 1920 size";
  isImageSize= false
  constructor(
    private fb: FormBuilder,
    private service: IspService,
    private uService: UtilitydesignService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private validationService:ValidationService

  ) {
    this._ac.paramMap.subscribe((param) => {
      this.serviceId = param.get('id');
      //alert(this.matchId)
    });

    if (this.serviceId) {
      this.addForm = this.fb.group({
        ispMemberAddress: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(6)]),
        ispMemberContact: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(7)]),
        ispMemberName: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        ispMemberurl: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(5)]),
        ispSiteUlr: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(5)]),

      });
       this.uService.isLoading = true;

      this.service.getIspMemberById(this.serviceId).subscribe((res: any) => {
         this.uService.isLoading = false;
        this.addForm.patchValue({
          
          ispMemberAddress: res.data.ispMemberAddress,
          ispMemberContact: res.data.ispMemberContact,
          ispMemberName: res.data.ispMemberName,
          ispMemberurl: res.data.ispMemberurl,
          ispSiteUlr: res.data.ispSiteUlr,
           
        });
      });
    } else {
      this.addForm = this.fb.group({
        ispMemberAddress: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(6)]),
        ispMemberContact: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(7)]),
        ispMemberName: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        ispMemberurl: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(5)]),
        ispSiteUlr: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(5)]),
        file: new FormControl("",Validators.required),
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
    this.addForm.patchValue({
      'file': this.fileToUpload
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
    formData.append('ispMemberAddress', this.addForm.value.ispMemberAddress);
    formData.append('ispMemberContact', this.addForm.value.ispMemberContact);
    formData.append('ispMemberName', this.addForm.value.ispMemberName);
    formData.append('ispMemberurl', this.addForm.value.ispMemberurl);
    formData.append('ispSiteUlr', this.addForm.value.ispSiteUlr);
    this.service.addIspMember(formData).subscribe((data: any) => {
       this.uService.isLoading = false;
      if (data.status) {
        this.router.navigate(['/ispmember']);
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
    formData.append('ispMemberAddress', this.addForm.value.ispMemberAddress);
    formData.append('ispMemberContact', this.addForm.value.ispMemberContact);
    formData.append('ispMemberName', this.addForm.value.ispMemberName);
    formData.append('ispMemberurl', this.addForm.value.ispMemberurl);
    formData.append('ispSiteUlr', this.addForm.value.ispSiteUlr);
    this.service
      .updateIspMemberById(formData, this.serviceId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/ispmember']);
        } else {
        }
      });
  }
  onReset(){
    this.addForm.reset();
  }
  onCancle(){
    this.router.navigate(['/ispmember']);

  }
}