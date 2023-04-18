import { Router } from '@angular/router';
import { Component, isDevMode, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IspService } from 'src/app/_services/isp.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { UserService } from 'src/app/_services/user.service';
import { RoleService } from 'src/app/_services/role.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

export interface UserData {}
declare const $:any;
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  RoleAccess :any=[
    {type:'1',name:'Read', isSelected:false},
    {type:'2',name:'Write',isSelected:false},
    // {type:3,name:'View',isSelected:false},
    // {type:4,name:'Edit',isSelected:false},
  ]
  roleName:any;
  totalrecored: any = 0;
  itemsPerPage: any='100';
  config: any;
  page:number = 1;
  limit = '10';
  offset = 0;
isRoleEdit=false;
selectedRoleId=0;
roleId:any;
dataSource!: MatTableDataSource<UserData>;
posts: any;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
roleList:any;
addForm: FormGroup | any;
selectedArray:any=[]
constructor(private service:RoleService, private router:Router,private uService: UtilitydesignService,
  private fb: FormBuilder,private toaster:ToastrService,
  ) 
{
  
  this.addForm = this.fb.group({
    isArray: this.fb.array([], [Validators.required])
  })
  this.getRoleList();
 }
ngOnInit(): void {
  let a=[4,5,67,87,6,1]

  if(a.length>0){
    if(a.length==1){
      console.log(a[0]);
    }
    else{
      let minofArray=a[0]
      for (let index = 0; index < a.length; index++) {
        
        if(minofArray > a[index]){
          minofArray= a[index]
        }
        
      }
      // a.forEach((a) => {
      //   if(minofArray > a){
      //     minofArray= a;
      //   }
        
      // });
      console.log(minofArray);
      
      
    }

  }else{
    console.log('no data found');
    
  }
 
  
  // Datatable

//   if($('#dataTable').length > 0) {
//     $('#dataTable').DataTable({
//       // "bFilter": false,
//       paging: false,
//   searching: false
//     });
//   }
 }
 getRoleList(){
  const formData = new FormData();
  let page:any= this.page -1
   // formData.append('languageId', this.languageId);
   formData.append('pageNo', page);
   formData.append('pageSize', this.itemsPerPage);
   this.uService.isLoading= true;
  this.service.getRoleList().subscribe((res:any)=>{
   this.uService.isLoading= false;
      
  if (res.status) {
    this.roleList = res.data;
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
isroleSelected(role: any, type:any) {
  // console.log(role,'role-----');
  if(role != undefined && role != null && role != ''){
  let value:any = role.split(",");
  // console.log();
  // console.log(value,'-----');
  
  if (value.includes(type)) {
    return true;
  } else {
    return false;
  }
}
else{
  return false;
}
}
editRole(role:any){
  // this.RoleAccess=[
  //   {type:'1',name:'Read', isSelected:false},
  //   {type:'2',name:'Write',isSelected:false},
  //   // {type:3,name:'View',isSelected:false},
  //   // {type:4,name:'Edit',isSelected:false},
  // ]
  this.roleName= role.roleName
  this.roleId = role.id;
  this.selectedRoleId= role.id;
  this.isRoleEdit= true

}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
onView(id:any){
  this.router.navigate(['/roles/edit',id])
}
onUpdateStatus(item:any){
   this.uService.isLoading= true;

  let status;
  if(item.status){
    status= '0'
  }else{
    status= '1'
  }
  const formData = new FormData();
  formData.append('status',status);
  this.service.updateRoleByStatus(formData, item.id).subscribe((data: any) => {
   this.uService.isLoading= false;
    if (data.status) {
      this.getRoleList();
    } else {
      this.getRoleList() 
    }
  });
}
ngOnDestroy(): void {
}
onUpdate() {
  let responbailityData:any = []
  // if(!this.isImageSize){
  //   this.toaster.error(this.error)
  //   return
  // }
  this.newArray.forEach((item:any) => {
    console.log(this.newArray);
   if(item.role){
    var data= item.role.type
   }
   responbailityData.push(data)
   
});
  console.log(this.addForm.value)
  // console.log(this.addForm.value.responsbility);
  
    this.uService.isLoading = true;

  const formData = new FormData();
  let respo:any= responbailityData
  formData.append('responsbility', respo);
  formData.append('roleName', this.roleName);

  // formData.append('responsbility', this.addForm.value.responsbility);
  this.service
    .updateRoleById(formData, this.roleId)
    .subscribe((data: any) => {
       this.uService.isLoading = false;

      if (data.status) {
        this.toaster.success(data.message);

        this.selectedRoleId= 0;
        this.getRoleList() 

      } else {
      this.getRoleList() 

      }
    },error=>{
      this.toaster.error(error.error.message);
    });
}


newArray : any = [];
//Checkbox Change detecting function
getCheckboxValues(ev:any, data:any) {
  let obj = {
    "role" : data
  }
  
  if(ev.target.checked){
    // Pushing the object into array
    this.newArray.push(obj);

  }else {
    let el = this.newArray.find((itm:any) => itm.role===data);
    
    if(el)
      this.newArray.splice(this.newArray.indexOf(el),1);
  }
 
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

  this.getRoleList();
}
}

