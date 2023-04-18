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
import { NewispService } from 'src/app/_services/newisp.service';
import { ValidationService } from 'src/app/_services/validation.service';
@Component({
  selector: 'app-add-newisp',
  templateUrl: './add-newisp.component.html',
  styleUrls: ['./add-newisp.component.scss']
})
export class AddNewispComponent implements OnInit {
  addForm: FormGroup | any;
  fileToUpload: any = null;
  ispId: any;
   error = "photo should be 570 x 1920 size";
  isImageSize= false
  constructor(
    private fb: FormBuilder,
    private service: NewispService,
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
        address: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(10)]),
        email: new FormControl("",[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        ispLocation: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        name: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        phoneNumber: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(7)]),

      });
       this.uService.isLoading = true;

      this.service.getnewIspById(this.ispId).subscribe((res: any) => {
         this.uService.isLoading = false;
        this.addForm.patchValue({
          
          address: res.data.address,
          email: res.data.email,
          ispLocation: res.data.ispLocation,
          name: res.data.name,
          phoneNumber: res.data.phoneNumber,
           
        });
      });
    } else {
      this.addForm = this.fb.group({
        address: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(10)]),
        email: new FormControl("",[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        ispLocation: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        name: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        phoneNumber: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(7)]),
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
    formData.append('address', this.addForm.value.address);
    formData.append('email', this.addForm.value.email);
    formData.append('ispLocation', this.addForm.value.ispLocation);
    formData.append('name', this.addForm.value.name);
    formData.append('phoneNumber', this.addForm.value.phoneNumber);
    this.service.addNewIsp(formData).subscribe((data: any) => {
       this.uService.isLoading = false;
      if (data.status) {
        this.router.navigate(['/new-isp']);
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
 
    formData.append('address', this.addForm.value.address);
    formData.append('email', this.addForm.value.email);
    formData.append('ispLocation', this.addForm.value.ispLocation);
    formData.append('name', this.addForm.value.name);
    formData.append('phoneNumber', this.addForm.value.phoneNumber);
    formData.append('newIspId', this.ispId);
    this.service
      .updatenewIspById(formData, this.ispId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/new-isp']);
        } else {
        }
      });
  }
  onReset(){
    this.addForm.reset();
  }
  onCancle(){
    this.router.navigate(['/new-isp']);

  }
}