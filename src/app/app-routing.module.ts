import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './guards/canActivate/auth.guard';
import { LoadingComponent } from './loading/loading.component';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsListComponent } from './products-list/products-list.component';
import {RegisterComponent} from './auth/register/register.component'
import { UnsaveGuard } from './guards/canDeactivate/unsave.guard';

const routes: Routes = [
  {
    path: "",
    component: ProductsListComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
    canDeactivate: [UnsaveGuard]
  },
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "product-details/:id",
    component: ProductDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
