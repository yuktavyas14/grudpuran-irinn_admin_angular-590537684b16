import { ContactUsService } from './../../../_services/contactus.service';
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
  selector: 'app-add-contact-us',
  templateUrl: './add-contact-us.component.html',
  styleUrls: ['./add-contact-us.component.scss']
})
export class AddContactUsComponent implements OnInit {
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
    private service: ContactUsService,
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
        title1: new FormControl(''),
        title2: new FormControl(''),
        title3: new FormControl(''),
        address1: new FormControl(''),
        address2: new FormControl(''),
        state1: new FormControl(''),
        state2: new FormControl(''),
        country1: new FormControl(''),
        country2: new FormControl(''),
        pinCode: new FormControl(''),
        note: new FormControl(''),
        phoneNo1: new FormControl(''),
        phoneNo2: new FormControl(''),
        faxNo: new FormControl(''),
        email: new FormControl(''),
        rTIRelated: new FormControl(''),
        note2: new FormControl(''),
        url1: new FormControl(''),
        url2: new FormControl(''),
        description: new FormControl(''),
        expiryDate: new FormControl(''),
        languageId: new FormControl([this.langId], [Validators.required]),
    
      });
       this.uService.isLoading = true;

       this.getDataById();
       
    } else {
      this.addForm = this.fb.group({
        title1: new FormControl(''),
        title2: new FormControl(''),
        title3: new FormControl(''),
        address1: new FormControl(''),
        address2: new FormControl(''),
        state1: new FormControl(''),
        state2: new FormControl(''),
        country1: new FormControl(''),
        country2: new FormControl(''),
        pinCode: new FormControl(''),
        note: new FormControl(''),
        phoneNo1: new FormControl(''),
        phoneNo2: new FormControl(''),
        faxNo: new FormControl(''),
        email: new FormControl(''),
        rTIRelated: new FormControl(''),
        note2: new FormControl(''),
        url1: new FormControl(''),
        url2: new FormControl(''),
        description: new FormControl(''),
        expiryDate: new FormControl(''),
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
    formData.append('title1', this.addForm.value.title1);
    formData.append('title2', this.addForm.value.title2);
    formData.append('title3', this.addForm.value.title3);
    formData.append('address1', this.addForm.value.address1);
    formData.append('address2', this.addForm.value.address2);
    formData.append('state1', this.addForm.value.state1);
    formData.append('state2', this.addForm.value.state2);
    formData.append('country1', this.addForm.value.country1);
    formData.append('country2', this.addForm.value.country2);
    formData.append('pinCode', this.addForm.value.pinCode);
    formData.append('note', this.addForm.value.note);
    formData.append('phoneNo1', this.addForm.value.phoneNo1);
    formData.append('phoneNo2', this.addForm.value.phoneNo2);
    formData.append('faxNo', this.addForm.value.faxNo);
    formData.append('email', this.addForm.value.email);
    formData.append('rTIRelated', this.addForm.value.rTIRelated);
    formData.append('note2', this.addForm.value.note2);
    formData.append('url1', this.addForm.value.title1);
    formData.append('url2', this.addForm.value.url2);
    formData.append('description', this.addForm.value.description);
    formData.append('expiryDate', this.addForm.value.expiryDate);
    formData.append('languageId', this.addForm.value.languageId);
    this.service.addContactUs(formData).subscribe((data: any) => {
       this.uService.isLoading = false;
      if (data.status) {
        this.router.navigate(['/contact-us']);
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
    formData.append('title1', this.addForm.value.title1);
    formData.append('title2', this.addForm.value.title2);
    formData.append('title3', this.addForm.value.title3);
    formData.append('address1', this.addForm.value.address1);
    formData.append('address2', this.addForm.value.address2);
    formData.append('state1', this.addForm.value.state1);
    formData.append('state2', this.addForm.value.state2);
    formData.append('country1', this.addForm.value.country1);
    formData.append('country2', this.addForm.value.country2);
    formData.append('pinCode', this.addForm.value.pinCode);
    formData.append('note', this.addForm.value.note);
    formData.append('phoneNo1', this.addForm.value.phoneNo1);
    formData.append('phoneNo2', this.addForm.value.phoneNo2);
    formData.append('faxNo', this.addForm.value.faxNo);
    formData.append('email', this.addForm.value.email);
    formData.append('rTIRelated', this.addForm.value.rTIRelated);
    formData.append('note2', this.addForm.value.note2);
    formData.append('url1', this.addForm.value.title1);
    formData.append('url2', this.addForm.value.url2);
    formData.append('description', this.addForm.value.description);
    formData.append('expiryDate', this.addForm.value.expiryDate);
    formData.append('languageId', this.addForm.value.languageId);

    this.service
      .updateContactUsById(formData, this.faqId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/contact-us']);
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
    this.service.contactUsById(this.faqId).subscribe((res: any) => {
      this.uService.isLoading = false;
     this.addForm.patchValue({
      title1: res?.data?.title1,
      title2: res?.data?.title2,
      title3: res?.data?.title3,
      address1: res?.data?.address1,
      address2: res?.data?.address2,
      state1: res?.data?.state1,
      state2: res?.data?.state2,
      country1: res?.data?.country1,
      country2: res?.data?.country2,
      pinCode: res?.data?.pinCode,
      note: res?.data?.note,
      phoneNo1: res?.data?.phoneNo1,
      phoneNo2: res?.data?.phoneNo2,
      faxNo: res?.data?.faxNo,
      email: res?.data?.email,
      rTIRelated: res?.data?.rTIRelated,
      note2: res?.data?.note2,
      url1: res?.data?.url1,
      url2: res?.data?.url2,
      description: res?.data?.description,
      expiryDate: res?.data?.expiryDate,
      languageId: res?.data?.languageId || this.langId,
     });
   });
  }
}