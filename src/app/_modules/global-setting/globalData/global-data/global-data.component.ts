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
  selector: 'app-global-data',
  templateUrl: './global-data.component.html',
  styleUrls: ['./global-data.component.scss']
})
export class GlobalDataComponent implements OnInit {
  settingType:any=''
  languageId:any='1'
  bannerServiceList:any;
  languageList:any;
  settingTypeList:any;
  totalrecored: any = 0;
  itemsPerPage: any=10;
  config: any;
  page:number = 1;
  limit = '10';
  offset = 0;
  constructor(private service:GlobalSettingService, private langService: LanguageService, private router:Router,private uService: UtilitydesignService) 
  {
    this.getDataList();
   }
  ngOnInit(): void {
    this.service.getSettingTypeList().subscribe((res: any) => {
      this.settingTypeList = res.data;
    });
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
      this.languageId=1
    });
   }
   getDataList(){
     this.uService.isLoading= true;
     let page:any= this.page -1
     const formData = new FormData();
   
    formData.append('settingType', this.settingType);
    formData.append('languageId', this.languageId);
    formData.append('pageNo', page);
    formData.append('pageSize', this.itemsPerPage);
      
    this.service.getGlobalDataBySettingTypeAndlanguageId(formData).subscribe((res:any)=>{
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
   
  onView(item:any){
    this.router.navigate(['/global-setting/data/edit',item.setting_Id, item.languageId])
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
    formData.append('setting_Id',item.setting_Id);
    formData.append('languageId',item.languageId);
    formData.append('settingType',item.settingType);
    
    console.log(formData,'formdata')
    this.service.updateGlobalDataByStatus(formData).subscribe((data: any) => {
     this.uService.isLoading= false;
  
      if (data.status) {
        this.getDataList();
      } else {
        this.getDataList() 
      }
    });
  }
  ngOnDestroy(): void {
  }
  onDelete(id:any){}

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

    this.getDataList();
  }
  }
  
  