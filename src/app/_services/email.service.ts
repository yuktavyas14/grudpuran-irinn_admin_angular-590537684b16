import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){

  }


  getEmaillanguageid(id:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/getEmailTemplateList`,id).pipe(map(res => {
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

 getEmailById(id:any): Observable<any> {
  return this.httpClient.get(this.api.apiUrl + `admin/emailTemplateById/${id}`).pipe(map(res => {
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

 addEmail(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addEmailTemplate`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }


  updateEmailBystatus(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateEmailTemplateStatusById/${id}`,{}).pipe(map(res => {
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

  updateEmailById(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateEmailTemplateById/${id}`,data).pipe(map(res => {
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




  deleteEmail(id:any): Observable<any> {
    return this.httpClient.delete(this.api.apiUrl + `admin/deleteEmailTemplateById/${id}`).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
}
