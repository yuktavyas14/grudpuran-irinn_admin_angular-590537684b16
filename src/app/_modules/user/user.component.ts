import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IspService } from 'src/app/_services/isp.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';

export interface UserData {}
declare const $: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  totalrecored: any = 0;
  itemsPerPage: any=10;
  config: any;
  page:number = 1;
  limit = '10';
  offset = 0;
  dataSource!: MatTableDataSource<UserData>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  memberList: any;
  constructor(
    private service: UserService,
    private toaster: ToastrService,
    private router: Router,
    private uService: UtilitydesignService
  ) {
    this.getUserList();
  }
  ngOnInit(): void {
    // Datatable
    //   if($('#dataTable').length > 0) {
    //     $('#dataTable').DataTable({
    //       // "bFilter": false,
    //       paging: false,
    //   searching: false
    //     });
    //   }
  }
  getUserList() {
    const formData = new FormData();
     let page:any= this.page -1
     // formData.append('languageId', this.languageId);
     formData.append('pageNo', page);
     formData.append('pageSize', this.itemsPerPage);
       
    this.uService.isLoading = true;
    this.service.getUserList(formData).subscribe((res: any) => {
      this.uService.isLoading = false;
      if (res.status) {
        this.memberList = res.data.content;
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onView(id: any) {
    this.router.navigate(['/user/edit', id]);
  }
  onUpdateStatus(item: any) {
    this.uService.isLoading = true;

    let status:any;
    if (item.status) {
      status = 0;
    } else {
      status = 1;
    }
    const formData = new FormData();
    formData.append('status', status);
    this.service.updateUserStatusById({}, item.id).subscribe(
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
  onEmailVerify(user:any){
    this.uService.isLoading = true;

    let emailVerify:any;
    if (user.emailVerify) {
      emailVerify =false;
    } else {
      emailVerify = true;
    }
    const formData = new FormData();
    formData.append('emailVerify', emailVerify);
    formData.append('id',  user.id);
    this.service.accountverify(formData).subscribe(
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
