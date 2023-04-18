import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BannerService } from 'src/app/_services/banner.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { EncrdecrService } from 'src/app/_services/encrdecr.service';
import { LanguageService } from 'src/app/_services/language.service';
import { TenderService } from 'src/app/_services/tender.service';
 
@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.scss']
})
export class TenderComponent implements OnInit {

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
    private service: TenderService,
    private router: Router,
    private langService: LanguageService,
    private uService: UtilitydesignService,
    private EncrDecr: EncrdecrService
  ) {
    this.getTenderList();
  }
  ngOnInit(): void {
    this.langService.getLanguageList().subscribe((res: any) => {
      this.languageList = res.data;
    });
    localStorage.removeItem('editItemId');
  }
  getTenderList() {
    this.uService.isLoading = true;
    const formData = new FormData();
    let page:any= this.page -1
     // formData.append('languageId', this.languageId);
     formData.append('pageNo', page);
     formData.append('pageSize', this.itemsPerPage,);
     formData.append('languageId', this.languageId,);
       
    this.service
      .getTenderList(formData)
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
    
    this.router.navigate(['/tender/edit', item.id, item.languageId]);
  }
  onUpdateStatus(banner: any) {
    this.uService.isLoading = true;

    let status:any;
    if (banner.status) {
      status = false;
    } else {
      status = true;
    }
    const formData = new FormData();
    // formData.append('imageName','');
    // formData.append('file','');
    formData.append('status', status);
    formData.append('id', banner.id);

    console.log(formData, 'formdata');
    this.service.updateTenderByStatus(formData).subscribe((data: any) => {
      this.uService.isLoading = false;

      if (data.status) {
        this.getTenderList();
      } else {
        this.getTenderList();
      }
    });
  }

  onDelete(id: any) {
    this.uService.isLoading = true;
    this.service.removeTenderById(id).subscribe((data: any) => {
      this.uService.isLoading = false;

      if (data.status) {
        this.getTenderList();
      } else {
        this.getTenderList();
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

    this.getTenderList();
  }
}
