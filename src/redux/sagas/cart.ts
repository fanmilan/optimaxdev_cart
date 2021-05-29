import { call, put, takeEvery, StrictEffect } from 'redux-saga/effects'
import {cartItemT, Constants} from "../types/cart";
import {getCartItemsApi} from "../../api/cartApi";
import {actionT, getItems, getItemsError} from "../actions/cart";

/*Generator<StrictEffect, void, Array<cartItemT>>*/

function* fetchCart()  {
    try {
        const cartItems: Array<cartItemT> = yield call(getCartItemsApi);
        yield put(getItems(cartItems));
    } catch (e) {
        yield put(getItemsError());
    }
}

export function* cartSaga() {
    yield takeEvery(Constants.GET_ITEMS_REQUEST, fetchCart);
}