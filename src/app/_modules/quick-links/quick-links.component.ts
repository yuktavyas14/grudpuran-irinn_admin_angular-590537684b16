import { QuickLinksService } from './../../_services/Quicklinks.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FaqService } from 'src/app/_services/faq.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { GlobalSettingService } from 'src/app/_services/global-setting.service';
import { LanguageService } from 'src/app/_services/language.service';

@Component({
  selector: 'app-quick-links',
  templateUrl: './quick-links.component.html',
  styleUrls: ['./quick-links.component.scss']
})
export class QuickLinksComponent implements OnInit {
  languageId:any='1'
  ipv6List:any;
  languageList:any;
 
  totalrecored: any = 0;
  itemsPerPage: any = '10';
  config: any;
  page: number = 1;
  offset = 0;

  constructor(private service:QuickLinksService,
    private langService: LanguageService,
    
    private router:Router,private uService: UtilitydesignService) 
  {
    this.getIpList();
   }
  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
   
   }
   getIpList(){
     this.uService.isLoading= true;
     const formData = new FormData();
     let page: any = this.page - 1;
     // formData.append('languageId', this.languageId);
     formData.append('pageNo', page);
     formData.append('pageSize', this.itemsPerPage);
     formData.append('languageId', this.languageId);
      
    this.service.getQuickLinkListByLanguageId(formData).subscribe((res:any)=>{
     this.uService.isLoading= false;
   
    if (res.status) {
      this.ipv6List = res.data.content;
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

    this.getIpList();
  }
   
  onView(item:any){
    this.router.navigate(['/quick-links/edit',item.id,item.languageId])
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
    formData.append('id',item.id);
    formData.append('languageId',item.languageId);
    
    console.log(formData,'formdata')
    this.service.updateQuickLinkByStatus(formData).subscribe((data: any) => {
     this.uService.isLoading= false;
  
      if (data.status) {
        this.getIpList();
      } else {
        this.getIpList() 
      }
    });
  }
  ngOnDestroy(): void {
  }
  onDelete(id:any){}
  }
  