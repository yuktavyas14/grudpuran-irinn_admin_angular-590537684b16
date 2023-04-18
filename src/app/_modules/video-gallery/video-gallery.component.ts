import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IspService } from 'src/app/_services/isp.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { VideoGalleryService } from 'src/app/_services/video-gallery.service';
import { LanguageService } from 'src/app/_services/language.service';

export interface UserData {}
declare const $: any;
@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements OnInit {

 
  
  posts: any;
  itemList: any;
  totalrecored: any = 0;
  itemsPerPage: any = '10';
  config: any;
  page: number = 1;
  limit = '10';
  offset = 0;
  languageId:any='1'
  languageList:any;
  constructor(
    private service: VideoGalleryService,
    private toaster: ToastrService,
    private router: Router,
    private uService: UtilitydesignService,
    private langService: LanguageService
  ) {
    this.getUserList();
  }
  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
  }
  getUserList() {
    const formData = new FormData();

    let page:any= this.page -1
    formData.append('languageId', this.languageId);
    formData.append('pageNo', page);
    formData.append('pageSize', this.itemsPerPage);
    this.uService.isLoading = true;
    this.service.getVideoList(formData).subscribe((res: any) => {
      this.uService.isLoading = false;
      
      if (res.status) {
        this.itemList = res.data.content;
        if (res?.data) {
          this.totalrecored = res?.data?.totalElements || 0;
        }
        
        this.config = {
          currentPage: this.page,
          itemsPerPage: this.itemsPerPage,
          totalItems: this.totalrecored,
        };
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
  
    this.getUserList();
  }
  onDelete(id:any){
   
  }
 
  onView(id: any) {
    this.router.navigate(['/video-gallery/edit', id]);
  }
  viewVideo(id: any) {
    this.router.navigate(['/video-gallery/view', id]);
  }
  onUpdateStatus(item: any) {
    this.uService.isLoading = true;

    let status:any;
    if(item.status){
      status= false
    }else{
      status= true
    }
    const formData = new FormData();
    formData.append('status', status);
    this.service.updateVideoByStatus(formData, item.id).subscribe(
      (data: any) => {
        this.uService.isLoading = false;
        if (data.status) {
          this.toaster.success(data.message);
          this.getUserList();
        } else {
          this.toaster.error(data.message);
          this.getUserList();
        }
      },
      (error) => {
        this.toaster.error(error.error.message);
      }
    );
  }
  ngOnDestroy(): void {}
}
