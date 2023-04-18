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
import { IspService } from 'src/app/_services/isp.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { LatestUpdateService } from 'src/app/_services/latest-update.service';
import { ValidationService } from 'src/app/_services/validation.service';
@Component({
  selector: 'app-add-latest-update',
  templateUrl: './add-latest-update.component.html',
  styleUrls: ['./add-latest-update.component.scss'],
})
export class AddLatestUpdateComponent implements OnInit {
  addForm: FormGroup | any;
  fileToUpload: any = null;
  serviceId: any;
  error = 'photo should be 570 x 1920 size';
  isImageSize = false;
  constructor(
    private fb: FormBuilder,
    private service: LatestUpdateService,
    private uService: UtilitydesignService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private validationService:ValidationService

  ) {
    this._ac.paramMap.subscribe((param) => {
      this.serviceId = param.get('id');
      //alert(this.matchId)
    });

    if (this.serviceId) {
      this.addForm = this.fb.group({
        bidEndDate: new FormControl(''),
        bidEndTime: new FormControl(''),
        bidOpeningDate: new FormControl(''),
        bidOpeningTime: new FormControl(''),
        bidStartDate: new FormControl(''),
        bidStartTime: new FormControl(''),
        city: new FormControl(''),
        pincode: new FormControl(''),
        postDate: new FormControl(''),

        category: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(4)]),
        categoryType: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        companyAddress: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(6)]),
        companyName: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        contatctNumber: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(7)]),
        file: new FormControl(''),
        mainSubject: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        managerEmail: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        managerName: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        managerNumber: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(7)]),
      });
      this.uService.isLoading = true;

      this.service.getLatestUpdateById(this.serviceId).subscribe((res: any) => {
        this.uService.isLoading = false;
        this.addForm.patchValue({
          bidEndDate: res.data.bidEndDate,
          bidEndTime: res.data.bidEndTime,
          bidOpeningDate: res.data.bidOpeningDate,
          bidOpeningTime: res.data.bidOpeningTime,
          bidStartDate: res.data.bidStartDate,
          bidStartTime: res.data.bidStartTime,
          city: res.data.city,
          pincode: res.data.pincode,
          postDate: res.data.postDate,
          category: res.data.category,
          categoryType: res.data.categoryType,
          companyAddress: res.data.companyAddress,
          companyName: res.data.companyName,
          contatctNumber: res.data.contatctNumber,
          mainSubject: res.data.mainSubject,
          managerEmail: res.data.managerEmail,
          managerName: res.data.managerName,
          managerNumber: res.data.managerNumber,
        });
      });
    } else {
      this.addForm = this.fb.group({
        bidEndDate: new FormControl(''),
        bidEndTime: new FormControl(''),
        bidOpeningDate: new FormControl(''),
        bidOpeningTime: new FormControl(''),
        bidStartDate: new FormControl(''),
        bidStartTime: new FormControl(''),
        city: new FormControl(''),
        pincode: new FormControl(''),
        postDate: new FormControl(''),

        category: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        categoryType: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        companyAddress: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(6)]),
        companyName: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        contatctNumber: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(7)]),
        file: new FormControl('', Validators.required),
        mainSubject: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        managerEmail: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        managerName: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        managerNumber: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(7)]),
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
    img.src = window.URL.createObjectURL(file);
    reader.readAsDataURL(file);
    reader.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      window.URL.revokeObjectURL(img.src);
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
    };
    if (file) {
      this.fileToUpload = file;
    }
  }
  onSubmit() {
    this.addForm.patchValue({
      file: this.fileToUpload,
    });
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
    formData.append('file', this.fileToUpload);

    formData.append('bidEndDate', this.addForm.value.bidEndDate);
    formData.append('bidEndTime', this.addForm.value.bidEndTime);
    formData.append('bidOpeningDate', this.addForm.value.bidOpeningDate);
    formData.append('bidOpeningTime', this.addForm.value.bidOpeningTime);
    formData.append('bidStartDate', this.addForm.value.bidStartDate);
    formData.append('bidStartTime', this.addForm.value.bidStartTime);
    formData.append('city', this.addForm.value.city);
    formData.append('pincode', this.addForm.value.pincode);
    formData.append('postDate', this.addForm.value.postDate);
    formData.append('category', this.addForm.value.category);
    formData.append('categoryType', this.addForm.value.categoryType);
    formData.append('companyAddress', this.addForm.value.companyAddress);
    formData.append('companyName', this.addForm.value.companyName);
    formData.append('contatctNumber', this.addForm.value.contatctNumber);
    formData.append('mainSubject', this.addForm.value.mainSubject);
    formData.append('managerEmail', this.addForm.value.managerEmail);
    formData.append('managerName', this.addForm.value.managerName);
    formData.append('managerNumber', this.addForm.value.managerNumber);
    this.service.addLatestUpdate(formData).subscribe((data: any) => {
      this.uService.isLoading = false;
      if (data.status) {
        this.router.navigate(['/latestupdate']);
      } else {
      }
    });
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
    formData.append('file', this.fileToUpload);
    formData.append('bidEndDate', this.addForm.value.bidEndDate);
    formData.append('bidEndTime', this.addForm.value.bidEndTime);
    formData.append('bidOpeningDate', this.addForm.value.bidOpeningDate);
    formData.append('bidOpeningTime', this.addForm.value.bidOpeningTime);
    formData.append('bidStartDate', this.addForm.value.bidStartDate);
    formData.append('bidStartTime', this.addForm.value.bidStartTime);
    formData.append('city', this.addForm.value.city);
    formData.append('pincode', this.addForm.value.pincode);
    formData.append('postDate', this.addForm.value.postDate);
    formData.append('category', this.addForm.value.category);
    formData.append('categoryType', this.addForm.value.categoryType);
    formData.append('companyAddress', this.addForm.value.companyAddress);
    formData.append('companyName', this.addForm.value.companyName);
    formData.append('contatctNumber', this.addForm.value.contatctNumber);
    formData.append('mainSubject', this.addForm.value.mainSubject);
    formData.append('managerEmail', this.addForm.value.managerEmail);
    formData.append('managerName', this.addForm.value.managerName);
    formData.append('managerNumber', this.addForm.value.managerNumber);
    this.service
      .updateLatestUpdateById(formData, this.serviceId)
      .subscribe((data: any) => {
        this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/latestupdate']);
        } else {
        }
      });
  }
  onReset(){
    this.addForm.reset();
  }
  onCancle(){
    this.router.navigate(['/latestupdate']);

  }
}
