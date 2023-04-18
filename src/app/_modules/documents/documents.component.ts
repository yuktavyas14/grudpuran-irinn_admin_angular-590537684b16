import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BannerService } from 'src/app/_services/banner.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { EncrdecrService } from 'src/app/_services/encrdecr.service';
import { DocumentsService } from 'src/app/_services/documents.service';
export interface UserData {}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  displayedColumns: string[] = ['SNo','documentTitle','documentFile', 'documentbDes', 'status','Action'];
  dataSource!: MatTableDataSource<UserData>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  documentsList:any;
   
  constructor(private service:DocumentsService, private router:Router, private uService:UtilitydesignService,private EncrDecr: EncrdecrService) {
    this.getAllDocumentsList();
   }
  ngOnInit(): void {
    localStorage.removeItem('editItemId');
   
   }
  getAllDocumentsList(){
     this.uService.isLoading= true;
    this.service.getAllDocuments().subscribe((res:any)=>{
     this.uService.isLoading= false;
    if(res.success){
      this.documentsList= res.data;
      this.dataSource = new MatTableDataSource(this.documentsList);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }else{

    }
      
    })

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onView(id:any){
   
    // let ids= this.EncrDecr.set('123456$#@$^@1BAN',id)
    // localStorage.setItem('editItemId',ids)
    this.router.navigate(['/documents/edit',id])
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
    this.service.updateDocumentsByStatus(formData, banner.documentId).subscribe((data: any) => {
     this.uService.isLoading= false;

      if (data.status) {
        this.getAllDocumentsList();
      } else {
        this.getAllDocumentsList() 
      }
    });
  }
  ngOnDestroy(): void {
  }
}

