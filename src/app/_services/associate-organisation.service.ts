import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AssociateOrganisationService {

  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  
  
    getheader(): Observable<any> {
      return this.httpClient.get(this.api.apiUrl + 'admin/getheader').pipe(map(res => {
        return res
      }),catchError(errorResponse=>{
        return throwError(()=>errorResponse)
      }) );
    }
    getheaderById(id:any): Observable<any> {
     return this.httpClient.get(this.api.apiUrl + `admin/getheaderById/${id}`).pipe(map(res => {
       return res
     }),catchError(errorResponse=>{
       return throwError(()=>errorResponse)
     }) );
   }
   
   addAssociateOrganisationDetails(data:any): Observable<any> {
     return this.httpClient.post(this.api.apiUrl + `admin/addAssociateOrganisationDetails`,data).pipe(map(res => {
       return res
     }),catchError(errorResponse=>{
       return throwError(()=>errorResponse)
     }) );
   }
   
    
    updateHeaderMenuBystatus(data:any,id:any): Observable<any> {
      return this.httpClient.put(this.api.apiUrl + `admin/updateHeaderMenuBystatus/${id}`,data).pipe(map(res => {
        return res
      }),catchError(errorResponse=>{
        return throwError(()=>errorResponse)
      }) );
    }
    updateHeaderMenuById(data:any,id:any): Observable<any> {
      return this.httpClient.put(this.api.apiUrl + `admin/updateHeaderMenuById/${id}`,data).pipe(map(res => {
        return res
      }),catchError(errorResponse=>{
        return throwError(()=>errorResponse)
      }) );
    }
  
}
