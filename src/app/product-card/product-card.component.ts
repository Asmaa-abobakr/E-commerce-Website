import { ProductCounterService } from '../services/productCounter/product-counter.service';
import { ProductsFiltrationService } from '../services/productsFiltration/products-filtration.service';
import { Component, Input, OnInit } from '@angular/core';
import {Product} from './../interfaces/products';
import { ProductService } from '../services/productData/product.service';
import { Store } from '@ngrx/store';
import { addToWishProcess, RemoveFromWishProcess } from './../store/addProduct.action';
import { Flag } from './../interfaces/flag';
import { AuthService } from './../services/auth/auth.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() cardProduct: any;
  productsCount:any;
  counter : number = 0;
  productsQuantity:any;
  productsArray :Array<Product> = [];
  wishAQuantity: number;
  wishFlagFactor: number;
  wishProducts:Array<any> = [];
  wishProduct : Product;
  wishFlag:Flag ={};
  islogged:boolean;
  constructor(
    private ProductCounterService: ProductCounterService,
    private ProductsFiltrationService: ProductsFiltrationService,
    private ProductService: ProductService,
    private AuthService: AuthService,
    private store: Store<any>
    ) { }

  ngOnInit(): void {
    this.ProductService.productsCountGlobal.subscribe((val) => this.productsCount = val);
    this.ProductCounterService.proCounter.subscribe((val)=>this.counter = val);
    this.ProductsFiltrationService.cartProductsGlobal.subscribe((val)=>this.productsArray = val);
    this.ProductsFiltrationService.productsQuantityGlobal.subscribe((val) => this.productsQuantity = val);
    this.AuthService.isLoggedInGlobal.subscribe((val)=> this.islogged = val);
    this.store.select('process').subscribe((res) => (this.wishAQuantity = res.quantity, 
      this.wishProducts = res.wishProducts,
      this.wishFlag =JSON.parse(JSON.stringify(res.wishProductsFlag))
      ));
      if(!this.wishFlag.hasOwnProperty(this.cardProduct.id)){
        this.wishFlag[this.cardProduct.id] = false;
      }
  }

  addProduct(){
    if(this.islogged){
      this.productsCount[this.cardProduct.id]-= 1;
      this.ProductService.setProductsCount(this.productsCount);
      this.ProductCounterService.setCounter(++this.counter);
      this.ProductsFiltrationService.setCartProducts(this.productsArray, this.cardProduct);
    }
    else{
      alert("You don't have access to this page!!!\nPlease Register or LogIn");  
    }
  }

  updateWishList(id: any){
    if(this.islogged){
      if(this.wishFlag[id]){    // remove new item
        this.wishFlag[id] = false;
        this.wishFlagFactor = -1;
        this.store.dispatch(RemoveFromWishProcess( {quantity : this.wishAQuantity +this.wishFlagFactor , products:this.wishProducts, product:this.cardProduct, flag:this.wishFlag}));
      }
      else{                     // add new item
        this.wishFlag[id] = true;
        this.wishFlagFactor = 1;
        this.store.dispatch(addToWishProcess( {quantity : this.wishAQuantity +this.wishFlagFactor , products:this.wishProducts, product:this.cardProduct, flag:this.wishFlag}));
      }
    }
    else{
      alert("You don't have access to this page!!!\nPlease Register or LogIn");  
    }
  }
}
