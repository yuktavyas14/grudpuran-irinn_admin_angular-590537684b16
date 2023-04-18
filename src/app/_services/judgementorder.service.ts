import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class JudgementorderService {
 
 constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){

}

 

getAllJudgeOrders(): Observable<any> {
  return this.httpClient.get(this.api.apiUrl + 'admin/getAllJudgeOrders').pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
updateJudgementOrdersByStatus(data:any,id:any): Observable<any> {
  return this.httpClient.put(this.api.apiUrl + `admin/updateJudgementOrdersByStatus/${id}`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
updateJudgementOrders(data:any,id:any): Observable<any> {
  return this.httpClient.put(this.api.apiUrl + `admin/updateJudgementOrders/${id}`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}

remove_judgement_order(id:any): Observable<any> {
  return this.httpClient.post(this.api.apiUrl + `admin/remove_judgement_order/${id}`,{}).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}

getAllJudgeOrdersByid(id:any): Observable<any> {
  return this.httpClient.get(this.api.apiUrl + `admin/getAllJudgeOrdersByid/${id}`).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}

addJudgementOrders(data:any): Observable<any> {
  return this.httpClient.post(this.api.apiUrl + `admin/addJudgementOrders`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}


}