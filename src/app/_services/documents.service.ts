import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){

  }
  
   
  
  getAllDocuments(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/getAllDocuments').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  updateDocumentsByStatus(data:any,id:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateDocumentsByStatus/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  updateDocuments(data:any,id:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/updateDocuments/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  removeDocumentsById(data:any,id:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/removeDocumentsById/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  getDocumentsById(id:any): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + `admin/getDocumentsById/${id}`).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  addDocuments(data:any): Observable<any> {
    return this.httpClient.post(this.api.apiUrl + `admin/addDocuments`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  
  }