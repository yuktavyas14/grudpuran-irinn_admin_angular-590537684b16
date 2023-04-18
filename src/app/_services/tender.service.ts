import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class TenderService {
  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  getTenderList(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + 'admin/getTenderList',data).pipe(map(res => {
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
  getTenderByid(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/getTenderByid`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 addTender(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addTender`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 removeTenderById(id:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/removeQuickLinkById${id}`,{}).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
  
 updateTenderByStatus(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateTenderByStatus`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  updateTenderByid(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateTenderByid`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
 
  
  
  }
