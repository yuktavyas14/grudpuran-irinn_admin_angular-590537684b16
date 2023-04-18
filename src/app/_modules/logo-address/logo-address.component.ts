import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BannerService } from 'src/app/_services/banner.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { EncrdecrService } from 'src/app/_services/encrdecr.service';
import { LogoAddressService } from 'src/app/_services/logo-address.service';
import { LanguageService } from 'src/app/_services/language.service';
export interface UserData {}

@Component({
  selector: 'app-logo-address',
  templateUrl: './logo-address.component.html',
  styleUrls: ['./logo-address.component.scss']
})
export class LogoAddressComponent implements OnInit {
  totalrecored: any = 0;
  itemsPerPage: any = '10';
  config: any;
  page: number = 1;
  limit = '10';
  offset = 0;
  logoList:any;
  languageId:any='1'
  languageList:any;
  constructor(private service:LogoAddressService, private router:Router,
    private langService:LanguageService,
     private uService:UtilitydesignService,private EncrDecr: EncrdecrService) {
    this.getlogoList();
   }
  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
   
   }
  getlogoList(){
     this.uService.isLoading= true;
     const formData = new FormData();
     let page:any= this.page -1
      // formData.append('languageId', this.languageId);
      formData.append('pageNo', page);
      formData.append('pageSize', this.itemsPerPage,);
      formData.append('languageId', this.languageId,);
    this.service.logoList(formData).subscribe((res:any)=>{
     this.uService.isLoading= false;
     if (res.status) {
      this.logoList = res.data.content;
      if (res?.data) {
        this.totalrecored = res?.data?.totalElements || 0;
      }

      this.config = {
        currentPage: this.page,
        itemsPerPage: this.itemsPerPage,
        totalItems: this.totalrecored,
      };
    } else {
    }
      
    })

  }
 
  onView(item:any){
   
    // let ids= this.EncrDecr.set('123456$#@$^@1BAN',id)
    // localStorage.setItem('editItemId',ids)
    this.router.navigate(['/logo-address/edit',item.id,item.languageId || '1'])
  }
  onUpdateStatus(logo:any){
     this.uService.isLoading= true;

    let status:any;
    if(logo.status){
      status= false
    }else{
      status= true
    }
    const formData = new FormData();
    // formData.append('imageName','');
    // formData.append('file','');
    formData.append('status',status);
    
    console.log(formData,'formdata')
    this.service.updateLogoByStatus(formData, logo.id).subscribe((data: any) => {
     this.uService.isLoading= false;

      if (data.status) {
        this.getlogoList();
      } else {
        this.getlogoList() 
      }
    });
  }
  pageChange(newPage: number) {
    if (this.page < newPage) {
      this.offset = this.offset + Number(this.itemsPerPage);
    } else {
      this.offset = this.offset - Number(this.itemsPerPage);
      if (this.offset < 0) {
        this.offset = 0;
      }
    }
    this.page = newPage;

    this.getlogoList();
  }
  onDelete(id:any){

  }
  ngOnDestroy(): void {
  }
}

