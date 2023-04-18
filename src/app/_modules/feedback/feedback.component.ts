import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FeedbackService } from 'src/app/_services/feedback.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { ToastrService } from 'ngx-toastr';

export interface UserData {}
declare const $: any;
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  totalrecored: any = 0;
  itemsPerPage: any=10;
  config: any;
  page:number = 1;
  limit = '10';
  offset = 0;
  feedbackList: any;
  constructor(
    private service: FeedbackService,
    private router: Router,
    private toaster:ToastrService,
    private uService: UtilitydesignService
  ) {
    this.getAllfeedbackData();
  }
  ngOnInit(): void {}
  getAllfeedbackData() {
    this.uService.isLoading = true;
    const formData = new FormData();
    let page:any= this.page -1
     // formData.append('languageId', this.languageId);
     formData.append('pageNo', page);
     formData.append('pageSize', this.itemsPerPage);
       
    this.service.getAllfeedbackNComplainList(formData).subscribe({
      
      // completeHandler
      next: (res) => {
        // this.uService.isLoading = false;
     
        if (res.status) {
          this.feedbackList = res.data.content;
          if (res?.data) {
            this.totalrecored = res?.data?.totalElements || 0;
          }
          
          this.config = {
            currentPage: this.page,
            itemsPerPage: this.itemsPerPage,
            totalItems: this.totalrecored,
          };
        }
      },
      error: (error) => {
        this.uService.isLoading = false;
        this.toaster.error(error.error.message);
      }, // errorHandler

      complete: () => {
        this.uService.isLoading = false;
        console.log('ajsgdsad asdhmafshdgfashgdhasdgh');
        
      }, // nextHandler
    });
    
  }

  onView(id: any) {
    this.router.navigate(['/management/edit-isp', id]);
  }
  onDelete(id: any) {
    this.uService.isLoading = true;
    this.service.removeContactUsById(id).subscribe((data: any) => {
      this.uService.isLoading = false;

      if (data.status) {
        this.getAllfeedbackData();
      } else {
        this.getAllfeedbackData();
      }
    });
  }
  onUpdateStatus(item: any) {
    this.uService.isLoading = true;
    let status;
    if (item.status == 'Active') {
      status = 'Inactive';
    } else {
      status = 'Active';
    }
    const formData = new FormData();
    // formData.append('imageName','');
    // formData.append('file','');
    formData.append('status', status);
    this.service.updateFeedbackStatus({}, item.id).subscribe((data: any) => {
      this.uService.isLoading = false;

      if (data.status) {
        this.getAllfeedbackData();
      } else {
        this.getAllfeedbackData();
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

    this.getAllfeedbackData();
  }
  ngOnDestroy(): void {}
}
