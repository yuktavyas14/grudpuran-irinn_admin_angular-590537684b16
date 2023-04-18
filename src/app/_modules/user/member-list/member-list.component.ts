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
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  displayedColumns: string[] = [
    'SNo',
    'name',
    // 'mobNo',
    'email',
    'status',
    'Action',
  ];
  // displayedColumns: string[] = ['SNo','ispMemberAddress', 'ispMemberContact','ispMemberLogo', 'ispMemberName',
  // 'ispMemberurl', 'ispSiteUlr', 'imgUrl', 'status','Action'];

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
    this.uService.isLoading = true;
    this.service.getMemberList().subscribe((res: any) => {
      this.uService.isLoading = false;

      if (res.status) {
        this.memberList = res.data;
        console.log(this.memberList, 'memberList');

        this.dataSource = new MatTableDataSource(res.data);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
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
    this.service.updateMemberStatusById(formData, item.id).subscribe(
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
