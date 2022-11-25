import { Component, OnInit } from '@angular/core';
import { ProductCounterService } from '../../services/productCounter/product-counter.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  counter : number = 0;
  constructor(private ProductCounterService: ProductCounterService) { }

  ngOnInit(): void {
    this.ProductCounterService.proCounter.subscribe((val)=>this.counter = val);
  }

}
