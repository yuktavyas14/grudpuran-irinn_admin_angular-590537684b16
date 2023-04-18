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
import { TenderService } from 'src/app/_services/tender.service';
@Component({
  selector: 'app-add-tender',
  templateUrl: './add-tender.component.html',
  styleUrls: ['./add-tender.component.scss']
})
export class AddTenderComponent implements OnInit {
  addForm: FormGroup | any;
  fileToUpload: any = null;
  tenderId: any;
  langId: any;
  languageList:any;
  showImageNameFile = true;
  updateDataById : any;
  pdf = false;
  errorMsg = "File must contain pdf";

  constructor(
    private fb: FormBuilder,
    private service: TenderService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private uService:UtilitydesignService,
    private EncrDecr: EncrdecrService,
    private langService: LanguageService,
    private validationService:ValidationService
  ) {
    this._ac.paramMap.subscribe((param) => {

      this.tenderId = param.get('id');
      this.langId = param.get('langId');

    });

    if (this.tenderId) {
      this.addForm = this.fb.group({
        title:new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator()]),
        message: new FormControl('',[Validators.maxLength(250)]),
        file: new FormControl(''),
        languageId: new FormControl('1'),
        tenderType: new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator()]),
        startDate: new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator()]),
        endDate: new FormControl(''),

        });
       this.uService.isLoading = true;
          const formData= new FormData();
          formData.append('id',this.tenderId)
      this.service.getTenderByid(formData).subscribe((res: any) => {
        this.updateDataById = res;

         this.uService.isLoading = false;
        this.addForm.patchValue({
          title: res.data.title,
          message: res.data.message,
          languageId: res.data.languageId,
          tenderType: res.data.tenderType,
          startDate: res.data.startDate,
          endDate: res.data.endDate,

        });
      });
    } else {
      this.addForm = this.fb.group({
        title:new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator()]),
        message: new FormControl('',[Validators.maxLength(250)]),
        file: new FormControl(''),
        languageId: new FormControl('1'),
        tenderType: new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator()]),
        startDate: new FormControl('', [Validators.required, this.validationService.noWhitespaceValidator()]),
        endDate: new FormControl(''),
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

  onFileSelected(event: any) {
    let reader = new FileReader();
    const file: File = event.target.files[0];
    console.log(file);
    if(file){
      this.showImageNameFile = false
    }
    const pdfValidate = file.name.endsWith('.pdf');
    if(!pdfValidate){
      this.pdf = false;
      this.toaster.error(this.errorMsg)
    }else{
      this.pdf = true;
    }

    const img = new Image();
    img.src = window.URL.createObjectURL( file );
    reader.readAsDataURL(file);
    reader.onload = () => {

      const width = img.naturalWidth;
      const height = img.naturalHeight;
      window.URL.revokeObjectURL( img.src );
    }
    if (file) {
      this.fileToUpload = file;

    }
  }
  onReset(value:number){
    if(value ==1){
this.addForm.reset();
    }else{
this.router.navigate(['/tender'])
    }

  }
  onSubmit() {
    this.addForm.patchValue({
      file:this.fileToUpload
    })
    if(this.addForm.invalid){
      this.addForm.markAllAsTouched()
      return
    }
    if(!this.pdf){
      this.toaster.error(this.errorMsg);
      return
    }

     this.uService.isLoading = true;

    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('title', this.addForm.value.title);
    formData.append('message', this.addForm.value.message);
    formData.append('languageId', this.addForm.value.languageId);
    formData.append('tenderType', this.addForm.value.tenderType);
    formData.append('startDate', this.addForm.value.startDate);
    formData.append('endDate', this.addForm.value.endDate);
    console.log(formData, 'formdata');
    this.service.addTender(formData).subscribe((data: any) => {
       this.uService.isLoading = false;

      if (data.status) {
        this.toaster.success(data.message)
        this.router.navigate(['/tender']);
      } else {
        this.toaster.error(data.message)

      }
    },error=>{
      this.toaster.error(error.error.message)

    });
  }
  onUpdate() {
    if(this.addForm.invalid){
      this.addForm.markAllAsTouched()
      return
    }
    if(!this.pdf){
      this.toaster.error(this.errorMsg);
      return
    }

     this.uService.isLoading = true;

     const formData = new FormData();
     formData.append('file', this.fileToUpload);
    formData.append('title', this.addForm.value.title);
    formData.append('message', this.addForm.value.message);
    formData.append('languageId', this.addForm.value.languageId);
    formData.append('tenderType', this.addForm.value.tenderType);
    formData.append('startDate', this.addForm.value.startDate);
    formData.append('endDate', this.addForm.value.endDate);
    formData.append('id', this.tenderId);


     console.log(formData, 'formdata');
    this.service
      .updateTenderByid(formData, )
      .subscribe((data: any) => {
         this.uService.isLoading = false;
        if (data.status) {
          this.router.navigate(['/banner']);
        } else {
        }
      });
  }

}
