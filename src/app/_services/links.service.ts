import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LinksService {
  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  
   
  
  getAllImportantLinks(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/getAllImportantLinks').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  getAllImportantLinksById(id:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/getAllImportantLinksById/${id}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 addImportantLinks(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addImportantLinks`,data).pipe(map(res => {
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
  
  updateImpLinkByStatus(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateImpLinkByStatus/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  updateImpLink(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateImpLink/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
 
  
  
  }
