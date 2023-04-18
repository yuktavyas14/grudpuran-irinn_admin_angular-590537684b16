import { Injectable, ResolvedReflectiveFactory } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn:'root'
})
export class UserService{
  LoginUserData = new BehaviorSubject(undefined);
 constructor(private httpClient: HttpClient, private router: Router, private api: ApiService){

}

 GetLoginUserData(){
  return this.LoginUserData.asObservable();
}
SetLoginUserData(data:any){
  this.LoginUserData.next(data);

}




feedbackComplainList(): Observable<any> {
  return this.httpClient.get(this.api.apiUrl + 'admin/feedback&ComplainList').pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
getAllfeedbackNComplainList(): Observable<any> {
  return this.httpClient.get(this.api.apiUrl + 'admin/getAllfeedbackNComplainList').pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
updateFbNCpStatusById(id:any): Observable<any> {
  return this.httpClient.put(this.api.apiUrl + `admin/updateFbNCpStatusById/${id}`,{}).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
feedbackComplainById(id:any): Observable<any> {
  return this.httpClient.get(this.api.apiUrl + `admin/feedback&ComplainById/${id}`).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
getUserList(data:any): Observable<any> {
  return this.httpClient.post(this.api.apiUrl + 'admin/userList',data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}

getMemberList(): Observable<any> {
  return this.httpClient.get(this.api.apiUrl + 'admin/userMembershipList').pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
getMemberById(id:any): Observable<any> {
  return this.httpClient.get(this.api.apiUrl + `admin/userMembershipById/${id}`).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}


getUserListById(id:any): Observable<any> {
 return this.httpClient.get(this.api.apiUrl + `admin/GetUserProfileById/${id}`).pipe(map(res => {
   return res
 }),catchError(errorResponse=>{
   return throwError(()=>errorResponse)
 }) );
}

createNewUser(data:any): Observable<any> {
 return this.httpClient.post(this.api.apiUrl + `admin/addSubAdmin`,data).pipe(map(res => {
   return res
 }),catchError(errorResponse=>{
   return throwError(()=>errorResponse)
 }) );
}

adminChangePassword(data:any): Observable<any> {
 return this.httpClient.post(this.api.apiUrl + `admin/adminChangePassword`,data).pipe(map(res => {
   return res
 }),catchError(errorResponse=>{
   return throwError(()=>errorResponse)
 }) );
}
changePassword(data:any): Observable<any> {
 return this.httpClient.post(this.api.apiUrl + `auth/changePassword`,data).pipe(map(res => {
   return res
 }),catchError(errorResponse=>{
   return throwError(()=>errorResponse)
 }) );
}

userchangePassword(data:any): Observable<any> {
 return this.httpClient.post(this.api.apiUrl + `admin/userchangePassword`,data).pipe(map(res => {
   return res
 }),catchError(errorResponse=>{
   return throwError(()=>errorResponse)
 }) );
}
forgotPassword(data:any,userName:any): Observable<any> {
 return this.httpClient.post(this.api.apiUrl + `auth/forgotPassword/${userName}`,data).pipe(map(res => {
   return res
 }),catchError(errorResponse=>{
   return throwError(()=>errorResponse)
 }) );
}




updateMemberStatusById(data:any,id:any): Observable<any> {
  return this.httpClient.put(this.api.apiUrl + `admin/updateMemberStatusById/${id}`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
updateUserStatusById(data:any,id:any): Observable<any> {
  return this.httpClient.put(this.api.apiUrl + `admin/updateUserStatus/${id}`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}

updateUser(data:any,id:any): Observable<any> {
  return this.httpClient.put(this.api.apiUrl + `admin/updateSubAdmin/${id}`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}


accountverify(data:any): Observable<any> {
  return this.httpClient.post(this.api.apiUrl + `admin/accountverify`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}
verifyUserAccount(data:any,id:any): Observable<any> {
  return this.httpClient.put(this.api.apiUrl + `auth/verifyUserAccount/${id}`,data).pipe(map(res => {
    return res
  }),catchError(errorResponse=>{
    return throwError(()=>errorResponse)
  }) );
}



}

