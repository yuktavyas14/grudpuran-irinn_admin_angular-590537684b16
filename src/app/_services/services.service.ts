import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  
   
  
  getAllServicess(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/allServicess').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  get_servicess_id(id:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/serviceDTLListById/${id}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 getServiceBylanguageid(id:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/getServiceBylanguageid`,id).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 addServiceDTL(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addServiceDTL`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
  
  updateServiceByStatus(data:any,id:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateServiceByStatus`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  updateService(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateServiceDTLById`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
 
  
  
  }