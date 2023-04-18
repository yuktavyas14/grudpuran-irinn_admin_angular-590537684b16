import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ipv6feesService } from 'src/app/_services/ipv6fees.service';
import { LanguageService } from 'src/app/_services/language.service';
import { MenuService } from 'src/app/_services/menu.service';
import { PagesService } from 'src/app/_services/pages.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { ValidationService } from 'src/app/_services/validation.service';

@Component({
  selector: 'app-add-calculate',
  templateUrl: './add-calculate.component.html',
  styleUrls: ['./add-calculate.component.scss']
})
export class AddCalculateComponent implements OnInit {
  addForm: FormGroup | any;
  fileToUpload: any = null;
  feesId: any;
  masterMenuId: any;
  pageList:any;
  headerType:any;
  isImageSize= false
  languageId:any='1'
  languageList:any;
  langId: any;
  showImageNameFile = true;
  updateDataById : any;
  errorMsg = 'File must be pdf'
  pdf = false;
  constructor(
    private fb: FormBuilder,
    private service: Ipv6feesService,
    private pageService:PagesService,
    private uService: UtilitydesignService,
    private _ac: ActivatedRoute,
    private router: Router,
    private validationService:ValidationService,
    private _toastr:ToastrService,
    private langService: LanguageService,


  ) {
    this._ac.paramMap.subscribe((param) => {
      this.feesId = param.get('id');

    this.getAllPage();

      //alert(this.matchId)
    });
    if (this.feesId) {

      this.addForm = this.fb.group({
        ipBlock4: new FormControl(''),
        ipBlock6: new FormControl(''),
        ipv4Fee: new FormControl(''),
        ipv6Fee: new FormControl(''),
        ipv4addresses: new FormControl(''),
        ipv6addresses: new FormControl(''),

   
      });
       this.uService.isLoading = true;
       this.getDataById();

    } else {
      this.addForm = this.fb.group({
        ipBlock4: new FormControl(''),
        ipBlock6: new FormControl(''),
        ipv4Fee: new FormControl(''),
        ipv6Fee: new FormControl(''),
        ipv4addresses: new FormControl(''),
        ipv6addresses: new FormControl(''),

   
      });
    }
  }

  ngOnInit(): void {
    
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
  }
  onCancel(){
    this.router.navigate(['/feescalculate/fees']);
  }


 
  onSubmit() {
   // console.log(this.addForm.value);
    // if( this.addForm.value.pgid =='' && this.addForm.value.headerRedirectUrl == ''){
    //   this._toastr.error('page or Url one field is reuired')
    //   return
    // }
    // if(!this.pdf){
    //   this._toastr.error(this.errorMsg);
    //   return
    // }
    // if( this.headerType=='2'){
    //   this.addForm.patchValue({
    //     pgid:0
    //   })

    // }
    // if (this.addForm.invalid) {
    //   this.addForm.markAllAsTouched();
    //   return;
    // }
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }
     this.uService.isLoading = true;
debugger;
    const formData = new FormData();
    formData.append('ipBlock4',this.addForm.value.ipBlock4?'/'+this.addForm.value.ipBlock4:'');
    // formData.append('url', '');
    formData.append('ipBlock6', this.addForm.value.ipBlock6?'/'+this.addForm.value.ipBlock6:'');
    formData.append('ipv4Fee', this.addForm.value.ipv4Fee);
     formData.append('ipv6Fee',this.addForm.value.ipv6Fee);
    formData.append('ipv4addresses', this.addForm.value.ipv4addresses);
    formData.append('ipv6addresses', this.addForm.value.ipv6addresses);

   // console.log(formData, 'formdata');
    this.service.addFeeCalculator(formData).subscribe((data: any) => {
       this.uService.isLoading = false;

      if (data.status) {
      this._toastr.success(data.message)
        this.router.navigate(['/feescalculate/fees']);
      } else {
        this._toastr.error(data.message)
      }
    },
    error=>{
      this.uService.isLoading = false;
      this._toastr.error(error.error.message)
    }
    );
  }



  onUpdate() {
   debugger;
    //console.log(this.addForm.value);

    // if (this.addForm.invalid) {
    //   this.addForm.markAllAsTouched();
    //   return;
    // }
     this.uService.isLoading = true;

    const formData = new FormData();

    formData.append('ipBlock4', this.addForm.value.ipBlock4.replace("/","")?'/'+ this.addForm.value.ipBlock4.replace("/",""):'');
    formData.append('feeId', this.feesId);
    // formData.append('url', '');
    formData.append('ipBlock6', this.addForm.value.ipBlock6.replace("/","")?'/'+this.addForm.value.ipBlock6.replace("/",""):'');
    formData.append('ipv4Fee', this.addForm.value.ipv4Fee?this.addForm.value.ipv4Fee:'');
     formData.append('ipv6Fee',this.addForm.value.ipv6Fee?this.addForm.value.ipv6Fee:'');
    formData.append('ipv4addresses', this.addForm.value.ipv4addresses?this.addForm.value.ipv4addresses:'');
    formData.append('ipv6addresses', this.addForm.value.ipv6addresses?this.addForm.value.ipv6addresses:'');


    this.service
      .updateFeeCalculator(formData)
      .subscribe((data: any) => {
         this.uService.isLoading = false;

        if (data.status) {
          this.router.navigate(['/feescalculate/fees']);
        } else {
        }
      },
      error=>{
        this.uService.isLoading = false;
      }
      );
  }

  onReset(){
    this.headerType=null;
    this.addForm.reset();
    this.addForm.patchValue({
      headerType:'',
      pgid:''
    })
  }
  onSelectPageType(type:any){
    this.addForm.patchValue({
      headerRedirectUrl:'',
      pgid: '',
    });
    this.headerType= type.value;
  }

  getAllPage(){
      this.uService.isLoading= true;
    this.pageService.getAllPage().subscribe((res:any)=>{
      this.uService.isLoading= false;
    if(res.status){
      this.pageList= res.data.filter((page:any) => page.status== true);
    //  console.log(this.pageList)

    }else{

    }

    },
    error=>{
      this.uService.isLoading= false;
    }
    )

  }
  getDataById(){
    const formData = new FormData();
    formData.append('feeId', this.feesId);
    this.service.getFeeCalculatorById(formData).subscribe((res: any) => {
      this.updateDataById = res;
     // console.log(this.updateDataById)
      this.uService.isLoading = false;
     this.addForm.patchValue({
      ipBlock4: res.data.ipBlock4,
       // headerType: res.data.headerType,
       ipBlock6: res.data.ipBlock6,
       ipv4Fee: res.data.ipv4Fee,
      
       ipv6Fee: res.data.ipv6Fee,
       ipv6addresses: res.data.ipv6addresses,
       ipv4addresses: res.data.ipv4addresses,
       
     });
   });

  }
}

