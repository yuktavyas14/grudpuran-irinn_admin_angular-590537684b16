import { PagesService } from 'src/app/_services/pages.service';
import { QuickLinksService } from './../../../_services/Quicklinks.service';
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
@Component({
  selector: 'app-add-quick-links',
  templateUrl: './add-quick-links.component.html',
  styleUrls: ['./add-quick-links.component.scss']
})
export class AddQuickLinksComponent implements OnInit {
  addForm: FormGroup | any;
  fileToUpload: any = null;
  ipv6Id: any;
  langId: any;
  languageList: any;
  pageList: any;
  error = 'photo should be 570 x 1920 size';
  isImageSize = false;
  languageId = '';
  constructor(
    private fb: FormBuilder,
    private service: QuickLinksService,
    private langService: LanguageService,
    private pageService: PagesService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private uService: UtilitydesignService,
    private EncrDecr: EncrdecrService,
    private validationService: ValidationService
  ) {
    this._ac.paramMap.subscribe((param) => {
      this.ipv6Id = param.get('id');
      this.langId = param.get('langId');
      console.log(this.ipv6Id);
    });

    if (this.ipv6Id) {
      this.addForm = this.fb.group({
        quickLinkName: new FormControl([''], [Validators.required]),
        redirectUrl: new FormControl(['']),
        pageId: new FormControl(['']),
        languageId: new FormControl([this.langId], [Validators.required]),
      });
      this.uService.isLoading = true;
      this.getDataById();
    } else {
      this.addForm = this.fb.group({
        quickLinkName: new FormControl([''], [Validators.required]),
        redirectUrl: new FormControl(['']),
        pageId: new FormControl(['']),
        languageId: new FormControl(['1'], [Validators.required]),
      });
    }
  }
  get controls() {
    return this.addForm.controls;
  }

  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
    this.pageService.getAllPage().subscribe((res:any)=>{
      this.uService.isLoading= false;
    if(res.status){
      this.pageList= res.data.filter((page:any) => page.status== true);
      console.log(this.pageList)
    }
    })
    localStorage.removeItem('editItemId');
  }

  getDataById() {
    const formData = new FormData();
    this.langId = this.addForm.value.languageId;
    formData.append('languageId', this.langId);
    formData.append('id', this.ipv6Id);
    this.service.getQuickLinkListById(formData).subscribe((res: any) => {
      this.uService.isLoading = false;
      this.addForm.patchValue({
        quickLinkName: res?.data?.quickLinkName,
        redirectUrl: res?.data?.redirectUrl,
        pageId: res?.data?.pageId?.pageId,
        languageId: res?.data?.languageId || this.langId,
      });
    });
  }

  onReset(value: number) {
    if (value == 1) {
      this.addForm.reset();
    } else {
      this.router.navigate(['/quick-links']);
    }
  }
  onSubmit() {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }
 
    this.uService.isLoading = true;
    const formData = new FormData();
    formData.append('languageId', this.addForm.value.languageId);
    formData.append('quickLinkName', this.addForm.value.quickLinkName);
    formData.append('redirectUrl', this.addForm.value.redirectUrl);
    formData.append('pageId', this.addForm.value.pageId);
    console.log(formData, 'formdata');
    this.service.addQuickLink(formData).subscribe(
      (data: any) => {
        this.uService.isLoading = false;

        if (data.status) {
          this.toaster.success(data.message);
          this.router.navigate(['/quick-links']);
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
    formData.append('quickLinkName', this.addForm.value.quickLinkName);
    formData.append('redirectUrl', this.addForm.value.redirectUrl);
    formData.append('pageId', this.addForm.value.pageId);
    formData.append('id', this.ipv6Id);
    console.log(formData, 'formdata');
    this.service
      .updateQuickLinkById(formData)
      .subscribe((data: any) => {
        this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/quick-links']);
        } else {
        }
      });
  }
}
