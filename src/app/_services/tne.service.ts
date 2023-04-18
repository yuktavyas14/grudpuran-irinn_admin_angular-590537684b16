import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class TneService {
  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  tNEList(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/tNEList').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  tNEById(id:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/tNEById/${id}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 addTNE(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addTNE`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 
  
 updateTNEById(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateTNEById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
 deleteTNEById(id:any): Observable<any> {
    return this.httpClient.delete(this.api.apiUrl + `admin/deleteTNEById/${id}`).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  
  updateTNEStatusById(data:any,id:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateTNEStatusById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
 
  
  
  }
