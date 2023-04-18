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
  selector: 'app-why-add',
  templateUrl: './why-add.component.html',
  styleUrls: ['./why-add.component.scss'],
})
export class WhyAddComponent implements OnInit {
  addForm: FormGroup | any;
  fileToUpload: any = null;
  ipv6Id: any;
  langId: any;
  languageList: any;
  error = 'photo should be 570 x 1920 size';
  isImageSize = false;
  languageId = '';
  constructor(
    private fb: FormBuilder,
    private service: GlobalSettingService,
    private langService: LanguageService,
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
        operationName: new FormControl([''], [Validators.required]),
        IPv4: new FormControl(['yes'], [Validators.required]),
        IPv6: new FormControl(['yes'], [Validators.required]),
        languageId: new FormControl([this.langId], [Validators.required]),
      });
      this.uService.isLoading = true;
      this.getDataById();
    } else {
      this.addForm = this.fb.group({
        operationName: new FormControl([''], [Validators.required]),
        IPv4: new FormControl(['yes'], [Validators.required]),
        IPv6: new FormControl(['yes'], [Validators.required]),
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
    localStorage.removeItem('editItemId');
  }

  getDataById() {
    const formData = new FormData();
    this.langId = this.addForm.value.languageId;
    formData.append('languageId', this.langId);
    formData.append('id', this.ipv6Id);
    this.service.getwhyIPv6ByIdAndLanguageId(formData).subscribe((res: any) => {
      this.uService.isLoading = false;
      this.addForm.patchValue({
        operationName: res?.data?.operationName,
        IPv4: res?.data?.ipv4,
        IPv6: res?.data?.ipv6,
        languageId: res?.data?.languageId || this.langId,
      });
    });
  }

  onReset(value: number) {
    if (value == 1) {
      this.addForm.reset();
    } else {
      this.router.navigate(['/global-setting/why-ipv6']);
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
    formData.append('operationName', this.addForm.value.operationName);
    formData.append('IPv4', this.addForm.value.IPv4);
    formData.append('IPv6', this.addForm.value.IPv6);
    console.log(formData, 'formdata');
    this.service.addWhyIPv6(formData).subscribe(
      (data: any) => {
        this.uService.isLoading = false;

        if (data.status) {
          this.toaster.success(data.message);
          this.router.navigate(['/global-setting/why-ipv6']);
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
    formData.append('operationName', this.addForm.value.operationName);
    formData.append('IPv4', this.addForm.value.IPv4);
    formData.append('IPv6', this.addForm.value.IPv6);
    formData.append('id', this.ipv6Id);
    console.log(formData, 'formdata');
    this.service
      .updateWhyIPv6ById(formData)
      .subscribe((data: any) => {
        this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/global-setting/why-ipv6']);
        } else {
        }
      });
  }
}
