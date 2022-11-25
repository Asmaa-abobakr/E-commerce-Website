import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductCounterService {
 private counter = new BehaviorSubject(0); 
 proCounter = this.counter.asObservable();  // global variable of total quantity

 
  constructor() { }

  setCounter(val : number){
    this.counter.next(val);
  }
}
