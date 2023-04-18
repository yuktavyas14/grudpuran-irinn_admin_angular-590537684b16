import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe],
})
export class DashboardComponent implements OnInit {
dashboradData:any
fromDate: any = '';
toDate: any = '';
  constructor(public datepipe: DatePipe,private service:DashboardService, private router:Router,private uService: UtilitydesignService) { }

  ngOnInit(): void {
    this.getReports('');
  }
  getReports(type:any) {
    if (type.toLowerCase() == 'today') {
      let date: any = new Date();
      let latest_date = this.datepipe.transform(date, 'yyyy-MM-dd');
       this.fromDate = latest_date + ' 00:00:00';
        this.toDate = latest_date + ' 23:59:59';
    }
    else if(type.toLowerCase() == 'month'){
      let date: any = new Date();
      let p_date: any = new Date();
      let pervioudDate: any = p_date.setDate(p_date.getDate() - 30);
      let latest_date = this.datepipe.transform(date, 'yyyy-MM-dd');
      let pervious_latest_date = this.datepipe.transform( pervioudDate,'yyyy-MM-dd');
      this.fromDate = pervious_latest_date + ' 00:00:00';
      this.toDate = latest_date + ' 23:59:59';
    }
    else if(type.toLowerCase() == 'year'){
      let date: any = new Date();
      let p_date: any = new Date();
      let pervioudDate: any = p_date.setDate(p_date.getDate() - 365);
      let latest_date = this.datepipe.transform(date, 'yyyy-MM-dd');
      let pervious_latest_date = this.datepipe.transform( pervioudDate,'yyyy-MM-dd');
      this.fromDate = pervious_latest_date + ' 00:00:00';
      this.toDate = latest_date + ' 23:59:59';
    }
    else if(type.toLowerCase() == 'all'){
      this.fromDate = '';
      this.toDate = '';
    }
    const formData = new FormData();
   
    formData.append('createdAt', this.fromDate);
    formData.append('updatedAt', this.toDate);
   
    this.uService.isLoading = true;
    this.service.getDashboardReport(formData).subscribe((res: any) => {
      this.uService.isLoading = false;
      if (res.status) {
        this.dashboradData = res.data;
        console.log(res);
      }
    });
  }

}
