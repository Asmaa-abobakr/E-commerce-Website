import { createAction, props } from '@ngrx/store';
import { Product } from '../interfaces/products';

export const addToWishProcess = createAction(
    '[Wish List] addToWishProcess process',
    props<{quantity: number, products:Array<any>, product:Product, flag:any}>()
);

export const RemoveFromWishProcess = createAction(
    '[Wish List] RemoveFromWishProcess process',
    props<{quantity: number, products:Array<any>, product:Product, flag:any}>()
);