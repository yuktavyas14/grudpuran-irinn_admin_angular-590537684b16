import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FaqService } from 'src/app/_services/faq.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { ProviderService } from 'src/app/_services/provider.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-nortification-list',
  templateUrl: './nortification-list.component.html',
  styleUrls: ['./nortification-list.component.scss']
})
export class NortificationListComponent implements OnInit {

  faqList:any;
  constructor(private service:UserService, private router:Router,private uService: UtilitydesignService) 
  {
    this.viewAllFAQ();
   }
  ngOnInit(): void {
   
   }
   viewAllFAQ(){
     this.uService.isLoading= true;
    this.service.getAllfeedbackNComplainList().subscribe((res:any)=>{
     this.uService.isLoading= false;
    if(res.status){
      this.faqList= res.data;
    }
      
    })
  
  }
   
  onUpdateFbNCpStatusById(item:any){
    this.router.navigate(['/nortification',item.id, item.name])
       
      
  }
 
  ngOnDestroy(): void {
  }
}
  