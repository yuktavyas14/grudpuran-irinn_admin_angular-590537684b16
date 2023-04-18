import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FaqService } from 'src/app/_services/faq.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { GlobalSettingService } from 'src/app/_services/global-setting.service';
import { LanguageService } from 'src/app/_services/language.service';
import { ToastrService } from 'ngx-toastr';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss']
})
export class GalleryListComponent implements OnInit {
  languageId:any='1'
  languageList:any;
  galleryList:any;
  clipboardValue:any='';
  totalrecored: any = 0;
  itemsPerPage: any='10';
  config: any;
  page:number = 1;
  limit = '10';
  offset = 0;
  constructor(private service:GlobalSettingService, private clipboard: Clipboard,
    private langService: LanguageService, private toaster:ToastrService,

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
   let page:any= this.page -1
    // formData.append('languageId', this.languageId);
    formData.append('pageNo', page);
    formData.append('pageSize', this.itemsPerPage);

    this.service.getImageList(formData).subscribe((res:any)=>{
     this.uService.isLoading= false;
    if(res.status){
      this.galleryList= res.data.content;
      console.log(res);
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
  copyText(url:any, name:any): void {
    this.clipboardValue= url + name
    navigator.clipboard.writeText(this.clipboardValue).catch(() => {
      console.error("Unable to copy text");
      return
    },
    );
    this.toaster.success('Image url copy successfully')
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
  copyText1(url:any, name:any): void {
    this.clipboardValue= url + name
    this.clipboard.copy(this.clipboardValue);
    this.toaster.success('Image url copy successfully')
}
  ngOnDestroy(): void {
  }

  secureContent(){

  }
  onDelete(id:any){}
  }
