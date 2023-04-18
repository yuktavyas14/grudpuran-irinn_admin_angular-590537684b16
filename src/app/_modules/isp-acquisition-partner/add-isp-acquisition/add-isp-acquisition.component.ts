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
import { IspAcquisitionPartnerService } from 'src/app/_services/isp-acquisition-partner.service';
import { ValidationService } from 'src/app/_services/validation.service';
@Component({
  selector: 'app-add-isp-acquisition',
  templateUrl: './add-isp-acquisition.component.html',
  styleUrls: ['./add-isp-acquisition.component.scss']
})
export class AddIspAcquisitionComponent implements OnInit {
  addForm: FormGroup | any;
  fileToUpload: any = null;
  ispId: any;
   error = "photo should be 570 x 1920 size";
  isImageSize= false
  constructor(
    private fb: FormBuilder,
    private service: IspAcquisitionPartnerService,
    private uService: UtilitydesignService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private validationService:ValidationService

  ) {
    this._ac.paramMap.subscribe((param) => {
      this.ispId = param.get('id');
      //alert(this.matchId)
    });

    if (this.ispId) {
      this.addForm = this.fb.group({
        ispPartnerName: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
       

      });
       this.uService.isLoading = true;

      this.service.getIspAquisitionPartnerById(this.ispId).subscribe((res: any) => {
         this.uService.isLoading = false;
        this.addForm.patchValue({
          
          ispPartnerName: res.data.ispPartnerName,
          
           
        });
      });
    } else {
      this.addForm = this.fb.group({
        ispPartnerName: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        
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
    
    formData.append('ispPartnerName', this.addForm.value.ispPartnerName);
    
    this.service.addIspPartners(formData).subscribe((data: any) => {
       this.uService.isLoading = false;
      if (data.status) {
        this.router.navigate(['/isp-acquisition-partner']);
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
     formData.append('ispPartnerName', this.addForm.value.ispPartnerName);
     
    this.service
      .updateIspAquisitionPartnerById(formData, this.ispId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/isp-acquisition-partner']);
        } else {
        }
      });
  }
  onReset(){
    this.addForm.reset();
  }
  onCancle(){
    this.router.navigate(['/isp-acquisition-partner']);

  }
}