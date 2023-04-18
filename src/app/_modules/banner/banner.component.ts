import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BannerService } from 'src/app/_services/banner.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { EncrdecrService } from 'src/app/_services/encrdecr.service';
import { LanguageService } from 'src/app/_services/language.service';
 

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  totalrecored: any = 0;
  itemsPerPage: any = '10';
  config: any;
  page: number = 1;
  limit = '10';
  offset = 0;
  languageId: any = '1';
  languageList: any;
  bannerList: any;
  constructor(
    private service: BannerService,
    private router: Router,
    private langService: LanguageService,
    private uService: UtilitydesignService,
    private EncrDecr: EncrdecrService
  ) {
    this.getBannerList();
  }
  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
    localStorage.removeItem('editItemId');
  }
  getBannerList() {
    this.uService.isLoading = true;
    const formData = new FormData();
    let page:any= this.page -1
     // formData.append('languageId', this.languageId);
     formData.append('pageNo', page);
     formData.append('pageSize', this.itemsPerPage,);
     formData.append('languageId', this.languageId,);
       
    this.service
      .mainBannerList(formData)
      .subscribe((res: any) => {
        this.uService.isLoading = false;
        if (res.status) {
          this.bannerList = res.data.content;
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
      });
  }

  onView(item: any) {
    let ids = this.EncrDecr.set('123456$#@$^@1BAN', item.id);
    localStorage.setItem('editItemId', ids);
    this.router.navigate(['/banner/edit', item.id, item.languageId]);
  }
  onUpdateStatus(banner: any) {
    this.uService.isLoading = true;

    let status;
    if (banner.status == 'Active') {
      status = 'Inactive';
    } else {
      status = 'Active';
    }
    const formData = new FormData();
    // formData.append('imageName','');
    // formData.append('file','');
    formData.append('status', status);

    console.log(formData, 'formdata');
    this.service.updateBannerStatus({}, banner.id).subscribe((data: any) => {
      this.uService.isLoading = false;

      if (data.status) {
        this.getBannerList();
      } else {
        this.getBannerList();
      }
    });
  }

  onDelete(id: any) {
    this.uService.isLoading = true;
    this.service.deleteMainBannerById(id).subscribe((data: any) => {
      this.uService.isLoading = false;

      if (data.status) {
        this.getBannerList();
      } else {
        this.getBannerList();
      }
    });
  }
  ngOnDestroy(): void {}
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

    this.getBannerList();
  }
}
