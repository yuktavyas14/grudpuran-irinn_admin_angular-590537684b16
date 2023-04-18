import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LatestUpdateService {

  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){

  }
  
  
  getAllLatestUpdate(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/getAllLatestUpdate').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  updateLatestUpdateByStatus(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateLatestUpdateByStatus/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  updateLatestUpdateById(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateLatestUpdateById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  removeLatestUpdate(id:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/removeLatestUpdate/${id}`,{}).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  
  getLatestUpdateById(id:any): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + `admin/getLatestUpdateById/${id}`).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  addLatestUpdate(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/addLatestUpdate`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  
  }