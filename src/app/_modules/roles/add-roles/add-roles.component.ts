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
import { ValidationService } from 'src/app/_services/validation.service';
@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.scss']
})
export class AddRolesComponent implements OnInit {

  
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
  htmlContent:any;
  userInfo= new User().getData()
 editor = null;
 initControls = null;
 value = null;



  addForm: FormGroup | any;
  fileToUpload: any = null;
  pageId: any;
   error = "photo should be 570 x 1920 size";
  isImageSize= false
  constructor(
    private fb: FormBuilder,
    private service: RoleService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private uService:UtilitydesignService,
    private validationService:ValidationService
  ) {
    this._ac.paramMap.subscribe((param) => {
      this.pageId = param.get('id');
      //alert(this.matchId)
    });

    if (this.pageId) {
      this.addForm = this.fb.group({
        roleName: new FormControl('', [Validators.required,  this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        responsibility: new FormControl(""),
        

      });
     
        this.uService.isLoading = true;

      this.service.getRoleById(this.pageId).subscribe((res: any) => {
         this.uService.isLoading = false;
         console.log(
          res.data,'asdasdasd'
         );
         
        this.addForm.patchValue({
          roleName: res.data.roleName,
          responsibility: res.data.responsibility,
           
        });
      });
    } else {
      this.addForm = this.fb.group({
        roleName: new FormControl('', [Validators.required,  this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        responsibility: new FormControl(""),
      });
    }
  }
 
  ngOnInit(): void {
    
  }
 
  onSubmit() {
    if(this.addForm.invalid){
      this.addForm.markAllAsTouched()
      return
    }

      this.uService.isLoading = true;
    const formData = new FormData();
   
    formData.append('roleName', this.addForm.value.roleName);
    // formData.append('responsbility', this.addForm.value.responsibility);
    this.service.addRoles(formData).subscribe((data: any) => {
        this.uService.isLoading = false;
      if (data.status) {
        this.toaster.success(data.message);

        this.router.navigate(['/roles']);
      } else {
        this.toaster.error(data.message);
      }
    },error=>{
      this.toaster.error(error.error.message);
    });
  }
  onUpdate() {
    if(this.addForm.invalid){
      this.addForm.markAllAsTouched()
      return
    }
 
      this.uService.isLoading = true;

    const formData = new FormData();
    let respo:any= [1,2]
    formData.append('roleName', this.addForm.value.roleName);
    // formData.append('roleResponsibility', respo);
    formData.append('responsbility', this.addForm.value.responsibility);
    this.service
      .updateRoleById(formData, this.pageId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.toaster.success(data.message);
          this.router.navigate(['/roles']);
        } else {
        }
      },error=>{
        this.toaster.error(error.error.message);
      });
  }
  onReset(){
    this.addForm.reset();
  }
  onCancle(){
    this.router.navigate(['/roles']);

  }
}