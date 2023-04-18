import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContactService } from 'src/app/_services/contact.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';

export interface UserData {}
declare const $:any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  displayedColumns: string[] = ['SNo','name', 'email', 'contatctNumber','designation',
  'status','Action'];
// displayedColumns: string[] = ['SNo','ispMemberAddress', 'ispMemberContact','ispMemberLogo', 'ispMemberName',
// 'ispMemberurl', 'ispSiteUlr', 'imgUrl', 'status','Action'];

dataSource!: MatTableDataSource<UserData>;
posts: any;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
memberList:any;
constructor(private service:ContactService, private router:Router, private uService: UtilitydesignService)
{
  this.getAllContactData();
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
 getAllContactData(){
  this.uService.isLoading= true;
  this.service.getAllContactUs().subscribe((res:any)=>{
 this.uService.isLoading= false;
  if(res){
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
  this.router.navigate(['/management/edit-isp',id])
}
onDelete(id:any){
  this.service.removeContactUsById(id).subscribe((data: any) => {
   this.uService.isLoading= false;

      if (data.status) {
        this.getAllContactData();
      } else {
        this.getAllContactData()
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

  console.log(formData,'formdata')
//   this.service.updateFooterStatus(formData, item.headerId).subscribe((data: any) => {
//  this.uService.isLoading= false;

//     if (data.status) {
//       this.getAllContactData();
//     } else {
//       this.getAllContactData()
//     }
//   });
}
ngOnDestroy(): void {
}
}

