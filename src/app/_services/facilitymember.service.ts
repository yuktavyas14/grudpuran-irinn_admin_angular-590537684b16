import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FacilitymemberService {

  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  
  
    getFacilityMemberList(): Observable<any> {
      return this.httpClient.get(this.api.apiUrl + 'admin/getFacilityMemberList').pipe(map(res => {
        return res
      }),catchError(errorResponse=>{
        return throwError(()=>errorResponse)
      }) );
    }
    
    getFacilityMemberById(id:any): Observable<any> {
     return this.httpClient.get(this.api.apiUrl + `admin/getFacilityMemberById/${id}`).pipe(map(res => {
       return res
     }),catchError(errorResponse=>{
       return throwError(()=>errorResponse)
     }) );
   }
   
   
   addFacilityToMember(data:any): Observable<any> {
     return this.httpClient.post(this.api.apiUrl + `admin/addFacilityToMember`,data).pipe(map(res => {
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
   
    
    updateHeaderMenuBystatus(data:any,id:any): Observable<any> {
      return this.httpClient.put(this.api.apiUrl + `admin/updateHeaderMenuBystatus/${id}`,data).pipe(map(res => {
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
