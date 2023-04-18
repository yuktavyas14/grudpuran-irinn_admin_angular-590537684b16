import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FaqService } from 'src/app/_services/faq.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { ProviderService } from 'src/app/_services/provider.service';
import { TneService } from 'src/app/_services/tne.service';

export interface UserData {}
declare const $:any;
@Component({
  selector: 'app-tne',
  templateUrl: './tne.component.html',
  styleUrls: ['./tne.component.scss']
})
export class TneComponent implements OnInit {

  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  faqList:any;
  constructor(private service:TneService, private router:Router,private uService: UtilitydesignService) 
  {
    this.viewAllFAQ();
   }
  ngOnInit(): void {
   
   }
   viewAllFAQ(){
     this.uService.isLoading= true;
    this.service.tNEList().subscribe((res:any)=>{
     this.uService.isLoading= false;
    if(res.status){
      this.faqList= res.data;
      console.log(res);
    }
      
    })
  
  }
   
  onView(id:any){
    this.router.navigate(['/tne/edit',id])
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
    this.service.updateTNEStatusById(formData, item.id).subscribe((data: any) => {
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
  