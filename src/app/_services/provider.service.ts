import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  getIrinnProvideList(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/getIrinnProvideList').pipe(map(res => {
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
  getIrinnProvideByIdAndLanguageId(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/getIrinnProvideByIdAndLanguageId`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 addIrinnProvide(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addIrinnProvide`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 
  
 updateIrinnProvideById(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateIrinnProvideById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  
  updateIrinnProvideByStatus(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateIrinnProvideByStatus/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }

  
 
  
  
  }
