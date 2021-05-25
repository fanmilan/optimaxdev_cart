import {cartStateT, Constants} from "../types/cart";

const initialState = {
    isLoading: false,
    items: [{
        id: 1,
        name: 'Hello',
        price: 1000,
        quantity: 1
    },
        {
            id: 2,
            name: 'Glasses',
            price: 2000,
            quantity: 3
        }]
}

export const cartReducer = (state: cartStateT = initialState, action: any) => {
    switch (action.type) {
        case Constants.CHANGE_QUANTITY:
            return {
                ...state,
                items: state.items.map((item => {
                    if (item.id === action.payload.id) {
                        item.quantity = action.payload.quantity
                    }
                    return item;
                }))
            }
        case Constants.DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter((item => item.id !== action.payload))
            }
        default:
            return state;
    }
}