import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class VideoGalleryService {
  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){

  }



  getVideoList(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + 'admin/videoGalleryList',data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  getVideoById(id:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/videoGalleryById/${id}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }


 addGallaryVideo(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addVideo`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }


 removeContactUsById(id:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/deleteVideoGalleryById${id}`,{}).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }


  updateVideoByStatus(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateVideoGalleryStatusById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }

  updateVideoById(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updateVideoGalleryById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }



  }
