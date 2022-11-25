import { Injectable } from '@angular/core';
// import products from '../stores/products.json';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../interfaces/products';
import { BehaviorSubject } from 'rxjs';

let flag = false;  // flag of products-count

@Injectable({
  providedIn: 'root'
})


export class ProductService {
   // shared variables:
  private productsCount = new BehaviorSubject({});  
  productsCountGlobal = this.productsCount.asObservable();  // global
  // private variables:
  private httpProducts: any;
  private ProductsArray:any;
  private productsCountobj:any = {};
  constructor(private http: HttpClient) { }
  
  // use it in product-list-component.ts
  getProducts(){
    this.httpProducts = this.http.get<Product[]>('https://60523dc8fb49dc00175b7d04.mockapi.io/api/v1/products');
    this.httpProducts.subscribe((obj:any)=> {
      this.ProductsArray = obj;
      // to get the count of each product before 
      // any processing because this is a fake API 
      // and couldn't update the data inside it
      if(flag == false){   
        for(let i=0; i<this.ProductsArray.length; i++){
          this.productsCountobj[this.ProductsArray[i].id] = this.ProductsArray[i].count;
        }
        this.productsCount.next(this.productsCountobj);
        flag = true;
      }
   });
    return this.httpProducts;
  }
   // use it in product-details-component.ts
  getProductDetails(id:string){
    // way 1 using static data from json file:
    // console.log(products);
    // const product = products.filter((pro)=> pro.id == id);
    // return product;

    // way 2 using api:
    return this.http.get<Product>(`https://60523dc8fb49dc00175b7d04.mockapi.io/api/v1/products/${id}`);
  }
  // update the product count 
  setProductsCount(val:any){
    if(val >= 0){
      this.productsCount.next(val);
    }
  }
}


