import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoAddressService {

  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  
  
    getLogoDetails(): Observable<any> {
      return this.httpClient.get(this.api.apiUrl + 'admin/logoList').pipe(map(res => {
        return res
      }),catchError(errorResponse=>{
        return throwError(()=>errorResponse)
      }) );
    }
    
    getLogoBylanguageid(id:any): Observable<any> {
     return this.httpClient.get(this.api.apiUrl + `admin/getLogoBylanguageid/${id}`).pipe(map(res => {
       return res
     }),catchError(errorResponse=>{
       return throwError(()=>errorResponse)
     }) );
   }
    getLogoDetailsById(id:any): Observable<any> {
     return this.httpClient.get(this.api.apiUrl + `admin/logoById/${id}`).pipe(map(res => {
       return res
     }),catchError(errorResponse=>{
       return throwError(()=>errorResponse)
     }) );
   }
   
   logoList(data:any): Observable<any> {
     return this.httpClient.post(this.api.apiUrl + `admin/logoList`,data).pipe(map(res => {
       return res
     }),catchError(errorResponse=>{
       return throwError(()=>errorResponse)
     }) );
   }
   addLogoDetails(data:any): Observable<any> {
     return this.httpClient.post(this.api.apiUrl + `admin/addMainLogo`,data).pipe(map(res => {
       return res
     }),catchError(errorResponse=>{
       return throwError(()=>errorResponse)
     }) );
   }
   
    
   deleteLogoById(id:any): Observable<any> {
      return this.httpClient.delete(this.api.apiUrl + `admin/deleteLogoById/${id}`,{}).pipe(map(res => {
        return res
      }),catchError(errorResponse=>{
        return throwError(()=>errorResponse)
      }) );
    }
    
    updateLogoById(data:any,id:any): Observable<any> {
      return this.httpClient.put(this.api.apiUrl + `admin/updateLogoById/${id}`,data).pipe(map(res => {
        return res
      }),catchError(errorResponse=>{
        return throwError(()=>errorResponse)
      }) );
    }
    
    updateLogoByStatus(data:any,id:any): Observable<any> {
      return this.httpClient.put(this.api.apiUrl + `admin/updateLogoStatusById/${id}`,data).pipe(map(res => {
        return res
      }),catchError(errorResponse=>{
        return throwError(()=>errorResponse)
      }) );
    }
  
}
