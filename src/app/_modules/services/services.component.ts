import { Router } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { ServicesService } from 'src/app/_services/services.service';
import { LanguageService } from 'src/app/_services/language.service';

export interface UserData {}

 

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  displayedColumns: string[] = ['serviceName', 'serviceImage', 'status','Action'];
  dataSource!: MatTableDataSource<UserData>;
  servicesList: any;
  languageId:any='1'
  languageList:any;
  totalrecored: any = 0;
  itemsPerPage: any = '10';
  config: any;
  page: number = 1;
  limit = '10';
  offset = 0;
  constructor(private service: ServicesService,  private langService: LanguageService,private router:Router,private uService: UtilitydesignService,) {
    this.getAllService();
    // Create 100 users
    // const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    // console.log(this.servicesList);
    // console.log('users', users);
  }
  ngOnInit(){
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
  }
getAllService(){
   this.uService.isLoading= true;
   const formData = new FormData();

   let page:any= this.page -1
   formData.append('languageId', this.languageId);
   formData.append('pageNo', page);
   formData.append('pageSize', this.itemsPerPage);
  this.service.getServiceBylanguageid(formData).subscribe((res) => {
   this.uService.isLoading= false;
   if (res.status) {
    this.servicesList = res.data.content;
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

  this.getAllService();
}
  onView(service:any){
    this.router.navigate(['/services/edit',service.id,service.languageId || '1'])
  }
  onUpdateStatus(banner:any){
     this.uService.isLoading= true;

    let status:any;
    if(banner.status){
      status= false
    }else{
      status= true
    }
    const formData = new FormData();
    formData.append('status',status);
    formData.append('id', banner.id);
    
    console.log(formData,'formdata')
    this.service.updateServiceByStatus(formData, banner.id).subscribe((data: any) => {
     this.uService.isLoading= false;

      if (data.status) {
        this.getAllService();
      } else {
        this.getAllService() 
      }
    });
  }
}

 