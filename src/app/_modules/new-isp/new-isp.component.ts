import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IspService } from 'src/app/_services/isp.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { NewispService } from 'src/app/_services/newisp.service';

export interface UserData {}
declare const $:any;
@Component({
  selector: 'app-new-isp',
  templateUrl: './new-isp.component.html',
  styleUrls: ['./new-isp.component.scss']
})
export class NewIspComponent implements OnInit {
  displayedColumns: string[] = ['SNo','name', 'phoneNumber', 'email','address','ispLocation',
  'status','Action'];
// displayedColumns: string[] = ['SNo','ispMemberAddress', 'ispMemberContact','ispMemberLogo', 'ispMemberName',
// 'ispMemberurl', 'ispSiteUlr', 'imgUrl', 'status','Action'];

dataSource!: MatTableDataSource<UserData>;
posts: any;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
memberList:any;
constructor(private service:NewispService, private router:Router,private uService: UtilitydesignService) 
{
  this.getAllIspMember();
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
 getAllIspMember(){
   this.uService.isLoading= true;
  this.service.getnewIspList().subscribe((res:any)=>{
   this.uService.isLoading= false;
  if(res.success){
    this.memberList= res.data;
    this.dataSource = new MatTableDataSource(res.data);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(res);
  }
    
  })

}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
onView(id:any){
  this.router.navigate(['/new-isp/edit',id])
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
  formData.append('status',status);
  this.service.updatenewIspByStatus(formData, item.newIspId).subscribe((data: any) => {
   this.uService.isLoading= false;
    if (data.status) {
      this.getAllIspMember();
    } else {
      this.getAllIspMember() 
    }
  });
}
ngOnDestroy(): void {
}
}

