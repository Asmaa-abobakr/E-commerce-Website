import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsloggedService {
  private islogged = new BehaviorSubject(false);
  isloggedPublic = this.islogged.asObservable();
  constructor() { }

  setislogged(val:boolean){
    this.islogged.next(val);
  }
}
