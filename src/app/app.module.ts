import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
// import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';



import { AppComponent } from './app.component';
// import { NavbarComponent } from './navbar/navbar.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { RequestInterceptor } from './interceptors/request/request.interceptor';
import { LoadingComponent } from './loading/loading.component';
import { LoadingAPIInterceptor } from './interceptors/loading/loading-api.interceptor';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UnsaveGuard } from './guards/canDeactivate/unsave.guard';
import { WishListComponent } from './wish-list/wish-list.component';
import {addProductReducer} from './store/addProduct.reducer' 



registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductCardComponent,
    NotFoundComponent,
    CartComponent,
    ProductDetailsComponent,
    LoadingComponent,
    WishListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    AuthModule,
    SharedModule,
    NgxBootstrapIconsModule.pick(allIcons),
    StoreModule.forRoot({
      process: addProductReducer
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingAPIInterceptor,
      multi: true
    },
    UnsaveGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
