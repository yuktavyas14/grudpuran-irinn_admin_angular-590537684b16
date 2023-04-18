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
import { ValidationService } from 'src/app/_services/validation.service';
import { LanguageService } from 'src/app/_services/language.service';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFaqComponent implements OnInit {
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
  addForm: FormGroup | any;
  fileToUpload: any = null;
  faqId: any;
  langId: any;
   error = "photo should be 570 x 1920 size";
  isImageSize= false;
  languageList:any;
  languageId=''

  constructor(
    private fb: FormBuilder,
    private service: FaqService,
    private uService: UtilitydesignService,
    private _ac: ActivatedRoute,
    private langService: LanguageService,
    private router: Router,
    private toaster:ToastrService,
    private validationService:ValidationService

  ) {
    this._ac.paramMap.subscribe((param) => {
      this.faqId = param.get('id');
      this.langId = param.get('langId');
      //alert(this.matchId)
    });

    if (this.faqId) {
      this.addForm = this.fb.group({
        faqQuestion: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(6)]),
        faqAnswer: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(10)]),
        languageId: new FormControl([this.langId], [Validators.required]),
    
      });
       this.uService.isLoading = true;

       this.getDataById();
       
    } else {
      this.addForm = this.fb.group({
        faqQuestion: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(6)]),
        faqAnswer: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(10)]),
        languageId: new FormControl(['1'], [Validators.required]),
      });
    }
  }
 
  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList= res.data;
   
    });
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
   
    formData.append('question', this.addForm.value.faqQuestion);
    formData.append('answer', this.addForm.value.faqAnswer);
    formData.append('languageId', this.addForm.value.languageId);
    this.service.addFaq(formData).subscribe((data: any) => {
       this.uService.isLoading = false;
      if (data.status) {
        this.router.navigate(['/faq']);
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
    formData.append('question', this.addForm.value.faqQuestion);
    formData.append('answer', this.addForm.value.faqAnswer);
    formData.append('languageId', this.addForm.value.languageId);

    this.service
      .updateFaq(formData, this.faqId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/faq']);
        } else {
        }
      });
  }
  onReset(){
    this.addForm.reset();
  }
  onCancle(){
    this.router.navigate(['/faq']);

  }
  getDataById(){
    const formData= new FormData()
    this.languageId=this.addForm.value.languageId
    formData.append('languageId',this.languageId)
    formData.append('id',this.faqId)
    this.service.getFaqById(this.faqId).subscribe((res: any) => {
      this.uService.isLoading = false;
     this.addForm.patchValue({
      faqQuestion: res?.data?.question,
      faqAnswer: res?.data?.answer,
      languageId: res?.data?.languageId || this.langId,
     });
   });
  }
}