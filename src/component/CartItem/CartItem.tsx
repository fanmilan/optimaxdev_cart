import './CartItem.scss';
import {cartT} from "../../redux/types/cart";
import {changeQuantity, deleteItem} from "../../redux/actions/cart";
import {QuantitySwitcher} from "../QuantitySwitcher/QuantitySwitcher";

type cartItemP = {
    item: cartT,
    deleteItem: (id: number) => void,
    changeQuantity: (id: number, quantity: number) => void
}

export const CartItem = ({item, deleteItem, changeQuantity} : cartItemP) => {
    return <div className={'cart-item'}>
        <div className="cart-item__body">
            <div className="cart-item__name">{item.name}</div>
            <div className="cart-item__price">{item.price} ₽</div>
            <div className="cart-item__actions">
                <button className="cart-item__delete-btn btn btn_small" onClick={() => deleteItem(item.id)} />
                <QuantitySwitcher quantity={item.quantity} changeQuantity={(quantity) => changeQuantity(item.id, quantity)}/>
            </div>
        </div>

    </div>
}