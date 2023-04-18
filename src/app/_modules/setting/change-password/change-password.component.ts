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
import { FaqService } from 'src/app/_services/faq.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { ValidationService } from 'src/app/_services/validation.service';
import Validation from 'src/app/_utils/validation';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  userId:any;
  addForm: FormGroup | any;
  userInfo:any= new User().getData();
  passwordIsValid = false;
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private uService: UtilitydesignService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private validationService:ValidationService

  ) {
   

    
    this.addForm = this.fb.group({
      newPassword: new FormControl('',[ Validators.required,  Validators.pattern(/^(?=.*[A-Za-z])(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
      confirmPassword: new FormControl('', Validators.required)
    },
    {
      validators: [Validation.match('newPassword', 'confirmPassword')]
    });
     
  }
 
  ngOnInit(): void {}
  
  onSubmit() {
    if(this.addForm.invalid){
      this.addForm.markAllAsTouched()
      return
    }
    if(this.addForm.value.newPassword !== this.addForm.value.confirmPassword){
      this.toaster.warning('Password and confirm password not same ');
      return
    }
     this.uService.isLoading = true;
    const formData = new FormData();
   
    formData.append('userId', this.userInfo.id);
    formData.append('newPassword', this.addForm.value.newPassword);
    formData.append('confirmPassword', this.addForm.value.confirmPassword);
    this.service.adminChangePassword(formData).subscribe((data: any) => {
       this.uService.isLoading = false;
      if (data.status) {
      this.toaster.success(data.message)

        this.router.navigate(['/dashboard']);
      } else {
      this.toaster.error(data.message)

      }
    },error=>{
      this.toaster.error(error.error.message)
    });
  }
  passwordValid(event:any) {
    this.passwordIsValid = event;
  }
  onReset(){
    this.addForm.reset();
  }
  onCancle(){
    this.router.navigate(['/dashboard']);

  }
}
