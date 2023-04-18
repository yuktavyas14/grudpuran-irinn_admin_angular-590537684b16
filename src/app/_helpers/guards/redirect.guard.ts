import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';

@Injectable()
 
export class RedirectGuard implements CanActivate {

  constructor(private auth: AuthService, private myRoute: Router) {
  }
  user:any;
  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.user = new User();
    if (this.user.isLoggedIn() && (this.user.getData())) {
      this.myRoute.navigate(['/dashboard']);
      return true;
    } else {
       
      return true;
    }
  }
}
