import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/_services/language.service';
import { ProviderService } from 'src/app/_services/provider.service';
import { ResoursepartnerService } from 'src/app/_services/resoursepartner.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';

@Component({
  selector: 'app-resource-partner',
  templateUrl: './resource-partner.component.html',
  styleUrls: ['./resource-partner.component.scss']
})
export class ResourcePartnerComponent implements OnInit {

  posts: any;
  totalrecored: any = 0;
  itemsPerPage: any = '10';
  config: any;
  page: number = 1;
  limit = '10';
  offset = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  resourcePartnerList:any;
  languageId:any='1'
  languageList:any;
  constructor(private service:ResoursepartnerService,private langService:LanguageService, private router:Router,private uService: UtilitydesignService) 
  {
    this.getProvidersList();
   }
  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
   }
   getProvidersList(){
   
    const formData = new FormData();
    let page:any= this.page -1
     // formData.append('languageId', this.languageId);
     formData.append('pageNo', page);
     formData.append('pageSize', this.itemsPerPage);
     formData.append('languageId', this.languageId);
     this.uService.isLoading= true;
    this.service.getResourcePartnersList(formData).subscribe((res:any)=>{
     this.uService.isLoading= false;
    
    if (res.status) {
      this.resourcePartnerList = res.data.content;
      if (res?.data) {
        this.totalrecored = res?.data?.totalElements || 0;
      }

      this.config = {
        currentPage: this.page,
        itemsPerPage: this.itemsPerPage,
        totalItems: this.totalrecored,
      };
    } else {
    }
      
    })
  
  }
   
  onView(id:any){
    this.router.navigate(['/resourcepartner/edit',id])
  }
  onUpdateStatus(item:any){
    debugger;
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
    
    //console.log(formData,'formdata')
    this.service.updateResourcePartnersByStatus(formData).subscribe((data: any) => {
     this.uService.isLoading= false;
  
      if (data.status) {
        this.getProvidersList();
      } else {
        this.getProvidersList() 
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

    this.getProvidersList();
  }
  ngOnDestroy(): void {
  }
  onDelete(id:any){}
  }
  