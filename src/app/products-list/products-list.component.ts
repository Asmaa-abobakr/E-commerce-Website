import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import  products from '../../stores/products.json';
import {Product} from './../interfaces/products';
import { ProductService } from '../services/productData/product.service';
import { LoadingService } from '../services/loading/loading.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  // productsList: Array<Product> = products;   // json
  // constructor() { }

  loader:boolean;
  productsList :Array<Product> =[];
  private proCount:any = {};   // private variable
  counter : number = 0;
  constructor(private productService: ProductService, private LoadingService: LoadingService) { }

  ngOnInit(): void {
    this.productService.productsCountGlobal.subscribe((val) => this.proCount = val);
    this.productService.getProducts().subscribe((products:any) => {
      this.productsList = products;
    });
    this.LoadingService.loadingValueGlobal.subscribe((val)=> this.loader = val);
  }
}
