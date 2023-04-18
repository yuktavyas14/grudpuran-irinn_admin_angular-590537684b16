import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  newsList(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/newsList').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  newsById(id:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/newsById/${id}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 getNewsBylanguageid(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/getNewsBylanguageid`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 addNews(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addNews`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 
  
 updateNewsById(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateNewsById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
 deleteNewsById(id:any): Observable<any> {
    return this.httpClient.delete(this.api.apiUrl + `admin/deleteNewsById/${id}`).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  
  updateNewsStatusById(data:any,id:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateNewsStatusById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
 
  
  
  }
