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
import { OtherActivityService } from 'src/app/_services/other-activity.service';
import { ValidationService } from 'src/app/_services/validation.service';

@Component({
  selector: 'app-add-other-activity',
  templateUrl: './add-other-activity.component.html',
  styleUrls: ['./add-other-activity.component.scss']
})
export class AddOtherActivityComponent implements OnInit {
 
  htmlContent:any;
  addForm: FormGroup | any;
  fileToUpload: any = null;
  faqId: any;
   error = "photo should be 570 x 1920 size";
  isImageSize= false
  constructor(
    private fb: FormBuilder,
    private service: OtherActivityService,
    private uService: UtilitydesignService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private validationService:ValidationService

  ) {
    this._ac.paramMap.subscribe((param) => {
      this.faqId = param.get('id');
      //alert(this.matchId)
    });

    if (this.faqId) {
      this.addForm = this.fb.group({
        otherActivityName: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        titleUrl: new FormControl('')

      });
       this.uService.isLoading = true;

      this.service.findActivitiesById(this.faqId).subscribe((res: any) => {
         this.uService.isLoading = false;
        this.addForm.patchValue({
          
          otherActivityName: res.data.otherActivityName,
          titleUrl: res.data.titleUrl,
           
        });
      });
    } else {
      this.addForm = this.fb.group({
        otherActivityName: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(6)]),
        titleUrl: new FormControl('')
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
     this.uService.isLoading = true;
    const formData = new FormData();
   
    formData.append('otherActivityName', this.addForm.value.otherActivityName);
    formData.append('titleUrl', this.addForm.value.titleUrl);
    this.service.addOtherActivity(formData).subscribe((data: any) => {
       this.uService.isLoading = false;
      if (data.status) {
        this.router.navigate(['/other-activity']);
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
    formData.append('otherActivityName', this.addForm.value.otherActivityName);
    formData.append('titleUrl', this.addForm.value.titleUrl);
    this.service
      .updateActivitiesById(formData, this.faqId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/other-activity']);
        } else {
        }
      });
  }

  onReset(){
    this.addForm.reset();
  }
  onCancle(){
    this.router.navigate(['/other-activity']);

  }
}