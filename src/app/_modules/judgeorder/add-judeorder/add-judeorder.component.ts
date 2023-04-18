import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from 'src/app/_services/banner.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { EncrdecrService } from 'src/app/_services/encrdecr.service';
import { DocumentsService } from 'src/app/_services/documents.service';
import { JudgementorderService } from 'src/app/_services/judgementorder.service';
import { ValidationService } from 'src/app/_services/validation.service';
@Component({
  selector: 'app-add-judeorder',
  templateUrl: './add-judeorder.component.html',
  styleUrls: ['./add-judeorder.component.scss'],
  providers:[DatePipe]
})
export class AddJudeorderComponent implements OnInit {

  addForm: FormGroup | any;
  fileToUpload: any = null;
  judgementId: any;
   error = "photo should be 570 x 1920 size";
  isImageSize= false
  constructor(
    private fb: FormBuilder,
    private service: JudgementorderService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private uService:UtilitydesignService,
    private EncrDecr: EncrdecrService,
    private datePipe:DatePipe,
    private validationService:ValidationService

  ) {
    this._ac.paramMap.subscribe((param) => {
      // this.judgementId = 1;
      this.judgementId = param.get('id');
    //  this.judgementId = this.EncrDecr.get('123456$#@$^@1BAN',judgementId1);
    //   console.log( this.judgementId);
      
      //alert(this.matchId)
    });

    if (this.judgementId) {
      this.addForm = this.fb.group({
        dateOfjudgement: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        titleOfOrder: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        file: new FormControl(''),
       
      });
       this.uService.isLoading = true;

      this.service.getAllJudgeOrdersByid(this.judgementId).subscribe((res: any) => {
         this.uService.isLoading = false;
        this.addForm.patchValue({
          dateOfjudgement: datePipe.transform(res.data.dateOfjudgement, 'dd-MM-yyyy'),
          titleOfOrder: res.data.titleOfOrder,
        });
      });
    } else {
      this.addForm = this.fb.group({
        dateOfjudgement: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        titleOfOrder: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        file: new FormControl(''),
      });
    }
  }
 
  ngOnInit(): void {
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
        this.isImageSize= true
      //  }
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
  onReset(value:number){
    if(value ==1){
this.addForm.reset();
    }else{
this.router.navigate(['/judgement-order'])
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
    if(!this.isImageSize){
      this.toaster.error(this.error)
      return
    }
     this.uService.isLoading = true;
     let doj:any = this.datePipe.transform(this.addForm.value.dateOfjudgement, 'dd/MM/yyyy');
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('titleOfOrder', this.addForm.value.titleOfOrder);
    formData.append('dateOfjudgement', doj);
    console.log(formData, 'formdata');
    this.service.addJudgementOrders(formData).subscribe((data: any) => {
       this.uService.isLoading = false;

      if (data.status) {
        this.router.navigate(['/judgement-order']);
      } else {
      }
    });
  }
  onUpdate() {
    if(this.addForm.invalid){
      this.addForm.markAllAsTouched()
      return
    }
    this.fileToUpload=  this.fileToUpload || ''
    // if(!this.isImageSize){
    //   this.toaster.error(this.error)
    //   return
    // }
     this.uService.isLoading = true;

    let doj:any = this.datePipe.transform(this.addForm.value.dateOfjudgement, 'dd/MM/yyyy');
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('titleOfOrder', this.addForm.value.titleOfOrder);
    formData.append('dateOfjudgement', doj);
    this.service
      .updateJudgementOrders(formData, this.judgementId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/judgement-order']);
        } else {
        }
      });
  }
 
}
