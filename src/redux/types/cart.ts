export type cartT = {
    id: number,
    name: string,
    price: number,
    quantity: number
}

export type cartStateT = {
    isLoading: boolean,
    items: Array<cartT>
}

export enum Constants  {
    GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST',
    GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS',
    GET_ITEMS_ERROR = 'GET_ITEMS_ERROR',
    DELETE_ITEM= 'DELETE_ITEM',
    CHANGE_QUANTITY = 'CHANGE_QUANTITY',
}