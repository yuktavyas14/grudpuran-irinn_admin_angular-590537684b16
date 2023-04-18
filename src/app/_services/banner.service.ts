import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class BannerService {
  LoginUserData = new BehaviorSubject(undefined);

 constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){

}



mainBannerList(data:any): Observable<any> {
  return this.httpClient.post(this.api.apiUrl + 'admin/mainBannerList',data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
updateBannerStatus(data:any,id:any): Observable<any> {
  return this.httpClient.put(this.api.apiUrl + `admin/updateMBStatusById/${id}`,{}).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
updateMainBanner(data:any,id:any): Observable<any> {
  return this.httpClient.put(this.api.apiUrl + `admin/updateMainBannerById/${id}`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
getBannerListBylanguageid(data:any,id:any): Observable<any> {
  return this.httpClient.post(this.api.apiUrl + `admin/getBannerListBylanguageid/${id}`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
getBannerImageByid(id:any): Observable<any> {
  return this.httpClient.get(this.api.apiUrl + `admin/mainBannerById/${id}`).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
deleteMainBannerById(id:any): Observable<any> {
  return this.httpClient.delete(this.api.apiUrl + `admin/deleteMainBannerById/${id}`).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}

addMainBanner(data:any): Observable<any> {
  return this.httpClient.post(this.api.apiUrl + `admin/addMainBanner`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
}
