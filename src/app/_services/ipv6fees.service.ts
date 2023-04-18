import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class Ipv6feesService {

  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService) { }
  
  getFeeCalculatorList(id:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/getFeeCalculatorList`,id).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 getFeeCalculatorById(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/getFeeCalculatorById`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 addFeeCalculator(data:any): Observable<any> {
  return this.httpClient.post(this.api.apiUrl + `admin/addFeeCalculator`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
updateFeeCalculator(data:any): Observable<any> {
  return this.httpClient.post(this.api.apiUrl + `admin/updateFeeCalculator`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
getSearchList(data: any):Observable<any>{
  return this.httpClient.post(this.api.apiUrl + `admin/searchIpBlock`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );

}
}
