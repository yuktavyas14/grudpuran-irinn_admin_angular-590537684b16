import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../_models/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * @fileoverview AuthService is used for all user authentication related tasks.
   */

  authState = new BehaviorSubject<boolean>(false); // States that user is currently active or not.
  constructor(private httpClient: HttpClient, private router: Router, private apiService: ApiService) {
    const user = new User;
    if (user.isLoggedIn() && user.getData()) {
      this.authState.next(true);
    } else {
      this.authState.next(false);
      // this.router.navigate(['/']);
      sessionStorage.clear();
    }
  }

  /**
   * @param data takes username and password and sets the user token.
   */
  login1(data: any): Observable<User> {
    return this.apiService.post('/api/v1/user/login', data);
  }
  login(data: any): Observable<any> {
    return this.httpClient.post(this.apiService.apiUrl + 'auth/loginUser', data).pipe(map(res => {
      return res
    }), catchError(errorResponse => {
      return throwError(() => errorResponse)
    }));
  }
  /**
   * @param data as username, name mobile  and password  required and referal_code is optional.
   */

  register(data: any): Observable<any> {
    return this.httpClient.post(this.apiService.apiUrl + '/api/v1/user/register', data).pipe(map(res => {
      return res
    }), catchError(errorResponse => {
      return throwError(() => errorResponse)
    }));
  }

  sendotp(data: any): Observable<any> {
    return this.httpClient.post(this.apiService.apiUrl + '/api/v1/user/send-otp', data).pipe(map(res => {
      return res
    }), catchError(errorResponse => {
      return throwError(() => errorResponse)
    }));
  }
  verifyotp(data: any): Observable<any> {
    return this.httpClient.post(this.apiService.apiUrl + '/api/v1/user/verify-otp', data).pipe(map(res => {
      return res
    }), catchError(errorResponse => {
      return throwError(() => errorResponse)
    }));
  }
  forgotPassword(data: any): Observable<any> {
    return this.httpClient.post(this.apiService.apiUrl + '/api/v1/user/forgot-password', data).pipe(map(res => {
      return res
    }), catchError(errorResponse => {
      return throwError(() => errorResponse)
    }));
  }
  verifyUserName(data: any): Observable<any> {
    return this.httpClient.post(this.apiService.apiUrl + '/api/v1/user/verify-username', { user_name: data.user_name }).pipe(map(res => {
      return res
    }), catchError(errorResponse => {
      return throwError(() => errorResponse)
    }));
  }


  verifyLoginOtp(data: any): Observable<User> {
    return this.apiService.post('/api/telegram/verifyLoginOtp', data);
  }
  resendLoginOtp(data: any): Observable<User> {
    return this.apiService.post('/api/telegram/resendLoginOtp', data);
  }
  /**
  * logouts the user from the browser and deletes the user-details required by the application for state-management.
  * @param logoutObj (required) takes user_id and token as params.
  */
  logout(logoutObj: any): Observable<any> {
    this.authState.next(false);
    return this.apiService.post('/api/user/logout', logoutObj);
  }



  /* Returns true if user is logged in */
  get isLoggedIn() {
    return this.authState.asObservable();
  }

  /**
   * return string token and set into headers.
   */
  get tokenHeader() {
    return new User().getToken();
  }
}
