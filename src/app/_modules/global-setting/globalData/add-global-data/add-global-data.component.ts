import { HttpEvent, HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { EncrdecrService } from 'src/app/_services/encrdecr.service';
import { ValidationService } from 'src/app/_services/validation.service';
import { LanguageService } from 'src/app/_services/language.service';
import { GlobalSettingService } from 'src/app/_services/global-setting.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ApiService } from 'src/app/_services/api.service';
import { UploadResponse } from '@kolkov/angular-editor';
import { Observable, tap } from 'rxjs';
import { PagesService } from 'src/app/_services/pages.service';
import { QuickLinksService } from 'src/app/_services/Quicklinks.service';

@Component({
  selector: 'app-add-global-data',
  templateUrl: './add-global-data.component.html',
  styleUrls: ['./add-global-data.component.scss']
})
export class AddGlobalDataComponent implements OnInit {
  addForm: FormGroup | any;
  fileToUpload: any = null;
  settingId: any;
  langId: any;
  languageList: any;
  settingTypeList: any;
  error = 'photo should be 570 x 1920 size';
  isImageSize = false;
  languageId = '';
  showImageNameFile = true;
  updateDataById : any;
  pageList:any
  token:any=localStorage.getItem('tokenAdmin')
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '200px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'},
        {class: 'Open-Sans', name: 'Open Sans'},
        {class: 'sans-serif', name: 'sans-serif'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },

      {
        name: 'table',
        class: '<!--',
        tag: 'table class="table table-bordered"><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></table> <!-- '
    }
    ],
    uploadUrl:`${this.api.apiUrl}auth/uploadImageToEditor`,
    // upload: (file: File):any => {
    //   console.log(file);

    // },
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  }
  constructor(
    private api: ApiService,
    private httpClient: HttpClient,
    private pageService:PagesService,
    private fb: FormBuilder,
    private service: GlobalSettingService,
    private langService: LanguageService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private uService: UtilitydesignService,
    private _service: QuickLinksService,
    private EncrDecr: EncrdecrService,
    private validationService: ValidationService
  ) {
    this._ac.paramMap.subscribe((param) => {
      this.settingId = param.get('id');
      this.langId = param.get('langId');
      console.log(this.settingId);
    });

    if (this.settingId) {
      this.addForm = this.fb.group({
        title: new FormControl(['']),
        subject: new FormControl([''], [Validators.required]),
        redirectUrl: new FormControl(['']),
        pageId: new FormControl(['']),
        settingType: new FormControl([''], [Validators.required]),
        message: new FormControl([''], [Validators.required]),
        readMore: new FormControl([''], [Validators.required]),
        languageId: new FormControl([this.langId], [Validators.required]),
        file: new FormControl(''),
      });
      this.uService.isLoading = true;
      console.log(this.addForm.readMore,"ADDForm")
      this.getDataById();
     
    } else {
      this.addForm = this.fb.group({
        title: new FormControl(['']),
        subject: new FormControl([''], [Validators.required]),
        redirectUrl: new FormControl(['']),
        pageId: new FormControl(['']),
        settingType: new FormControl([''], [Validators.required]),
        message: new FormControl([''], [Validators.required]),
        readMore: new FormControl([''], [Validators.required]),
        languageId: new FormControl([this.langId], [Validators.required]),
        file: new FormControl(''),
      });
      console.log(this.addForm.readMore,"ADDForm")
    }
  }
  // uploadImageByAngularEditor(file: File):
  // Observable<HttpEvent<UploadResponse>> {
  //     const url = `${this.api.apiUrl}admin/uploadImageToEditor`;
  //     const formData: FormData = new FormData();
  //     formData.append('file', file);
  //     formData.append('file', file);
  //     return this.httpClient.post<UploadResponse>(url, formData, {
  //       observe: 'events',
  //       headers: new HttpHeaders().set('Authorization', this.token)
  //     }).pipe(tap(console.log));
  //   }
  get controls() {
    return this.addForm.controls;
  }

  ngOnInit(): void {
    this.pageService.getAllPage().subscribe((res:any)=>{
      this.uService.isLoading= false;
    if(res.status){
      this.pageList= res.data.filter((page:any) => page.status== true);
      console.log(this.pageList)
    }
    })
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
    this.service.getSettingTypeList().subscribe((res: any) => {
      this.settingTypeList = res.data;
    });
    localStorage.removeItem('editItemId');
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
    if(file){
      this.showImageNameFile = false
    }

    const img = new Image();
    img.src = window.URL.createObjectURL( file );
    reader.readAsDataURL(file);
    reader.onload = () => {

      const width = img.naturalWidth;
      const height = img.naturalHeight;

      window.URL.revokeObjectURL( img.src );
      console.log(height, width);

      if ((height != 570) && (width != 1920)) {
        // this.error = "photo should be 570 x 1920 size";
        // this.toaster.warning(this.error)
        // this.isImageSize= false;
       }
       else{
        this.isImageSize= true
       }
       console.log(this.isImageSize);


    }
    if (file) {
      this.fileToUpload = file;

      //     const formData = new FormData();
      // console.log(this.fileToUpload);

      // formData.append("thumbnail", file);

      // const upload$ = this.http.post("/api/thumbnail-upload", formData);

      // upload$.subscribe();
    }
  }

  getDataById() {
    debugger;
    const formData = new FormData();
    this.langId = this.addForm.value.languageId;
    formData.append('languageId', this.langId);
    formData.append('setting_Id', this.settingId);
    this.service.getGlobalDataById(formData).subscribe((res: any) => {
      this.updateDataById = res;
      this.uService.isLoading = false;
      this.addForm.patchValue({
        title: res?.data?.title,
        subject: res?.data?.subject,
        redirectUrl: res?.data?.redirectUrl,
        pageId: res?.data?.pageId?.pageId,
        settingType: res?.data?.settingType,
        message: res?.data?.message,
        readMore: res?.data?.readMore,
        languageId: res?.data?.languageId || this.langId,
      });
      console.log(this.updateDataById,"updateDataById")
    });
  }

  onReset(value: number) {
    if (value == 1) {
      this.addForm.reset();
    } else {
      this.router.navigate(['/global-setting/data']);
    }
  }
  onSubmit() {
    this.addForm.patchValue({
      file:this.fileToUpload
    })
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }

    this.uService.isLoading = true;
    const formData = new FormData();
    formData.append('languageId', this.addForm.value.languageId);
    formData.append('title', this.addForm.value.title);
    formData.append('subject', this.addForm.value.subject);
    formData.append('redirectUrl', this.addForm.value.redirectUrl);
    formData.append('settingType', this.addForm.value.settingType);
    formData.append('message', this.addForm.value.message);
    formData.append('pageId', this.addForm.value.pageId);
    formData.append('readMore', this.addForm.value.readMore);
    formData.append('file', this.fileToUpload);

    console.log(this.addForm.value.readMore, 'formdata');
    this.service.addGlobalData(formData).subscribe(
      (data: any) => {
        this.uService.isLoading = false;

        if (data.status) {
          this.toaster.success(data.message);
          this.router.navigate(['/global-setting/data']);
        } else {
          this.toaster.error(data.message);
        }
      },
      (error) => {
        this.toaster.error(error.error.message);
      }
    );
  }
  onUpdate() {

    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }
    // if(!this.isImageSize){
    //   this.toaster.error(this.error)
    //   return
    // }
    this.uService.isLoading = true;

    const formData = new FormData();
    formData.append('languageId', this.addForm.value.languageId);
    formData.append('title', this.addForm.value.title);
    formData.append('subject', this.addForm.value.subject);
    formData.append('redirectUrl', this.addForm.value.redirectUrl);
    formData.append('settingType', this.addForm.value.settingType);
    formData.append('pageId', this.addForm.value.pageId);
    formData.append('message', this.addForm.value.message);
    formData.append('readMore', this.addForm.value.readMore);
    formData.append('setting_Id', this.settingId);
    formData.append('file', this.fileToUpload);

    console.log(this.addForm.value.readMore, 'formdata');
    this.service
      .updateGlobalDataById(formData)
      .subscribe((data: any) => {
        this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/global-setting/data']);
        } else {
        }
      });
  }
}
