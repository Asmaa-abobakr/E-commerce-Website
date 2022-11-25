import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject(false);
  isLoggedInGlobal = this.isLoggedIn.asObservable();  // public (globla) key
  constructor() { }

  // method to set the isLoggedIn value
  setAuthService(val: boolean){
    this.isLoggedIn.next(val);
  }
}
