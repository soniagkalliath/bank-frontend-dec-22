import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

   constructor(private authservice:AuthService,private router:Router){}

  canActivate:CanActivateFn=()=> {

      if(this.authservice.isLoggedIn()){
        return true
      }
      else{
        alert("Your not loggedin")
        this.router.navigateByUrl("")
        return false;
      }
  }
  
}
