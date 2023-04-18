import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FaqService } from 'src/app/_services/faq.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { ProviderService } from 'src/app/_services/provider.service';
import { TneService } from 'src/app/_services/tne.service';
import { ITCService } from 'src/app/_services/itc.service';

export interface UserData {}
declare const $:any;
@Component({
  selector: 'app-itc',
  templateUrl: './itc.component.html',
  styleUrls: ['./itc.component.scss']
})
export class ItcComponent implements OnInit {

  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  faqList:any;
  constructor(private service:ITCService, private router:Router,private uService: UtilitydesignService) 
  {
    this.viewAllFAQ();
   }
  ngOnInit(): void {
   
   }
   viewAllFAQ(){
     this.uService.isLoading= true;
    this.service.iTCList().subscribe((res:any)=>{
     this.uService.isLoading= false;
    if(res.status){
      this.faqList= res.data;
      console.log(res);
    }
      
    })
  
  }
   
  onView(id:any){
    this.router.navigate(['/itc/edit',id])
  }
  onUpdateStatus(item:any){
     this.uService.isLoading= true;
  
    let status:any;
    if(item.status){
      status= false
    }else{
      status= true
    }
    const formData = new FormData();
    // formData.append('imageName','');
    // formData.append('file','');
    formData.append('status',status);
    
    console.log(formData,'formdata')
    this.service.updateITCStatusById(formData, item.id).subscribe((data: any) => {
     this.uService.isLoading= false;
  
      if (data.status) {
        this.viewAllFAQ();
      } else {
        this.viewAllFAQ() 
      }
    });
  }
  ngOnDestroy(): void {
  }
  onDelete(id:any){}
  }
  