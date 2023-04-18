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
import { ConnectmemberService } from 'src/app/_services/connectmember.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { ValidationService } from 'src/app/_services/validation.service';
@Component({
  selector: 'app-add-connectmember',
  templateUrl: './add-connectmember.component.html',
  styleUrls: ['./add-connectmember.component.scss']
})
export class AddConnectmemberComponent implements OnInit {
  addForm: FormGroup | any;
  fileToUpload: any = null;
  memberId: any;
   error = "photo should be 570 x 1920 size";
  isImageSize= false
  constructor(
    private fb: FormBuilder,
    private service: ConnectmemberService,
    private uservice:UtilitydesignService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private validationService:ValidationService

  ) {
    this._ac.paramMap.subscribe((param) => {
      this.memberId = param.get('id');
      //alert(this.matchId)
    });

    if (this.memberId) {
      this.addForm = this.fb.group({
        companyName: new FormControl("",[Validators.required, this.validationService.noWhitespaceValidator(),Validators.minLength(2)]),
        email: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        memberName: new FormControl("",[Validators.required, this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        phoneNumber: new FormControl("",[Validators.required, this.validationService.noWhitespaceValidator(),Validators.minLength(10)])
        

      });
      this.uservice.isLoading = true;

      this.service.getConMembersDetailsById(this.memberId).subscribe((res: any) => {
       this.uservice.isLoading = false;
        this.addForm.patchValue({
          
          companyName: res.data.companyName,
          email: res.data.email,
          memberName: res.data.memberName,
          phoneNumber: res.data.phoneNumber,
           
        });
      });
    } else {
      this.addForm = this.fb.group({
        companyName: new FormControl("",[Validators.required, this.validationService.noWhitespaceValidator(),Validators.minLength(2)]),
        email: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        memberName: new FormControl("",[Validators.required, this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        phoneNumber: new FormControl("",[Validators.required, this.validationService.noWhitespaceValidator(),Validators.minLength(10)])
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
    // if(!this.isImageSize){
    //   this.toaster.error(this.error)
    //   return
    // }
    if(this.addForm.invalid){
      this.addForm.markAllAsTouched()
      return
    }
   this.uservice.isLoading = true;
    const formData = new FormData();
   
    formData.append('companyName', this.addForm.value.companyName);
    formData.append('email', this.addForm.value.email);
    formData.append('memberName', this.addForm.value.memberName);
    formData.append('phoneNumber', this.addForm.value.phoneNumber);
    this.service.addConMembersDetails(formData).subscribe((data: any) => {
     this.uservice.isLoading = false;
      if (data.status) {
        this.router.navigate(['/connectmember']);
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
   this.uservice.isLoading = true;

    const formData = new FormData();
    formData.append('companyName', this.addForm.value.companyName);
    formData.append('email', this.addForm.value.email);
    formData.append('memberName', this.addForm.value.memberName);
    formData.append('phoneNumber', this.addForm.value.phoneNumber);
    this.service
      .updateConMembersDetails(formData, this.memberId)
      .subscribe((data: any) => {
       this.uservice.isLoading = false;

        if (data.status) {
          this.router.navigate(['/connectmember']);
        } else {
        }
      });
  }
  onReset(value:number){
    if(value ==1){
this.addForm.reset();
    }else{
this.router.navigate(['/connectmember'])
    }

  }
}