import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){

  }
  
   
  
  get_gallary_details(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/photoGalleryList').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  photoGalleryList(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + 'admin/photoGalleryList',data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  updateGallaryByStatus(data:any,id:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updatePhotoGalleryStatusById`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  update_gallaryById(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/updatePhotoGalleryById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  removeGallarryById(id:any): Observable<any> {
    return this.httpClient.delete(this.api.apiUrl + `admin/deletePhotoGalleryById/${id}`,{}).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  get_gallary_byId(id:any): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + `admin/photoGalleryById/${id}`).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  addGallaryImage(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/addPhoto`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  
  }
  