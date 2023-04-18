import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FaqService } from 'src/app/_services/faq.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { GlobalSettingService } from 'src/app/_services/global-setting.service';
import { LanguageService } from 'src/app/_services/language.service';
import { ToastrService } from 'ngx-toastr';

declare const $:any;
@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  languagesList:any;
  constructor(private service:LanguageService, private router:Router,private uService: UtilitydesignService, private toaster:ToastrService) 
  {
    this.getlanguagesList();
   }
  ngOnInit(): void {
   
   }
   getlanguagesList(){
     this.uService.isLoading= true;
     const formData = new FormData();
   
    formData.append('settingType', 'bannerService');
      
    this.service.getLanguageList().subscribe((res:any)=>{
     this.uService.isLoading= false;
    if(res.status){
      this.languagesList= res.data;
      console.log(res);
    }
      
    })
  
  }
  updateLanguageIsDefault(data:any){
    if(data.default){
      return
    }
    else{
      this.uService.isLoading = true;
      const formData= new FormData;
      formData.append('id',data.id)
      this.service.updateLanguageIsDefault(formData).subscribe({
        // completeHandler
        next: (res) => {
          // this.uService.isLoading = false;
         
        },
        error: (error) => {
          this.uService.isLoading = false;
          this.toaster.error(error.error.message);
        }, // errorHandler
  
        complete: () => {
          this.uService.isLoading = false;
          this.getlanguagesList();
          
        }, // nextHandler
      });
    }
  
    
  }
   
  onView(id:any){
    this.router.navigate(['/global-setting/languages/edit',id])
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
    formData.append('id',item.id);
    
    console.log(formData,'formdata')
    this.service.updateLanguageByStatus(formData).subscribe((data: any) => {
     this.uService.isLoading= false;
  
      if (data.status) {
        this.getlanguagesList();
      } else {
        this.getlanguagesList() 
      }
    });
  }
  ngOnDestroy(): void {
  }
  onDelete(id:any){}
  }
  