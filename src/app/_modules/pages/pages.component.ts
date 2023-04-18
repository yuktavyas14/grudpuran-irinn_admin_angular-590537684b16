import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BannerService } from 'src/app/_services/banner.service';
import { PagesService } from 'src/app/_services/pages.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { LanguageService } from 'src/app/_services/language.service';
 
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  languageList: any;
  pageList:any;
  languageId:any='1'
  totalrecored: any = 0;
  itemsPerPage: any = '10';
  config: any;
  page: number = 1;
  limit = '10';
  offset = 0;
  constructor(private service:PagesService, private router:Router, private langService: LanguageService,private uService:UtilitydesignService) {
    this.getPageList();
   }
  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
   }
  getPageList(){
      this.uService.isLoading= true;
     let page:any= this.page -1

      const formData = new FormData();
      formData.append('languageId', this.languageId);
      formData.append('pageNo', page);
      formData.append('pageSize', this.itemsPerPage,);
    this.service.getPageListBylanguageId(formData).subscribe((res:any)=>{
      this.uService.isLoading= false;
   
    if (res.status) {
      this.pageList = res.data.content;
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

    this.getPageList();
  }
 
  onView(page:any){
    this.router.navigate(['/pages/edit',page.pageId,page.pageId])
  }
  onUpdateStatus(item:any){
      this.uService.isLoading= true;

    let status;
    if(item.status=='Active'){
      status= 'Inactive'
    }else{
      status= 'Active'
    }
    const formData = new FormData();
    // formData.append('imageName','');
    // formData.append('file','');
    formData.append('status',status);

    // console.log(formData,'formdata')
    this.service.updatePageStatus({}, '258').subscribe((data: any) => {
      this.uService.isLoading= false;

      if (data.status) {
        this.uService.isLoading= false;
        this.getPageList();
      } else {
        this.uService.isLoading= false;
        this.getPageList();
      }
    },
    error=>{
      this.uService.isLoading= true;
    });
  }

  onDelete(id:any){
    this.uService.isLoading= true;
    this.service.deletePage(id).subscribe((data: any) => {
      this.uService.isLoading= false;

        if (data.status) {
          this.getPageList();
        } else {
          this.getPageList()
        }
      });
  }
  onViewPage(item:any){
   localStorage.setItem('pageview', item.pageContent);
   this.router.navigate(['/pages/pageview'])
  }
  ngOnDestroy(): void {
  }
}

