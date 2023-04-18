import { ValidationService } from './../../../_services/validation.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/_services/menu.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { LanguageService } from 'src/app/_services/language.service';
@Component({
  selector: 'app-add-footer',
  templateUrl: './add-footer.component.html',
  styleUrls: ['./add-footer.component.scss'],
})
export class AddFooterComponent implements OnInit {
  addForm: FormGroup | any;
  fileToUpload: any = null;
  footerId: any;
  languageId:any='1'
  languageList:any;
  langId: any;
  constructor(
    private fb: FormBuilder,
    private service: MenuService,
    private uService: UtilitydesignService,
    private _ac: ActivatedRoute,
    private router: Router,
    private validationService:ValidationService,
    private langService: LanguageService,

  ) {
    this._ac.paramMap.subscribe((param) => {
      this.footerId = param.get('id');
      this.langId = param.get('langId');

      //alert(this.matchId)
    });

    if (this.footerId) {
      this.addForm = this.fb.group({
        footerName: new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        footerUrl: new FormControl('',[Validators.required, this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        footerType: new FormControl(''),
        languageId: new FormControl([this.langId],[Validators.required]),
        footerDescription: new FormControl(''),
        status: new FormControl(''),
      });
      this.uService.isLoading = true;
      this.getDataById();
     
    } else {
      this.addForm = this.fb.group({
        footerName: new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        footerUrl: new FormControl('',[Validators.required, this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        footerType: new FormControl(''),
        footerDescription: new FormControl(''),
        languageId: new FormControl(['1'],[Validators.required]),
      });
    }
  }

  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
  }
  onCancel() {
    this.router.navigate(['/menu/footer']);
  }

  onSubmit() {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }
    this.uService.isLoading = true;

    const formData = new FormData();
    formData.append('name', this.addForm.value.footerName);
    formData.append('url', this.addForm.value.footerUrl);
    formData.append('languageId', this.addForm.value.languageId);
    // formData.append('footerType', this.addForm.value.footerType);
    // formData.append('footerDescription', this.addForm.value.footerDescription);
    console.log(formData, 'formdata');
    this.service.addFooterDetails(formData).subscribe((data: any) => {
      this.uService.isLoading = false;

      if (data.status) {
        this.router.navigate(['/menu/footer']);
      } else {
      }
    });
  }
  onUpdate() {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }
    this.uService.isLoading = true;

    const formData = new FormData();
    formData.append('name', this.addForm.value.footerName);
    formData.append('url', this.addForm.value.footerUrl);
    formData.append('languageId', this.addForm.value.languageId);
    // formData.append('footerType', this.addForm.value.footerType);
    // formData.append('footerDescription', this.addForm.value.footerDescription);
    // formData.append('status', this.addForm.value.status);
    this.service
      .update_footer_link(formData, this.footerId)
      .subscribe((data: any) => {
        this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/menu/footer']);
        } else {
        }
      });
  }

  onReset() {
    this.addForm.reset();
    this.addForm.patchValue({
      footerType: '',
    });
  }
  getDataById(){
 
    this.languageId=this.addForm.value.languageId
    this.service
    .get_footer_link_by_id(this.footerId)
    .subscribe((res: any) => {
      this.uService.isLoading = false;

      this.addForm.patchValue({
        footerName: res.data.name,
        footerUrl: res.data.url,
       languageId: res?.data?.languageId || this.langId,

        // footerType: res.data.footerType,
        // footerDescription: res.data.footerDescription,
        // status: res.data.status,
      });
    });
    
  }
}
