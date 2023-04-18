import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class IspService {
  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  
   
  
  getAllIspMember(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/getAllIspMember').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  getIspMemberById(id:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/getIspMemberById/${id}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 addIspMember(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addIspMember`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 removeIspMemberById(id:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/removeIspMemberById${id}`,{}).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
  
  updateIspMemberBystatus(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateIspMemberBystatus/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  updateIspMemberById(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateIspMemberById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
 
  
  
  }