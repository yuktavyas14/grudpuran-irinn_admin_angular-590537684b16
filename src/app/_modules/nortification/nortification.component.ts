import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FaqService } from 'src/app/_services/faq.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { ProviderService } from 'src/app/_services/provider.service';
import { UserService } from 'src/app/_services/user.service';

 
@Component({
  selector: 'app-nortification',
  templateUrl: './nortification.component.html',
  styleUrls: ['./nortification.component.scss']
})
export class NortificationComponent implements OnInit {
  feedbakcId:any;
  feedbakcName:any;
  faqList:any;
  constructor(private service:UserService,private _ac: ActivatedRoute, private router:Router,private uService: UtilitydesignService) 
  {
    this._ac.paramMap.subscribe((param) => {
      this.feedbakcId = param.get('id');
      this.feedbakcName = param.get('name');
      //alert(this.matchId)
      this.service.updateFbNCpStatusById(this.feedbakcId).subscribe((res:any)=>{
        // this.uService.isLoading= false;
      
         
       })
    this.onFeedbackComplainById();

    });
   }
  ngOnInit(): void {
 
   
   }
   onFeedbackComplainById(){
     this.uService.isLoading= true;
    this.service.feedbackComplainById(this.feedbakcId).subscribe((res:any)=>{
     
    if(res.status){
      this.uService.isLoading= false;
      this.faqList= res.data;
      console.log(res);
    }
    else{
      this.uService.isLoading= false;
    }
      
    })
  
  }
   
 
 
  ngOnDestroy(): void {
  }
  }
  