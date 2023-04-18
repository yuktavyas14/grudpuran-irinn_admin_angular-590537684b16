import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserData } from 'src/app/_modules/user/user.component';
import { LanguageService } from 'src/app/_services/language.service';
import { MenuService } from 'src/app/_services/menu.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { Ipv6feesService } from 'src/app/_services/ipv6fees.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fees-calculate',
  templateUrl: './fees-calculate.component.html',
  styleUrls: ['./fees-calculate.component.scss']
})
export class FeesCalculateComponent implements OnInit {
  totalrecored: any = 0;
  itemsPerPage: any = '10';
  config: any;
  ipBlock:any;
  page: number = 1;
  limit = '10';
  offset = 0;
  searchKeywordip4:any;
  searchKeywordip6:any
  ipBlock4:any;
  ipBlock6:any
  searchKey:boolean=false;
  displayedColumns: string[] = ['SNo','headerName', 'view', 'status','Action'];
  dataSource!: MatTableDataSource<UserData>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  feesList:any;
  languageId:any='1'
  languageList:any;
  ipvType:any='2';
  pageno:any='0';
  x:any;
  message:any;
  searchList:any;
  addForm:FormGroup|any;
  constructor(private service:Ipv6feesService, private langService: LanguageService,
    private uService: UtilitydesignService, private router:Router,  private fb: FormBuilder, private _toastr:ToastrService,)
  {
    this.getfeescalculation();
   }
  ngOnInit(): void {
    this.addForm = this.fb.group({
      
      ipBlock4: new FormControl(''),
      ipBlock6: new FormControl(''),

 
    });
   
 
   }
   getUseripv4Fee(user:any){
    this.x=user.ipv4Fee
    if(this.x!=null && this.x!=undefined && this.x!=''){
      const res= this.x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return res;
    }
    else{
      return '-'
    }
   }
  
  search(){
    debugger;
   
        let formData = new FormData();
        this.uService.isLoading= true;
        formData.append('ipBlock4', this.addForm.value.ipBlock4?this.addForm.value.ipBlock4:'');
        formData.append('ipBlock6', this.addForm.value.ipBlock6?this.addForm.value.ipBlock6:'');
        this.service.getSearchList(formData).subscribe(data=>{
          
          debugger;
          if(data.data){
            this.uService.isLoading= false;
            this.searchKey=true;
            this.searchList = data.data;
            this._toastr.success(data.message)
            console.log(this.searchList,"sss")
          }
          else{
            this._toastr.error("Page Not Found ");
            this.uService.isLoading= false;
            this.searchKey=false;
          }
        
        //  this.utility.sendSearchData(this.searchList);
      
        })
        this.searchKey=false;
      
      }
   getUseripv6Fee(user:any){
    
    this.x=user.ipv6Fee
    if(this.x!=null && this.x!=undefined && this.x!=''){
      const res= this.x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return res;
    }
    else{
      return '-'
    }
   }
   getfeescalculation(){
    this.searchKey=false;
     this.uService.isLoading= true;
     const formData = new FormData();
     let page:any= this.page -1
      // formData.append('languageId', this.languageId);
      formData.append('pageNo', page);
      formData.append('pageSize', this.itemsPerPage);
    this.service.getFeeCalculatorList(formData).subscribe((res:any)=>{
     this.uService.isLoading= false;
  
    if (res.status) {
      this.feesList = res.data.content;
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
    debugger;
    if (this.page < newPage) {
      this.offset = this.offset + Number(this.itemsPerPage);
    } else {
      this.offset = this.offset - Number(this.itemsPerPage);
      if (this.offset < 0) {
        this.offset = 0;
      }
    }
    this.page = newPage;

    this.getfeescalculation();
  }
  onView(menu:any){
    debugger
    this.router.navigate(['/feescalculate/fees/edit',menu.feeId])
  }
  ngOnDestroy(): void {
  }

}

