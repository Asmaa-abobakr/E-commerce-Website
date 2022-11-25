import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingValue = new BehaviorSubject(false);
  loadingValueGlobal = this.loadingValue.asObservable();
  constructor() { }

  showLoading(){
    this.loadingValue.next(true);
    console.log("loaging on");
  }
  
  hideLoading(){
    this.loadingValue.next(false);
    console.log("loaging off");
  }
}
