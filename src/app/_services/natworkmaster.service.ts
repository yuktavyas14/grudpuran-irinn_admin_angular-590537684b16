import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class NatworkmasterService {

  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  
   
 
  getAllNetworkMasterCompany(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/getAllNetworkMasterCompany').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  getnetworkComById(id:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/getnetworkComById/${id}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 

  getnetworkComByCity(city:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/getnetworkComByCity/${city}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 addNetworkMasterCompany(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addNetworkMasterCompany`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
  
  updateNetworkMasterByStatus(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateNetworkMasterByStatus/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }

  
  updateNetworkMasterById(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateNetworkMasterById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
 
  
  
  }