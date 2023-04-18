import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, catchError, throwError } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class VacaniciesService {

  constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){
 
  }
  
   
  
  get_all_vacancies(): Observable<any> {
    return this.httpClient.get(this.api.apiUrl + 'admin/get_all_vacancies').pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
  
  get_all_vacancies_by_id(id:any): Observable<any> {
   return this.httpClient.get(this.api.apiUrl + `admin/get_all_vacancies_by_id/${id}`).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
 
 addVaccancies(data:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/addVaccancies`,data).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }

 
 remove_vacancies_by_id(id:any): Observable<any> {
   return this.httpClient.post(this.api.apiUrl + `admin/remove_vacancies_by_id${id}`,{}).pipe(map(res => {
     return res
   }),catchError(errorResponse=>{
     return throwError(()=>errorResponse)
   }) );
 }
  
  update_vacancies_by_id(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/update_vacancies_by_id/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }

  
  update_vacancies_by_status(data:any,id:any): Observable<any> {
    return this.httpClient.put(this.api.apiUrl + `admin/update_vacancies_by_status/${id}`,data).pipe(map(res => {
      return res
    }),catchError(errorResponse=>{
      return throwError(()=>errorResponse)
    }) );
  }
 
  
  
  }