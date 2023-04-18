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
import { BannerService } from 'src/app/_services/banner.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { EncrdecrService } from 'src/app/_services/encrdecr.service';
import { DocumentsService } from 'src/app/_services/documents.service';
import { ValidationService } from 'src/app/_services/validation.service';
@Component({
  selector: 'app-add-documents',
  templateUrl: './add-documents.component.html',
  styleUrls: ['./add-documents.component.scss']
})
export class AddDocumentsComponent implements OnInit {
  addForm: FormGroup | any;
  fileToUpload: any = null;
  documentId: any;
   error = "photo should be 570 x 1920 size";
  isImageSize= false
  constructor(
    private fb: FormBuilder,
    private service: DocumentsService,
    private _ac: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService,
    private uService:UtilitydesignService,
    private EncrDecr: EncrdecrService,
    private validationService:ValidationService

  ) {
    this._ac.paramMap.subscribe((param) => {
      // this.documentId = 1;
      this.documentId = param.get('id');
    //  this.documentId = this.EncrDecr.get('123456$#@$^@1BAN',documentId1);
    //   console.log( this.documentId);
      
      //alert(this.matchId)
    });

    if (this.documentId) {
      this.addForm = this.fb.group({
        documentbDes: new FormControl(''),
        documentTitle: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
        file: new FormControl(''),
       
      });
       this.uService.isLoading = true;

      this.service.getDocumentsById(this.documentId).subscribe((res: any) => {
         this.uService.isLoading = false;
        this.addForm.patchValue({
          documentbDes: res.data.documentbDes,
          documentTitle: res.data.documentTitle,
        });
      });
    } else {
      this.addForm = this.fb.group({
        documentbDes: new FormControl(''),
        documentTitle: new FormControl('', [Validators.required,this.validationService.noWhitespaceValidator(),Validators.minLength(3)]),
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
this.router.navigate(['/documents'])
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

    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('documentbDes', this.addForm.value.documentbDes);
    formData.append('documentTitle', this.addForm.value.documentTitle);
    console.log(formData, 'formdata');
    this.service.addDocuments(formData).subscribe((data: any) => {
       this.uService.isLoading = false;

      if (data.status) {
        this.router.navigate(['/documents']);
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

    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    formData.append('documentbDes', this.addForm.value.documentbDes);
    formData.append('documentTitle', this.addForm.value.documentTitle);


    console.log(formData, 'formdata');
    this.service
      .updateDocuments(formData, this.documentId)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/banner']);
        } else {
        }
      });
  }
 
}