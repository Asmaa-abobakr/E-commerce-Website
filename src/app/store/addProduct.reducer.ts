import { createReducer, on } from "@ngrx/store";
import { Product } from "../interfaces/products";
import { addToWishProcess, RemoveFromWishProcess } from "./addProduct.action";


interface AddProductState {
    quantity: number;
    wishProducts: Array<any>;
    wishProduct: Product,
    wishProductsFlag: any
}

const initialState: AddProductState = {
    quantity: 0,
    wishProducts: [],
    wishProduct: null,
    wishProductsFlag: {}
}

export const addProductReducer = createReducer(
    initialState,
    on(addToWishProcess, (state: any, action: any): any=> {
        // ckeck if the selected product already exists or not:
        let flag = false;
        for(let i=0; i< state.wishProducts.length; i++){
            if(state.wishProducts[i].id === action.product.id){
                flag = true;
                break;
            }
        }
        if(flag === true){
            return {     // exist
                quantity: action.quantity,
                wishProducts: [...state.wishProducts],
                wishProductsFlag: action.flag
            }
        }
        else{
            return {     // add the new product
                quantity: action.quantity,
                wishProducts: [...state.wishProducts,action.product],
                wishProductsFlag: action.flag
            }
        }
    }),
    on(RemoveFromWishProcess, (state, action)=> {
        let filtered = action.products.filter((e:any, i:number)=>{
            return !(e.id == action.product.id)
        });
        return {     // remove product
            ...state,
            quantity: action.quantity,
            wishProducts: [...filtered],
            wishProductsFlag: action.flag
        }
    })
);

