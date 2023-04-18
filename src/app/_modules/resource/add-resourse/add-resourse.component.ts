import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EncrdecrService } from 'src/app/_services/encrdecr.service';
import { LanguageService } from 'src/app/_services/language.service';
import { PagesService } from 'src/app/_services/pages.service';
import { ProviderService } from 'src/app/_services/provider.service';
import { ResoursepartnerService } from 'src/app/_services/resoursepartner.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { ValidationService } from 'src/app/_services/validation.service';

@Component({
  selector: 'app-add-resourse',
  templateUrl: './add-resourse.component.html',
  styleUrls: ['./add-resourse.component.scss']
})
export class AddResourseComponent implements OnInit {

  addForm: FormGroup | any;
  fileToUpload: any = null;
  settingId: any;
  pageList:any;
  languageList: any;
   error = "photo should be 570 x 1920 size";
  isImageSize= false;
  languageId='';
  showImageNameFile = true;
  updateDataById : any
  constructor(
    private fb: FormBuilder,
    private service: ResoursepartnerService,
    private langService: LanguageService,
    private _ac: ActivatedRoute,
    private pageService:PagesService,
    private router: Router,
    private toaster:ToastrService,
    private uService:UtilitydesignService,
    private EncrDecr: EncrdecrService,
    private validationService:ValidationService
  ) {

    this._ac.paramMap.subscribe((param) => {
      this.settingId = param.get('id');
   //   console.log( this.settingId);

    });

    if (this.settingId) {
      this.addForm = this.fb.group({
        partnerName: new FormControl([''], [Validators.required]),
        languageId:new FormControl(['1'], [Validators.required]),
      });
       this.uService.isLoading = true;
       this.getDataById();

    } else {
      this.addForm = this.fb.group({
        partnerName: new FormControl([''], [Validators.required]),
        languageId:new FormControl(['1'], [Validators.required]),
      });
   //   console.log(this.addForm,"ADd")
    }
  }
  get controls() {
    return this.addForm.controls;
  }

  ngOnInit(): void {
    this.pageService.getAllPage().subscribe((res:any)=>{
      this.uService.isLoading= false;
    if(res.status){
      this.pageList= res.data.filter((page:any) => page.status== true);
      //console.log(this.pageList)
    }
    })
    this.langService.getLanguageList().subscribe((res: any) => {
     this.languageList= res.data;

   });
    localStorage.removeItem('editItemId');
  }
  getDataByIddata(){
    const formData= new FormData()
    this.languageId=this.addForm.value.languageId
    formData.append('languageId',this.languageId)
    formData.append('id',this.settingId)
    this.service.getResourcePartnersById(formData).subscribe((res: any) => {
      this.updateDataById = res;
      //console.log(this.updateDataById);

      this.uService.isLoading = false;
     // console.log(this.addForm.value.pageId)
   
    // console.log(this.addForm.value.pageId)
   });}

  getDataById(){
    const formData= new FormData()
    this.languageId=this.addForm.value.languageId
    formData.append('languageId',this.languageId)
    formData.append('id',this.settingId)
    this.service.getResourcePartnersById(formData).subscribe((res: any) => {
      this.updateDataById = res;
   //   console.log(this.updateDataById);

      this.uService.isLoading = false;
     this.addForm.patchValue({
       languageId: res?.data?.languageId || this.languageId,
       partnerName: res?.data?.partnerName,
      
     });
   //  console.log(this.addForm.value.pageId)
   });
  }
 
  onReset(value:number){
    if(value ==1){
this.addForm.reset();
    }else{
this.router.navigate(['/resourcepartner'])
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
    // if(!this.isImageSize){
    //   this.toaster.error(this.error)
    //   return
    // }
     this.uService.isLoading = true;

    const formData = new FormData();
    formData.append('partnerName', this.addForm.value.partnerName);
    formData.append('languageId', this.addForm.value.languageId);
   // console.log(formData, 'formdata');
    this.service.addResourcePartners(formData).subscribe((data: any) => {
       this.uService.isLoading = false;

      if (data.status) {
        this.toaster.success(data.message)
        this.router.navigate(['/resourcepartner']);
      } else {
        this.toaster.error(data.message)

      }
    },error=>{
      this.toaster.error(error.error.message)

    });
  }
  onUpdate() {
  //  console.log(this.addForm.value);

    debugger
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
    formData.append('partnerName', this.addForm.value.partnerName);
    formData.append('languageId', this.addForm.value.languageId);
    formData.append('id', this.settingId);
   // console.log(formData, 'formdata');
    this.service
      .updateResourcePartners(formData)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/resourcepartner']);
        } else {
        }
      });
  }

}
