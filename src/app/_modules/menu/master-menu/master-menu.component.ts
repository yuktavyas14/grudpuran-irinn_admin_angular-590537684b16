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
  selector: 'app-master-menu',
  templateUrl: './master-menu.component.html',
  styleUrls: ['./master-menu.component.scss']
})
export class MasterMenuComponent implements OnInit {
  totalrecored: any = 0;
  itemsPerPage: any = '10';
  config: any;
  page: number = 1;
  limit = '10';
  offset = 0;
  displayedColumns: string[] = ['SNo','headerName', 'view', 'status','Action'];
  dataSource!: MatTableDataSource<UserData>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  headerList:any;
  languageId:any='1'
  languageList:any;
  constructor(private service:MenuService, private langService: LanguageService,
    private uService: UtilitydesignService, private router:Router)
  {
    this.getheader();
   }
  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
 
   }
   getheader(){
     this.uService.isLoading= true;
     const formData = new FormData();
     let page:any= this.page -1
      // formData.append('languageId', this.languageId);
      formData.append('pageNo', page);
      formData.append('pageSize', this.itemsPerPage);
      formData.append('languageId', this.languageId);
    this.service.getMasterMenuListlanguageid(formData).subscribe((res:any)=>{
     this.uService.isLoading= false;
  
    if (res.status) {
      this.headerList = res.data.content;
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

    this.getheader();
  }
  onView(menu:any){
    this.router.navigate(['/menu/master-menu/edit',menu.id,menu.languageId ||'1'])
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

    // console.log(formData,'formdata')
    this.service.updateHeaderMenuBystatus({}, item.id).subscribe((data: any) => {
     this.uService.isLoading= false;

      if (data.status) {
        this.getheader();
      } else {
        this.getheader()
      }
    });
  }

  onDelete(id:any){
    this.uService.isLoading= true;
    this.service.deleteMasterMenu(id).subscribe((data: any) => {
      this.uService.isLoading= false;

        if (data.status) {
          this.getheader();
        } else {
          this.getheader()
        }
      });
  }
  onGotoMenu(id:any){
    this.router.navigate(['/menu/menu-list',id])

  }
  ngOnDestroy(): void {
  }

}
