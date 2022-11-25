import { LoadingService } from './../services/loading/loading.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCounterService } from '../services/productCounter/product-counter.service';
import { ProductsFiltrationService } from '../services/productsFiltration/products-filtration.service';
import {ProductService} from '../services/productData/product.service';

import {Product} from './../interfaces/products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  // productDetails : Product = null;
  productDetails : any;
  loader:any;
  productsCount:any;
  counter: number = 0;
  productsArray :Array<Product> = [];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private ProductCounterService: ProductCounterService,
    private ProductsFiltrationService: ProductsFiltrationService,
    private loadingService : LoadingService
    ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    // this.productService.getProductDetails(params['id']);   // static data JSON
    this.productService.productsCountGlobal.subscribe((val) => this.productsCount = val);
    this.productService.getProductDetails(params['id']).subscribe((details: Product) => {
      this.productDetails = details;
    });
    this.ProductCounterService.proCounter.subscribe((val)=>this.counter = val);
    this.ProductsFiltrationService.cartProductsGlobal.subscribe((val)=>this.productsArray = val);
    this.loadingService.loadingValueGlobal.subscribe((val)=>this.loader = val);
  }

  addProduct(){
    this.productsCount[this.productDetails.id] -= 1;
    this.productService.setProductsCount(this.productsCount);
    console.log("in details: ", this.productsCount[this.productDetails.id]);
    this.ProductCounterService.setCounter(++this.counter);
    this.ProductsFiltrationService.setCartProducts(this.productsArray, this.productDetails);
  }

}
