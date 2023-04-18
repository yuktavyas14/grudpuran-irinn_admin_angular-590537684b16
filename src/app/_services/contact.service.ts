import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  
   
  
  getAllContactUs(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/contactUsList').pipe(map(res => {
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
 
 addConMembersDetails(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addConMembersDetails`,data).pipe(map(res => {
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