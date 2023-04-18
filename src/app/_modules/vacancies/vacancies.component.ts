import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IspService } from 'src/app/_services/isp.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { VacaniciesService } from 'src/app/_services/vacanicies.service';

export interface UserData {}
declare const $: any;
@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {

  displayedColumns: string[] = [
    'SNo',
    'jobTitle',
    'jobDescription',
    'vacanciesFile',
    'startDate',
    'endDate',
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
    private service: VacaniciesService,
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
    this.service.get_all_vacancies().subscribe((res: any) => {
      this.uService.isLoading = false;
      if (res.success) {
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
    this.router.navigate(['/vacancies/edit', id]);
  }
  onUpdateStatus(item: any) {
    this.uService.isLoading = true;

    let status:any;
    if(item.status=='Active'){
      status= 'Inactive'
    }else{
      status= 'Active'
    }
    const formData = new FormData();
    formData.append('status', status);
    this.service.update_vacancies_by_status(formData, item.vacanciesId).subscribe(
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
