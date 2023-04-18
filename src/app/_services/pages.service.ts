import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PagesService {


  LoginUserData = new BehaviorSubject(undefined);
 constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){

}



getAllPage(): Observable<any> {
  return this.httpClient.get(this.api.apiUrl + 'admin/pageList').pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
updatePageStatus(data:any,id:any): Observable<any> {
  return this.httpClient.put(this.api.apiUrl + `admin/updatePageStatusById/${id}`,{}).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}


deletePage(id:any): Observable<any> {
  return this.httpClient.delete(this.api.apiUrl + `admin/deletePageById/${id}`).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
updatePageById(data:any,id:any): Observable<any> {
  return this.httpClient.put(this.api.apiUrl + `admin/updatePageById/${id}`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
getPageById(id:any): Observable<any> {
  return this.httpClient.get(this.api.apiUrl + `admin/pageById/${id}`).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}

addPage(data:any): Observable<any> {
  return this.httpClient.post(this.api.apiUrl + `admin/addPage`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
getPageListBylanguageId(data:any): Observable<any> {
  return this.httpClient.post(this.api.apiUrl + `admin/getPageListBylanguageId`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}


}
