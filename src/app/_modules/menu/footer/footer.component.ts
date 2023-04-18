import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MenuService } from 'src/app/_services/menu.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { LanguageService } from 'src/app/_services/language.service';

export interface UserData {}
declare const $:any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  displayedColumns: string[] = ['SNo','footerName', 'footerUrl', 'status','Action'];
  dataSource!: MatTableDataSource<UserData>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  footerList:any;
  languageId:any='1'
  languageList:any;
  totalrecored: any = 0;
  itemsPerPage: any=10;
  config: any;
  page:number = 1;
  limit = '10';
  offset = 0;
  constructor(private service:MenuService,
    private langService: LanguageService,
    private uService: UtilitydesignService, private router:Router)
  {
    this.getFooterLink();
   }
  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
   }
   getFooterLink(){
     this.uService.isLoading= true;
     let page:any= this.page -1
     const formData = new FormData();
   
    formData.append('languageId', this.languageId);
    formData.append('pageNo', page);
    formData.append('pageSize', this.itemsPerPage);
    this.service.getFooterListBylanguageid(formData).subscribe((res:any)=>{
     this.uService.isLoading= false;
      // this.footerList= res.data;
      if (res.status) {
        this.footerList = res.data.content;
        
        if (res?.data) {
          this.totalrecored = res?.data?.totalElements || 0;
        }
        
        this.config = {
          currentPage: this.page,
          itemsPerPage: this.itemsPerPage,
          totalItems: this.totalrecored,
        };
      }

    })

  }
  
  onView(menu:any){
    this.router.navigate(['/menu/footer/edit',menu.id,menu.languageId ||'1'])
  }
  onUpdateStatus(banner:any){
     this.uService.isLoading= true;

    let status;
    if(banner.status=='Active'){
      status= 'Inactive'
    }else{
      status= 'Active'
    }
    const formData = new FormData();
    // formData.append('imageName','');
    // formData.append('file','');
    formData.append('status',status);

    console.log(formData,'formdata')
    this.service.updateFooterStatus({}, banner.id).subscribe((data: any) => {
     this.uService.isLoading= false;

      if (data.status) {
        this.getFooterLink();
      } else {
        this.getFooterLink()
      }
    });
  }


  onDelete(id:any){
    this.uService.isLoading= true;
    this.service.deleteFooterLink(id).subscribe((data: any) => {
      this.uService.isLoading= false;

        if (data.status) {
          this.getFooterLink();
        } else {
          this.getFooterLink()
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

    this.getFooterLink();
  }
  ngOnDestroy(): void {
  }
}

