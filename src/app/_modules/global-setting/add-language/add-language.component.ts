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
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { User } from 'src/app/_models/user';
import { ValidationService } from 'src/app/_services/validation.service';
import { LanguageService } from 'src/app/_services/language.service';
@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.scss']
})
export class AddLanguageComponent implements OnInit {
  userInfo= new User().getData()
  addForm: FormGroup | any;
  languageId: any;
  constructor(
    private fb: FormBuilder,
    private service: LanguageService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private uService:UtilitydesignService,
    private validationService:ValidationService
  ) {
    this._ac.paramMap.subscribe((param) => {
      this.languageId = param.get('id');
      //alert(this.matchId)
    });

    if (this.languageId) {
      this.addForm = this.fb.group({
        language: new FormControl('', [Validators.required,  this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
      });
     const formData= new FormData();
     formData.append('id',this.languageId)
        this.uService.isLoading = true;

      this.service.getLanguageById(formData).subscribe((res: any) => {
         this.uService.isLoading = false;
         console.log(
          res.data,'asdasdasd'
         );
         
        this.addForm.patchValue({
          language: res.data.language,
          
           
        });
      });
    } else {
      this.addForm = this.fb.group({
        language: new FormControl('', [Validators.required,  this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        
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
   
    formData.append('language', this.addForm.value.language);
    // formData.append('responsbility', this.addForm.value.responsibility);
    this.service.addLanguage(formData).subscribe((data: any) => {
        this.uService.isLoading = false;
      if (data.status) {
        this.router.navigate(['/global-setting/languages']);
      } else {
      }
    });
  }
  onUpdate() {
    if(this.addForm.invalid){
      this.addForm.markAllAsTouched()
      return
    }
 
      this.uService.isLoading = true;

    const formData = new FormData();
 
    formData.append('language', this.addForm.value.language);
    formData.append('id', this.languageId);
    this.service
      .updateLanguageById(formData, this.languageId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/global-setting/languages']);
        } else {
        }
      });
  }
  onReset(){
    this.addForm.reset();
  }
  onCancle(){
    this.router.navigate(['/global-setting/languages']);

  }
}