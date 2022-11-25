import { Component, OnInit } from '@angular/core';
import { ProductCounterService } from '../services/productCounter/product-counter.service';
import { ProductService } from '../services/productData/product.service';
import { ProductsFiltrationService } from '../services/productsFiltration/products-filtration.service';
import {Product} from './../interfaces/products';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // variables:
  productsArray :Array<Product> = [];
  productsQuantity: any;
  totalPrice: any = 0;
  productsCount : any;
  totalQuantity:number = 0;
  private preValue: number = 0;
  private currValue: number = 0;
  private countFlag: number = 0;
  private totalFlag : number = 0;

  constructor(
    private ProductsFiltrationService: ProductsFiltrationService,
    private ProductCounterService:ProductCounterService,
    private ProductService: ProductService
    ) { }

  ngOnInit(): void {
    // Global variables:
    this.ProductService.productsCountGlobal.subscribe((val) => this.productsCount = val);  // the array includes count of each product
    this.ProductCounterService.proCounter.subscribe((val)=> this.totalQuantity = val);     // total quantity of all selected products
    this.ProductsFiltrationService.filteredArrayGlobal.subscribe((val)=>this.productsArray = val);  // array of selected products
    this.ProductsFiltrationService.productsQuantityGlobal.subscribe((val) => this.productsQuantity = val);  // the array includes the actual quantity of each selected product
    this.ProductsFiltrationService.totalPriceGlobal.subscribe((val) => this.totalPrice = val);  // the total price of all selected products with their quantities
  }
  
  increaseQuantity(id:any){
    if(this.productsCount[id] > 0){
      this.productsCount[id]-= 1;     // when increasing the quantity, reduce the product-count
      this.ProductService.setProductsCount(this.productsCount);  // update its value
      this.ProductsFiltrationService.setProductQuantity(id, this.productsQuantity[id]+=1);  // increment the product quantity
      this.ProductCounterService.setCounter(++this.totalQuantity);   // increment the total quantity
    }
  }

  decreaseQuantity(id:any){
    if(this.productsQuantity[id] > 1 && this.totalQuantity > 1){
        this.productsCount[id]+= 1;    // when decreasing the quantity, increase the product-count
        this.ProductService.setProductsCount(this.productsCount);  // update its value
        this.ProductsFiltrationService.setProductQuantity(id, --this.productsQuantity[id]);  // decrement the product quantity
        this.ProductCounterService.setCounter(--this.totalQuantity);    // decrement the total quantity
    }
  }

  removeProduct(id: any){
    this.productsCount[id]+= this.productsQuantity[id];   // reset the product-count
    this.ProductService.setProductsCount(this.productsCount);  // update its value
    this.ProductCounterService.setCounter(this.totalQuantity - this.productsQuantity[id]);   // subtract the product quantity from the total quantity
    this.ProductsFiltrationService.removeProduct(id);   // remove this product 
  }
}
