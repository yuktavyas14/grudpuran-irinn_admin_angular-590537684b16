import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MenuService } from 'src/app/_services/menu.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { Location } from '@angular/common';
import { LanguageService } from 'src/app/_services/language.service';

export interface UserData {}
declare const $: any;
@Component({
  selector: 'app-sub-header-list',
  templateUrl: './sub-header-list.component.html',
  styleUrls: ['./sub-header-list.component.scss'],
  providers:[Location]
})
export class SubHeaderListComponent implements OnInit {
  
  totalrecored: any = 0;
  itemsPerPage: any = '10';
  config: any;
  page: number = 1;
  limit = '10';
  offset = 0;
  headerList: any;
  menuId: any;
  languageId:any='1'
  languageList:any;
  constructor(
    private service: MenuService,
    private uService: UtilitydesignService,
    private router: Router,
    private _location:Location,
    private _ac: ActivatedRoute,
    private langService: LanguageService,
  ) {
    this._ac.paramMap.subscribe((param) => {
      this.menuId = param.get('menuId');
      this.getheader();

      //alert(this.matchId)
    });
  }
  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
  }
  getheader() {
    const formData = new FormData();
    let page:any= this.page -1
    formData.append('menuId', this.menuId);
    formData.append('languageId', this.languageId);
    formData.append('pageNo', page);
    formData.append('pageSize', this.itemsPerPage);

    this.uService.isLoading = true;
    this.service.subMenuList(formData).subscribe((res: any) => {
      this.uService.isLoading = false;
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
      }
    });
  }
  
  onView(menu: any) {
    this.router.navigate(['/menu/sub-menu/edit', this.menuId, menu.id,menu.languageId ||'1']);
  }
  onUpdateStatus(item: any) {
    this.uService.isLoading = true;

    let status:any;
    if (item.status == true) {
      status = false;
    } else {
      status = true;
    }
    const formData = new FormData();
    // formData.append('imageName','');
    // formData.append('file','');
    formData.append('status', status);

    // console.log(formData,'formdata')
    this.service
      .updateSubMenuStatusById(formData, item.id)
      .subscribe((data: any) => {
        this.uService.isLoading = false;

        if (data.status) {
          this.getheader();
        } else {
          this.getheader();
        }
      });
  }
  onBack() {
    this._location.back();
    // this.router.navigate(['/menu/menu-list',]);
  }

  onDelete(id: any) {
    this.uService.isLoading = true;
    this.service.deleteMenu(id).subscribe((data: any) => {
      this.uService.isLoading = false;

      if (data.status) {
        this.getheader();
      } else {
        this.getheader();
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

    this.getheader();
  }
 
  ngOnDestroy(): void {}
}
