import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsFiltrationService {
    // shared variables:
  private cartProducts = new BehaviorSubject([]);  // all selected products
  cartProductsGlobal = this.cartProducts.asObservable();  // global

  private filteredArray = new BehaviorSubject([]);  // filter the selected products to remove the duplicated products
  filteredArrayGlobal = this.filteredArray.asObservable();  // global

  private productsQuantity = new BehaviorSubject({});   // quantity of each product in the cart
  productsQuantityGlobal = this.productsQuantity.asObservable();  // global

  private totalPrice = new BehaviorSubject(0);     // total price of all products in the cart
  totalPriceGlobal = this.totalPrice.asObservable();   // global
  // private variables:
  private allProducts: any;
  private filtered: any = [];
  private quntity: any = {};
  private productsIDs: string[] = [];
  private checkID = false;
  private tprice = 0;
  private indexProduct = 0;
  private indexProInAll = 0;
  constructor() { }
  // ----------------------- PRIVATE METHODS-----------------------//
  // private method to filter the selected products
  // remove the duplicated objects (products)
  private getFilteredProducts(productsArray:any){
    this.filtered = [];
    this.productsIDs = [];
    this.filtered = productsArray.filter((product: Product) =>{
        this.checkID = this.productsIDs.includes(product.id);
        if(!this.checkID){
          this.productsIDs.push(product.id);
          return true;
        }
        else{
          return false;
        }
    })
    this.filteredArray.next(this.filtered); // update the filtered value
  }
  // private method to get the quantity of each product in cart
  private getProductQuantity(obj: Product){
    if(this.quntity.hasOwnProperty(obj.id)){
      this.quntity[obj.id] +=1;
    }
    else{
      this.quntity[obj.id] = 1;
    }
    this.productsQuantity.next(this.quntity);
  }
  // private method to get the total price of all products in the cart
  private getTotalPrice(){
    this.tprice = 0;
    for(let i =0; i < this.filtered.length; i++){
      this.tprice+= (this.filtered[i].price * this.quntity[this.filtered[i].id])
    }
    this.totalPrice.next(this.tprice);  // update the price value
  }

  // ----------------------- PUBLIC METHODS-----------------------//
  setCartProducts(productsArray:any, obj: Product){
      productsArray.push(obj);
      this.allProducts = productsArray;
      this.cartProducts.next(this.allProducts);
      // filter the selected products: remove the duplicated products:
      this.getFilteredProducts(productsArray);
      // get the quantity of each product in cart:
      this.getProductQuantity(obj);
      // calculate the total price of selected products:
      this.getTotalPrice();
      console.log("before removing: ",  this.allProducts);
  }

  removeProduct(id: any){
    // remove this product from the container of selected products
    this.indexProInAll = 0;
    this.cartProductsGlobal.subscribe((val) => this.allProducts);
    while( this.indexProInAll !== -1){
      this.indexProInAll = this.allProducts.findIndex((obj: Product) =>{
        return obj.id === id;
      })
      if(this.indexProInAll !== -1){
        this.allProducts.splice(this.indexProInAll,1);
      }
    }
    this.cartProducts.next(this.allProducts); 
    // remove this product from the filtered products
    this.indexProduct = this.filtered.findIndex((obj: Product) =>{
      return obj.id === id;
    })
    this.filtered.splice(this.indexProduct, 1);
    this.filteredArray.next(this.filtered);
    // reset its quantity:
    this.setProductQuantity(id, 0);
  }

  setProductQuantity(id:any, val:number){
    this.quntity[id]= val;
    this.productsQuantity.next(this.quntity);
    this.getTotalPrice();
  }
}
