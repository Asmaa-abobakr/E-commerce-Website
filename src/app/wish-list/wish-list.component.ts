import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RemoveFromWishProcess } from './../store/addProduct.action';


@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  quantity: number = 0;
  products: any;
  ReceivedFlag:any= {};
  flag: any;
  wishFlagFactor: number;
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.select('process').subscribe((res) => (this.quantity = res.quantity, this.products = res.wishProducts, this.ReceivedFlag = res.wishProductsFlag));
  }

  removeProduct(product: any){
    this.flag = JSON.parse(JSON.stringify(this.ReceivedFlag));
    this.flag[product.id] = false;
    this.wishFlagFactor = -1;
    this.store.dispatch(RemoveFromWishProcess( {quantity : this.quantity +this.wishFlagFactor , products:this.products, product:product, flag:this.flag}));

  }
}
