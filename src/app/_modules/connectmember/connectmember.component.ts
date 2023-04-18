import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConnectmemberService } from 'src/app/_services/connectmember.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';

export interface UserData {}
declare const $:any;

@Component({
  selector: 'app-connectmember',
  templateUrl: './connectmember.component.html',
  styleUrls: ['./connectmember.component.scss']
})
export class ConnectmemberComponent implements OnInit {

  displayedColumns: string[] = ['SNo','memberName', 'phoneNumber', 'email','companyName',
  'status','Action'];
// displayedColumns: string[] = ['SNo','ispMemberAddress', 'ispMemberContact','ispMemberLogo', 'ispMemberName',
// 'ispMemberurl', 'ispSiteUlr', 'imgUrl', 'status','Action'];

dataSource!: MatTableDataSource<UserData>;
posts: any;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
memberList:any;
constructor(private service:ConnectmemberService, private router:Router,
  private uService:UtilitydesignService
  ) 
{
  this.getAllLinkData();
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
 getAllLinkData(){
    this.uService.isLoading= true;
  this.service.viewAllConMembersDetails().subscribe((res:any)=>{
    this.uService.isLoading= false;
  if(res){
    this.memberList= res.data;
    this.dataSource = new MatTableDataSource(res);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
  this.router.navigate(['/connectmember/edit',id])
}
onDelete(id:any){
  this.service.removeContactUsById(id).subscribe((data: any) => {
      this.uService.isLoading= false;
  
      if (data.status) {
        this.getAllLinkData();
      } else {
        this.getAllLinkData() 
      }
    });
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
  this.service.updateConMembersDetailsByStatus(formData, item.conId).subscribe((data: any) => {
    this.uService.isLoading= false;
  this.getAllLinkData();

    if (data.status) {
      this.getAllLinkData();
    } else {
      this.getAllLinkData() 
    }
  });
}

ngOnDestroy(): void {
}
}