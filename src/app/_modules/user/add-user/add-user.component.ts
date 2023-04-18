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
import { RoleService } from 'src/app/_services/role.service';
import { UserService } from 'src/app/_services/user.service';
import { ValidationService } from 'src/app/_services/validation.service';
import Validation from 'src/app/_utils/validation';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
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
  password: any;
  confirmPassword: any;
  htmlContent: any;
  userInfo = new User().getData();
  editor = null;
  initControls = null;
  value = null;

  addForm: FormGroup | any;
  fileToUpload: any = null;
  pageId: any;
  roleList: any;
  error = 'photo should be 570 x 1920 size';
  isImageSize = false;
  emailRegex =/[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  private userNameRegex = new RegExp('^[a-z0-9_-]{4,15}$');

  constructor(
    private fb: FormBuilder,
    private service: PagesService,
    private _userService: UserService,

    private _ac: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private uService: UtilitydesignService,
    private roleService: RoleService,
    private validationService:ValidationService
  ) {
    this._ac.paramMap.subscribe((param) => {
      this.getRoleList();

      this.pageId = param.get('id');
      //alert(this.matchId)
    });
    if (this.pageId) {
      this.addForm = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        userName: new FormControl('', [Validators.required,Validators.pattern(this.userNameRegex)]),
        name: new FormControl('', [Validators.required,Validators.minLength(3)]),
        lastName: new FormControl('', [Validators.required,Validators.minLength(3)]),
        userType: new FormControl('', [Validators.required]),
      });
      this.uService.isLoading = true;

      this._userService.getUserListById(this.pageId).subscribe((res: any) => {
        this.uService.isLoading = false;
        console.log(res.data);

        this.addForm.patchValue({
          email: res.data.email,
          userName: res.data.userName,
          name: res.data.firstName,
          lastName : res.data.lastName,
          userType: res.data.roles[0].id,


        });
      });
    } else {
      this.addForm = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        userName: new FormControl('', [Validators.required,Validators.pattern(this.userNameRegex)]),

        name: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        lastName: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),

        password: new FormControl('',[ Validators.required,  Validators.pattern(/^(?=.*[A-Za-z])(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),

        // password1:  ["", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/)]],
        confirm_password: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator()]),
        userType: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator()]),

      },
      {
        validators: [Validation.match('password', 'confirm_password')]
      });
    }
  }

  ngOnInit(): void {
    console.log(this.confirmPassword, 'confirmPassword');
  }

  checkConfirmPassword(event: any) {
    this.confirmPassword = event.value;
    this.password = this.password;
    console.log(this.confirmPassword, 'confirmPassword');
  }
  checkPassword(event: any) {
    this.confirmPassword = this.confirmPassword;
    this.password = event.value;
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
    img.src = window.URL.createObjectURL(file);
    reader.readAsDataURL(file);
    reader.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      window.URL.revokeObjectURL(img.src);
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
    };
    if (file) {
      this.fileToUpload = file;
    }
  }
  onSubmit() {
    console.log(this.addForm.value);
    console.log(this.addForm.status);


    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }

    // if(!this.isImageSize){
    //   this.toaster.error(this.error)
    //   return
    // }
    console.log("password match")

    if (this.addForm.value.password != this.addForm.value.confirm_password) {
      this.toaster.error('Password or confirm password not same');
      return;
    }

    this.uService.isLoading = true;
    const formData = new FormData();

    formData.append('email', this.addForm.value.email);
    formData.append('userName', this.addForm.value.userName);
    formData.append('password', this.addForm.value.password);
    formData.append('confirmPassword', this.addForm.value.confirm_password);
    formData.append('firstName', this.addForm.value.name);
    formData.append('lastName', this.addForm.value.lastName);
    formData.append('role', this.addForm.value.userType);
    this._userService.createNewUser(formData).subscribe(
      (data: any) => {
        this.uService.isLoading = false;
        if (data.status) {
          this.toaster.success(data.message);
          setTimeout(() => {
            this.router.navigate(['/user']);
          }, 500);
        } else {
          this.toaster.error(data.message);
        }
      },
      (error) => {
        console.log(error,'333');

        this.toaster.error(error.error.message);
      }
    );
  }
  onUpdate() {
    console.log(this.addForm.value);

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
    formData.append('email', this.addForm.value.email);
    formData.append('userName', this.addForm.value.userName);
    formData.append('firstName', this.addForm.value.name);
    formData.append('lastName', this.addForm.value.lastName);
    formData.append('role', this.addForm.value.userType);

    this._userService
      .updateUser(formData, this.pageId)
      .subscribe((data: any) => {
        this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/user']);
        } else {
        }
      });
  }
  getRoleList() {
    this.uService.isLoading = true;
    this.roleService.getRoleList().subscribe((res: any) => {
      this.uService.isLoading = false;
      if (res.status) {
        this.roleList = res.data.filter((role:any)=>role.active== true );
      }
    });
  }
  onReset(){
    this.addForm.reset();

    this.addForm.patchValue({

      userType: '',
    });
  }
  onCancle(){
    this.router.navigate(['/user']);

  }
}
