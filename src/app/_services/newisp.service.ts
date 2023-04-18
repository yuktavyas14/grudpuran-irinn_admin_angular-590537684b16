import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class NewispService {

  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  
  
    getnewIspList(): Observable<any> {
      return this.httpClient.get(this.api.apiUrl + 'admin/getnewIspList').pipe(map(res => {
        return res
      }),catchError(errorResponse=>{
        return throwError(()=>errorResponse)
      }) );
    }
    getnewIspById(id:any): Observable<any> {
     return this.httpClient.get(this.api.apiUrl + `admin/getnewIspById/${id}`).pipe(map(res => {
       return res
     }),catchError(errorResponse=>{
       return throwError(()=>errorResponse)
     }) );
   }
   
   addNewIsp(data:any): Observable<any> {
     return this.httpClient.post(this.api.apiUrl + `admin/addNewIsp`,data).pipe(map(res => {
       return res
     }),catchError(errorResponse=>{
       return throwError(()=>errorResponse)
     }) );
   }

   
   removeNewIspById(id:any): Observable<any> {
     return this.httpClient.post(this.api.apiUrl + `admin/removeNewIspById/${id}`,{}).pipe(map(res => {
       return res
     }),catchError(errorResponse=>{
       return throwError(()=>errorResponse)
     }) );
   }
   
    
    updatenewIspById(data:any,id:any): Observable<any> {
      return this.httpClient.put(this.api.apiUrl + `admin/updatenewIspById/${id}`,data).pipe(map(res => {
        return res
      }),catchError(errorResponse=>{
        return throwError(()=>errorResponse)
      }) );
    }
    updatenewIspByStatus(data:any,id:any): Observable<any> {
      return this.httpClient.put(this.api.apiUrl + `admin/updatenewIspByStatus/${id}`,data).pipe(map(res => {
        return res
      }),catchError(errorResponse=>{
        return throwError(()=>errorResponse)
      }) );
    }
  
}
