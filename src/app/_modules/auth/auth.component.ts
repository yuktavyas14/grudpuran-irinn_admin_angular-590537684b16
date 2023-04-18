import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup | any;
  password = 'password';
  show = false;
  RememberMeData:any;
  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private ac: ActivatedRoute,
    private mgservice: UtilitydesignService,
    private service: AuthService,
    private route: Router,
    private toastr: ToastrService,
    private userservice: UserService
  ) {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      remember: new FormControl(''),
    });
  }

  ngOnInit(): void {
    let data :any= localStorage.getItem('RememberMe');
    console.log(data);
    
    this.RememberMeData = JSON.parse(data)
    if( this.RememberMeData !== undefined &&  this.RememberMeData !== null &&  this.RememberMeData !== ''){
     
      this.loginForm.patchValue({
        username:  this.RememberMeData.username,
        password: this.RememberMeData.password,
    })
  }
  }
  Login() {
    // debugger

    // console.log(this.loginForm.invalid ,"invalid", this.loginForm.value)
    // if (this.loginForm.invalid) {
    //   this.loginForm.markAllAsTouched()
    //  return;
    //  }
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.mgservice.isLoading = true;
   
    const formData = new FormData();
    formData.append('username', this.loginForm.value.username);
    formData.append('password', this.loginForm.value.password);
    // this.recpatch= localStorage.getItem('tokenid');

    this.service.login(formData).subscribe(
      (data: any) => {
        this.mgservice.isLoading = false;

        if (data.status) {
          const user = new User();
          user.setData(data.data);
          localStorage.setItem('logedIn', JSON.stringify('true'));
          user.setToken(data.data.accessToken.toString());
          this.route.navigate(['/dashboard']);
          this.toastr.success(data.message);
        } else {
        console.log(1111);

          this.toastr.error(data.message);
          // this.toastr.error('Hello world!', 'Toastr fun!');
        }
      },
      (error) => {
        console.log(error);

        this.toastr.error(error.error.message);
      }
    );
  }
  onRemberMe(ev: any) {
    if (ev.target.checked) {
       
      let rememberMe = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      localStorage.setItem('RememberMe', JSON.stringify(rememberMe));
    } else {
       
      localStorage.removeItem('RememberMe');
      
    }
  }

  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
  isRememberMeData(){
    if( this.RememberMeData != undefined &&  this.RememberMeData != null &&  this.RememberMeData != ''){
      console.log('askjdkasdsadkj');
      
      return true;
    }
    else{
      return false
    }
  }
}
