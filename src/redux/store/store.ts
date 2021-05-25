import {createStore} from "redux";
import {cartReducer} from "../reducers/cart";

export const store = createStore(cartReducer);