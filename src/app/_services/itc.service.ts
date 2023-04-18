import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ITCService {
  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  iTCList(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/iTCList').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  iTCById(id:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/iTCById/${id}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 addITC(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addITC`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 
  
 updateITCById(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateITCById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
 deleteITCById(id:any): Observable<any> {
    return this.httpClient.delete(this.api.apiUrl + `admin/deleteITCById/${id}`).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  
  updateITCStatusById(data:any,id:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateITCStatusById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
 
  
  
  }
