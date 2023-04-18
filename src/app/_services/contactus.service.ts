import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){}
 
  contactUsList(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + 'admin/contactUsList',data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  contactUsById(id:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/contactUsById/${id}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 addContactUs(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addContactUs`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 deleteContactUsById(id:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/deleteContactUsById${id}`,{}).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
  
  updateContactUsStatusById(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateContactUsStatusById`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  updateContactUsById(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateContactUsById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
 
  
  
  }