import {cartItemT} from "../redux/types/cart";

const URL = 'api/cart.json';


export const getCartItemsApi = async (): Promise<Array<cartItemT>> => {
    return await fetch(URL).then((res) => res.json());
}