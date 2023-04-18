import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class QuickLinksService {
  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
 getQuickLinkList(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + 'admin/getQuickLinkList',data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  getQuickLinkListByLanguageId(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + 'admin/getQuickLinkListByLanguageId',data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  getQuickLinkListById(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/getQuickLinkListById`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 addQuickLink(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addQuickLink`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 removeQuickLinkById(id:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/removeQuickLinkById${id}`,{}).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
  
  updateQuickLinkByStatus(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateQuickLinkByStatus`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  updateQuickLinkById(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateQuickLinkById`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
 
  
  
  }
