import './CartItem.scss';
import {cartT} from "../../redux/types/cart";
import {QuantitySwitcher} from "../QuantitySwitcher/QuantitySwitcher";

type cartItemP = {
    item: cartT,
    deleteItem: () => void,
    changeQuantity: (quantity: number) => void
}

export const CartItem = ({item, deleteItem, changeQuantity} : cartItemP) => {
    return <div className={'cart-item'}>
        <div className="cart-item__body">
            <div className="cart-item__name">{item.name}</div>
            <div className="cart-item__price">{item.price} ₽</div>
            <div className="cart-item__actions">
                <button className="cart-item__delete-btn btn btn_small" onClick={deleteItem} />
                <QuantitySwitcher quantity={item.quantity} changeQuantity={(quantity) => changeQuantity(quantity)}/>
            </div>
        </div>

    </div>
}