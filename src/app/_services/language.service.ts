import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  getLanguageList(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/getLanguageList').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  getLanguageById(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/getLanguageById`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 addLanguage(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addLanguage`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 
  
 updateLanguageById(data:any,id:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateLanguageById`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  updateLanguageIsDefault(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateLanguageIsDefault`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  
  updateLanguageByStatus(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateLanguageByStatus`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
 


  
  }
