import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IspService } from 'src/app/_services/isp.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { LatestUpdateService } from 'src/app/_services/latest-update.service';
import { NatworkmasterService } from 'src/app/_services/natworkmaster.service';
export interface UserData {}
declare const $:any;
@Component({
  selector: 'app-natwork-master',
  templateUrl: './natwork-master.component.html',
  styleUrls: ['./natwork-master.component.scss']
})
export class NatworkMasterComponent implements OnInit {

  displayedColumns: string[] = ['SNo','companyName', 'phoneNumber','companyAddress', 'companyCity','asNumber','companyWebsiteUrl','faxNumber','ipv4','ipv6',
  'status','Action'];
 

dataSource!: MatTableDataSource<UserData>;
posts: any;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
memberList:any;
constructor(private service:NatworkmasterService, private router:Router,private uService: UtilitydesignService) 
{
  this.getAllUpdate();
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
 getAllUpdate(){
   this.uService.isLoading= true;
  this.service.getAllNetworkMasterCompany().subscribe((res:any)=>{
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
  this.router.navigate(['/natwork-master/edit',id])
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
  this.service.updateNetworkMasterByStatus(formData, item.networkMasterId).subscribe((data: any) => {
   this.uService.isLoading= false;
    if (data.status) {
      this.getAllUpdate();
    } else {
      this.getAllUpdate() 
    }
  });
}
ngOnDestroy(): void {
}
}

