import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BannerService } from 'src/app/_services/banner.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { EncrdecrService } from 'src/app/_services/encrdecr.service';
import { GalleryService } from 'src/app/_services/gallery.service';
export interface UserData {}
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  totalrecored: any = 0;
  itemsPerPage: any = '10';
  config: any;
  page: number = 1;
  limit = '10';
  offset = 0;
  galleryList:any;
   
  constructor(private service:GalleryService, private router:Router,
     private uService:UtilitydesignService,private EncrDecr: EncrdecrService) {
    this.getGalleryList();
   }
  ngOnInit(): void {
    localStorage.removeItem('editItemId');
   
   }
  getGalleryList(){
     this.uService.isLoading= true;
     const formData = new FormData();
     let page:any= this.page -1
      // formData.append('languageId', this.languageId);
      formData.append('pageNo', page);
      formData.append('pageSize', this.itemsPerPage);
    this.service.photoGalleryList(formData).subscribe((res:any)=>{
     this.uService.isLoading= false;
   if (res.status) {
      this.galleryList = res.data.content;
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

    this.getGalleryList();
  }
  
  onView(id:any){
   
    let ids= this.EncrDecr.set('123456$#@$^@1BAN',id)
    localStorage.setItem('editItemId',ids)
    this.router.navigate(['/gallery/edit',id])
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
    
    console.log(formData,'formdata')
    this.service.updateGallaryByStatus(formData, item.id).subscribe((data: any) => {
     this.uService.isLoading= false;

      if (data.status) {
        this.getGalleryList();
      } else {
        this.getGalleryList() 
      }
    });
  }
  ngOnDestroy(): void {
  }
}
