import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class OtherActivityService {


  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){

  }
  
   
  
  get_all_activities(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/get_all_activities').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  updateActivitiesByStatus(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateActivitiesByStatus/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }

  
  updateActivitiesById(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateActivitiesById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  removeActivitiesById(id:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/removeActivitiesById/${id}`,{}).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  findActivitiesById(id:any): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + `admin/findActivitiesById/${id}`).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  addOtherActivity(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/addOtherActivity`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  
  }
  