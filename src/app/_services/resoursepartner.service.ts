import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ResoursepartnerService {
  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  getResourcePartnersList(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + 'admin/getResourcePartnersList',data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  getIrinnProvideByLanguageId(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/getIrinnProvideByLanguageId`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  getIrinnProvideById(id:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/getIrinnProvideById/${id}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 getResourcePartnersById(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/getResourcePartnersById`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 addResourcePartners(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addResourcePartners`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 
  
 updateResourcePartners(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateResourcePartners`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  
  updateResourcePartnersByStatus(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateResourcePartnersByStatus`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }

  
}
