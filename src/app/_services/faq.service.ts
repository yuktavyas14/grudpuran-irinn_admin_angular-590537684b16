import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FaqService {
  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  
   
  
  viewAllFAQ(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/faqList').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  getFaqListlanguageid(id:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/getFaqListlanguageid/${id}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 getFaqListBylanguageid(data:any): Observable<any> {
  return this.httpClient.post(this.api.apiUrl + `admin/getFaqListBylanguageid`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
  getFaqById(id:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/faqById/${id}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 addFaq(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addFAQ`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 removeFaq(id:any): Observable<any> {
   return this.httpClient.delete(this.api.apiUrl + `admin/deleteFAQById${id}`,{}).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
  
  updateFaqStatus(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateFAQStatusById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  updateFaq(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateFAQById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
 
  
  
  }