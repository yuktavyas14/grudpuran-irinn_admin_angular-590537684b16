import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SendmailService {
  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  
   
  
  viewAllConMembersDetails(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/viewAllConMembersDetails').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  getConMembersDetailsById(id:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/getConMembersDetailsById/${id}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 sendMail(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/sendMail`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 removeContactUsById(id:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/removeContactUsById${id}`,{}).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
  
  updateConMembersDetailsByStatus(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateConMembersDetailsByStatus/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  updateConMembersDetails(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateConMembersDetails/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
 
  
  
  }