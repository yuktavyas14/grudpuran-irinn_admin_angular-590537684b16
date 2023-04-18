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
import { NatworkmasterService } from 'src/app/_services/natworkmaster.service';
import { ValidationService } from 'src/app/_services/validation.service';
@Component({
  selector: 'app-add-natwork-master',
  templateUrl: './add-natwork-master.component.html',
  styleUrls: ['./add-natwork-master.component.scss']
})
export class AddNatworkMasterComponent implements OnInit {
  addForm: FormGroup | any;
  fileToUpload: any = null;
  serviceId: any;
  error = 'photo should be 570 x 1920 size';
  isImageSize = false;
  constructor(
    private fb: FormBuilder,
    private service: NatworkmasterService,
    private uService: UtilitydesignService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private validationService:ValidationService

  ) {
    this._ac.paramMap.subscribe((param) => {
      this.serviceId = param.get('id');
      console.log(this.serviceId,'hjghjgjhgjh');
      
      //alert(this.matchId)
    });

    if (this.serviceId) {
      this.addForm = this.fb.group({
        file: new FormControl(''),
        asNumber: new FormControl(''),
        companyCity: new FormControl(''),
        companyLogo: new FormControl(''),
        companyWebsiteUrl: new FormControl(''),
        faxNumber: new FormControl(''),
        imgUrl: new FormControl(''),
        ipv4: new FormControl(''),
        ipv6: new FormControl(''),
        companyAddress: new FormControl('',[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(10)]),
        companyName: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        phoneNumber: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(7)]),
        
        
      });
      this.uService.isLoading = true;

      this.service.getnetworkComById(this.serviceId).subscribe((res: any) => {
        this.uService.isLoading = false;
        this.addForm.patchValue({

          companyName: res.data.companyName,
          asNumber: res.data.asNumber,
          companyAddress: res.data.companyAddress,
          companyCity: res.data.companyCity,
          companyLogo: res.data.companyLogo,
          companyWebsiteUrl: res.data.companyWebsiteUrl,
          faxNumber: res.data.faxNumber,
          phoneNumber: res.data.phoneNumber,
          imgUrl: res.data.imgUrl,
          ipv4: res.data.ipv4,
          ipv6: res.data.ipv4,
         
        });
      });
    } else {
      this.addForm = this.fb.group({
        file: new FormControl('',Validators.required),

        asNumber: new FormControl(''),
        companyCity: new FormControl(''),
        companyLogo: new FormControl(''),
        companyWebsiteUrl: new FormControl(''),
        faxNumber: new FormControl(''),
        imgUrl: new FormControl(''),
        ipv4: new FormControl(''),
        ipv6: new FormControl(''),
        companyAddress: new FormControl('',[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(10)]),
        companyName: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        phoneNumber: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(7)]),
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

    formData.append('asNumber', this.addForm.value.asNumber);
    formData.append('companyAddress', this.addForm.value.companyAddress);
    formData.append('companyCity', this.addForm.value.companyCity);
    formData.append('companyLogo', this.addForm.value.companyLogo);
    formData.append('companyWebsiteUrl', this.addForm.value.companyWebsiteUrl);
    formData.append('faxNumber', this.addForm.value.faxNumber);
    formData.append('imgUrl', this.addForm.value.imgUrl);
    formData.append('ipv4', this.addForm.value.ipv4);
    formData.append('ipv6', this.addForm.value.ipv6);
    
    this.service.addNetworkMasterCompany(formData).subscribe((data: any) => {
      this.uService.isLoading = false;
      if (data.status) {
        this.router.navigate(['/natwork-master']);
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

    formData.append('asNumber', this.addForm.value.asNumber);
    formData.append('companyAddress', this.addForm.value.companyAddress);
    formData.append('companyCity', this.addForm.value.companyCity);
    formData.append('companyLogo', this.addForm.value.companyLogo);
    formData.append('companyWebsiteUrl', this.addForm.value.companyWebsiteUrl);
    formData.append('faxNumber', this.addForm.value.faxNumber);
    formData.append('imgUrl', this.addForm.value.imgUrl);
    formData.append('ipv4', this.addForm.value.ipv4);
    formData.append('ipv6', this.addForm.value.ipv6);
    this.service
      .updateNetworkMasterById(formData, this.serviceId)
      .subscribe((data: any) => {
        this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/natwork-master']);
        } else {
        }
      });
  }
  onReset(){
    this.addForm.reset();
  }
  onCancle(){
    this.router.navigate(['/natwork-master']);

  }
}
