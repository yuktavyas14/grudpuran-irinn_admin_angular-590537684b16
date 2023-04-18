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
import { ValidationService } from 'src/app/_services/validation.service';
import { LanguageService } from 'src/app/_services/language.service';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
  // public Editor = ClassicEditor;

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
  langId: any;
  languageList: any;
  constructor(
    private fb: FormBuilder,
    private service: PagesService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private uService:UtilitydesignService,
    private validationService:ValidationService,
    private langService: LanguageService,

  ) {
    this._ac.paramMap.subscribe((param) => {
      this.pageId = param.get('pageId');
      this.langId = param.get('langId');
      //alert(this.matchId)
    });
    console.log(this.pageId,"id")

    if (this.pageId) {
      this.addForm = this.fb.group({
        pageName: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        pageContent: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(10)]),
        languageId: new FormControl([this.langId], [Validators.required]),
        // roleName: new FormControl([this.langId], [Validators.required]),
        //pageUrl: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator()])

      });
        this.uService.isLoading = true;

      this.service.getPageById(this.pageId).subscribe((res: any) => {
         this.uService.isLoading = false;
         console.log(
          res.data,'asdasdasd'
         );

        this.addForm.patchValue({

          pageName: res.data.pageName,
          pageContent: res.data.pageContent,
          languageId: res.data.languageId || this.langId,
          //pageUrl: res.data.pageUrl,

        });
      });
    } else {
      this.addForm = this.fb.group({
        pageName: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        pageContent: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(10)]),
        languageId: new FormControl(['1'], [Validators.required]),

        //pageUrl: new FormControl("", [Validators.required,this.validationService.noWhitespaceValidator()])
      });
    }
  }

  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
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
  openurl(){
    let url:any="/global-setting/editor-gallery";
    // window.open(url, "_blank")
    this.router.navigate([url])
  }
  onSubmit() {
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

    formData.append('pageName', this.addForm.value.pageName);
    formData.append('pageContent', this.addForm.value.pageContent);
    formData.append('languageId', this.addForm.value.languageId);
   // formData.append('pageUrl', this.addForm.value.pageUrl);
    formData.append('roleName', this.userInfo.id);
    this.service.addPage(formData).subscribe((data: any) => {
        this.uService.isLoading = false;
      if (data.status) {
        this.router.navigate(['/pages']);
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
    formData.append('pageName', this.addForm.value.pageName);
    formData.append('pageContent', this.addForm.value.pageContent);
    formData.append('languageId', this.addForm.value.languageId);
    // formData.append('pageUrl', this.addForm.value.pageUrl);
    formData.append('roleName', this.userInfo.id);
    this.service
      .updatePageById(formData, this.pageId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/pages']);
        } else {
        }
      });
  }

  onReset(){
    this.addForm.reset();
  }
  onCancle(){
    this.router.navigate(['/pages']);

  }
}
