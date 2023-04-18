import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FaqService } from 'src/app/_services/faq.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { GlobalSettingService } from 'src/app/_services/global-setting.service';
import { LanguageService } from 'src/app/_services/language.service';

declare const $:any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  languageId:any='1'
  languageList:any;
  bannerServiceList:any;
  totalrecored: any = 0;
  itemsPerPage: any=10;
  config: any;
  page:number = 1;
  limit = '10';
  offset = 0;
  constructor(private service:GlobalSettingService,private langService:LanguageService, private router:Router,private uService: UtilitydesignService) 
  {
    this.getBannerServiceList();
   }
  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
   }
   getBannerServiceList(){
     this.uService.isLoading= true;
     let page:any= this.page -1
     const formData = new FormData();
   
    formData.append('languageId', this.languageId);
    formData.append('whatWeHaveId', '');
    formData.append('pageNo', page);
    formData.append('pageSize', this.itemsPerPage);
      
    this.service.getWhatWeHaveList(formData).subscribe((res:any)=>{
     this.uService.isLoading= false;
     if (res.status) {
      this.bannerServiceList = res.data.content;
      
      if (res?.data) {
        this.totalrecored = res?.data?.totalElements || 0;
      }
      
      this.config = {
        currentPage: this.page,
        itemsPerPage: this.itemsPerPage,
        totalItems: this.totalrecored,
      };
    }
  
      
    })
  
  }
   
  onView(service:any){
    this.router.navigate(['/global-setting/wwh/edit',service.whatWeHaveId,service.languageId || '1'])
  }
  onUpdateStatus(item:any){
     this.uService.isLoading= true;
  
    let status:any;
    if(item.status){
      status= false
    }else{
      status= true
    }
    const formData = new FormData();
    // formData.append('imageName','');
    // formData.append('file','');
    formData.append('status',status);
    formData.append('whatWeHaveId',item.whatWeHaveId);
    formData.append('languageId',item.languageId);
    
    console.log(formData,'formdata')
    this.service.updateWhatWeHaveByStatus(formData).subscribe((data: any) => {
     this.uService.isLoading= false;
  
      if (data.status) {
        this.getBannerServiceList();
      } else {
        this.getBannerServiceList() 
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

    this.getBannerServiceList();
  }
  ngOnDestroy(): void {
  }
  onDelete(id:any){}
  }
  