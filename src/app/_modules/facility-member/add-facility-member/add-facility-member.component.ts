import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  ValidatorFn
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IspService } from 'src/app/_services/isp.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { FacilitymemberService } from 'src/app/_services/facilitymember.service';
import { ValidationService } from 'src/app/_services/validation.service';
 
@Component({
  selector: 'app-add-facility-member',
  templateUrl: './add-facility-member.component.html',
  styleUrls: ['./add-facility-member.component.scss']
})
export class AddFacilityMemberComponent implements OnInit {
  addForm: FormGroup | any;
  fileToUpload: any = null;
  facilityId: any;
   error = "photo should be 570 x 1920 size";
  isImageSize= false
  constructor(
    private fb: FormBuilder,
    private service: FacilitymemberService,
    private uService: UtilitydesignService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private validationService:ValidationService

  ) {
    this._ac.paramMap.subscribe((param) => {
      this.facilityId = param.get('id');
      //alert(this.matchId)
    });

    if (this.facilityId) {
      this.addForm = this.fb.group({
        typeOfQuery: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(2)]),
        node: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(2)]),
        ipVersion: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),

      });
       this.uService.isLoading = true;

      this.service.getFacilityMemberById(this.facilityId).subscribe((res: any) => {
         this.uService.isLoading = false;
        this.addForm.patchValue({
          
          typeOfQuery: res.data.typeOfQuery,
          node: res.data.node,
          ipVersion: res.data.ipVersion,
          name: res.data.name,
          phoneNumber: res.data.phoneNumber,
           
        });
      });
    } else {
      this.addForm = this.fb.group({
        typeOfQuery: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(2)]),
        node: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(2)]),

        ipVersion: new FormControl("",[Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
      });
    }
  }
  handleInput(event:any) {
    if (event.which === 32)
        event.preventDefault();
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
    this.addForm.patchValue({
      'file': this.fileToUpload
    })
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
    formData.append('typeOfQuery', this.addForm.value.typeOfQuery);
    formData.append('node', this.addForm.value.node);
    formData.append('ipVersion', this.addForm.value.ipVersion);
    
    this.service.addFacilityToMember(formData).subscribe((data: any) => {
       this.uService.isLoading = false;
      if (data.status) {
        this.router.navigate(['/facility-member']);
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
    formData.append('typeOfQuery', this.addForm.value.typeOfQuery);
    formData.append('node', this.addForm.value.node);
    formData.append('ipVersion', this.addForm.value.ipVersion);
    this.service
      // .addFacilityToMember(formData, this.facilityId)
      .addFacilityToMember(formData)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/facility-member']);
        } else {
        }
      });
  }
  onReset(){
    this.addForm.reset();
  }
  onCancle(){
    this.router.navigate(['/facility-member']);

  }
}