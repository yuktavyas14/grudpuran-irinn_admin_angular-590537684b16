import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FeedbackService } from 'src/app/_services/feedback.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { JudgementorderService } from 'src/app/_services/judgementorder.service';
import { OtherActivityService } from 'src/app/_services/other-activity.service';

export interface UserData {}
declare const $:any;
@Component({
  selector: 'app-other-activity',
  templateUrl: './other-activity.component.html',
  styleUrls: ['./other-activity.component.scss']
})
export class OtherActivityComponent implements OnInit {

  displayedColumns: string[] = ['SNo','otherActivityName', 'titleUrl', 'status','Action'];
// displayedColumns: string[] = ['SNo','ispMemberAddress', 'ispMemberContact','ispMemberLogo', 'ispMemberName',
// 'ispMemberurl', 'ispSiteUlr', 'imgUrl', 'status','Action'];

dataSource!: MatTableDataSource<UserData>;
posts: any;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
memberList:any;
constructor(private service:OtherActivityService, private router:Router,private uService: UtilitydesignService) 
{
  this.getAllJudgementData();
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
 getAllJudgementData(){
  this.uService.isLoading= true;
  this.service.get_all_activities().subscribe((res:any)=>{
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
  this.router.navigate(['/other-activity/edit',id])
}
onDelete(id:any){
  this.service.removeActivitiesById(id).subscribe((data: any) => {
    this.uService.isLoading= false;
  
      if (data.status) {
        this.getAllJudgementData();
      } else {
        this.getAllJudgementData() 
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
  this.service.updateActivitiesByStatus(formData, item.activityId).subscribe((data: any) => {
  this.uService.isLoading= false;

    if (data.status) {
      this.getAllJudgementData();
    } else {
      this.getAllJudgementData() 
    }
  });
}
ngOnDestroy(): void {
}
}