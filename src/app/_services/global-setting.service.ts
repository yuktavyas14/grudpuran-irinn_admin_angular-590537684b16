import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GlobalSettingService {

  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){

  }


  getSettingTypeList(): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + 'admin/getSettingTypeList',{}).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  getBannerServiceList(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + 'admin/getBannerServiceList', data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  editBannerServiceById(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/editBannerServiceById`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }

 addBannerService(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addBannerService`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }

 deleteBannerServiceById(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/deleteBannerServiceById`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }

 updateBannerServiceById(data:any,id:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateBannerServiceById`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }


  updateBannerServiceByStatus(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateBannerServiceByStatus`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }


  getWhatWeHaveList(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/getWhatWeHaveList`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }

  getWhatWeHaveByIdAndLanguageId(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/getWhatWeHaveByIdAndLanguageId`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }

  addWhatWeHaveData(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/addWhatWeHaveData`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  updateWhatWeHaveByStatus(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateWhatWeHaveByStatus`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  updateWhatWeHaveById(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateWhatWeHaveById`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  getWhatWeHaveById(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/getWhatWeHaveById`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  getUploadImageList(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + 'admin/getUploadImageList',data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  getImageList(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + 'admin/getImageList',data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  uploadImageToEditor(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + 'auth/uploadImageToEditor',data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }

  // ----------------------------------whyIp-4-ip-6-----------------------

  getwhyIPv6List(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + 'admin/getwhyIPv6List',data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }

  getwhyIPv6ByIdAndLanguageId(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/getwhyIPv6ByIdAndLanguageId`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }

 addWhyIPv6(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addWhyIPv6`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }



 updateWhyIPv6ById(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateWhyIPv6ById`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }


  updateWhyIPv6StatusById(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateWhyIPv6StatusById`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }


// ----------------------------------------add Global Data-----------------------



  getGlobalDataBySettingTypeAndlanguageId(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + 'admin/getGlobalDataBySettingTypeAndlanguageId',data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }

  getGlobalDataById(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/getGlobalDataById`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }

 addGlobalData(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addBannerService`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }



 updateGlobalDataById(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateBannerServiceById`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }


  updateGlobalDataByStatus(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateGlobalDataByStatus`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }


  }

