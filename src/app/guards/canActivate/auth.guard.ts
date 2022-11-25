import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({   // service 
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  islogged : boolean;
  constructor(private authService: AuthService, private router: Router){
    this.authService.isLoggedInGlobal.subscribe((val)=> this.islogged = val);
   }
   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.islogged){
        return true;
      }
      else{
        alert("You don't have access to this page!!!\nPlease Register or LogIn");  
        this.router.navigate(['']);
        return false;
      }
  }
  
}
