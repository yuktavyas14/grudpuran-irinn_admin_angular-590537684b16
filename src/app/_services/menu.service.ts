import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){

  }



  footerLinkList(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/footerLinkList').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  getFooterListBylanguageid(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/getFooterListBylanguageid`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
  get_footer_link_by_id(id:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/footerLinkById/${id}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }

 addFooterDetails(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addFooterLink`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }


  updateFooterStatus(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateFooterLinkStatusById/${id}`,{}).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  update_footer_link(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateFooterLinkById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }

  deleteFooterLink(id:any): Observable<any> {
    return this.httpClient.delete(this.api.apiUrl + `admin/deleteFooterLinkById/${id}`).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }


  // ----------------Header---------------

  getheader(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/masterMenuList').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  getMasterMenu(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/masterMenuList').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  getMasterMenuListlanguageid(id:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/getMasterMenuListlanguageid`,id).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
  getMenuListlanguageid(id:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/getMenuListlanguageid/${id}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 getSubMenuListlanguageid(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/getSubMenuListlanguageid`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
  getheaderById(id:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/getheaderById/${id}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }

 getMasterMenuById(id:any): Observable<any> {
  return this.httpClient.get(this.api.apiUrl + `admin/masterMenuById/${id}`).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}

menuListById(id:any): Observable<any> {
  return this.httpClient.get(this.api.apiUrl + `admin/menuListById/${id}`).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}

 addMainHeader(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addMasterMenu`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }


  updateHeaderMenuBystatus(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateMasterMenuStatusById/${id}`,{}).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  updateHeaderMenuById(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateHeaderMenuById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }

  updateMasterMenuById(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateMasterMenuById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  updateMenuById(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateMenuById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }




  deleteMasterMenu(id:any): Observable<any> {
    return this.httpClient.delete(this.api.apiUrl + `admin/deleteMasterMenuById/${id}`).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  // ----------------Sub Header---------------

  get_all_sub_headers(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/get_all_sub_headers').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }

  get_all_menu(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/menuList').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }


  get_sub_headers_by_id(id:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/get_sub_headers_by_id/${id}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }

 addSubheader(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addSubheader`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }

 menuListByMasterId(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/menuListByMasterId`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 deleteMenu(id:any): Observable<any> {
  return this.httpClient.delete(this.api.apiUrl + `admin/deleteMasterMenuById/${id}`).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}


  update_sub_headers_by_status(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/update_sub_headers_by_status/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }

  updateMenuBystatus(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateMenuStatusById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }

  update_sub_headers_by_id(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/update_sub_headers_by_id/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }

  addMenu(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addMenu`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }

 addSubMenu(data:any): Observable<any> {
  return this.httpClient.post(this.api.apiUrl + `admin/addSubMenu`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}

 subMenuList(data:any): Observable<any> {
  return this.httpClient.post(this.api.apiUrl + 'admin/subMenuByMenuId',data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
updateSubMenuStatusById(data:any,id:any): Observable<any> {
  return this.httpClient.put(this.api.apiUrl + `admin/updateSubMenuStatusById/${id}`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}

subMenuById(id:any): Observable<any> {
  return this.httpClient.post(this.api.apiUrl + `admin/subMenuById`,id).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}

updateSubMenuById(data:any,id:any): Observable<any> {
  return this.httpClient.put(this.api.apiUrl + `admin/updateSubMenuById/${id}`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
  }
