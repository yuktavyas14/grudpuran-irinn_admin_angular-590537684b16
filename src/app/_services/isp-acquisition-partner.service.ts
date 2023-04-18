import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class IspAcquisitionPartnerService {
  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  
   
  
  getIspAquisitionPartner(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/getIspAquisitionPartner').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  getIspAquisitionPartnerById(id:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/getIspAquisitionPartnerById/${id}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
  removeIspAquisitionPartnerById(id:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/removeIspAquisitionPartnerById/${id}`,{}).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 addIspPartners(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addIspPartners`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
  
  updateIspAquisitionPartnerByStatus(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateIspAquisitionPartnerByStatus/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  updateIspAquisitionPartnerById(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateIspAquisitionPartnerById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
 
  
  
  }