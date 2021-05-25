import {Constants} from "../types/cart";

export const deleteItem = (id: number) => ({type: Constants.DELETE_ITEM, payload:id});
export const changeQuantity = (id: number, quantity: number) => ({type: Constants.CHANGE_QUANTITY, payload:{id, quantity}});