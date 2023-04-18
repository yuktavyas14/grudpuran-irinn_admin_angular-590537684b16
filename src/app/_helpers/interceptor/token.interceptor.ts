import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { UtilitydesignService } from 'src/app/_services/utilitydesign.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService, private _uService:UtilitydesignService,private toastr: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.tokenHeader}`
      }
    });

    return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
  }
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    // handle your auth error or rethrow
    if (err.status === 401) {
      // navigate /delete cookies or whatever
      this._uService.isLoading= false;
      console.log(err.error.error);
      console.log(err.error);
      
      this.toastr.error(err.error.error || err.error.message);
      // condition to check Whether Admin is logged in or user.

      // localStorage.clear();
      localStorage.removeItem('adminUser')
      localStorage.removeItem('tokenAdmin')
      localStorage.removeItem('logedIn')
      this.authService.authState.next(false);
      // location.reload();

     this.router.navigate(['/']);
      /* if you've caught / handled the error, you don't want to rethrow it unless you also want
      downstream consumers to have to handle it as well. */

      return of(err.message); // or EMPTY may be appropriate here
    }
  else if(err){
      this._uService.isLoading= false;
    }
    return throwError(err);
  }
}
