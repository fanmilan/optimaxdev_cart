import {cartT} from "../redux/types/cart";

const URL = 'api/cart.json';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)) ;

export const getCartItemsApi = async (): Promise<Array<cartT>> => {
    await delay(1000);
    return await fetch(URL).then((res) => res.json());
}