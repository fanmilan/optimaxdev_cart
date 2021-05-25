import {Page} from "../../component/Page/Page";
import {CartItem} from "../../component/CartItem/CartItem";
import {useDispatch, useSelector} from "react-redux";
import {changeQuantity, deleteItem} from "../../redux/actions/cart";
import {cartT} from "../../redux/types/cart";

export const CartPage = () => {
    const cart = useSelector((state: any) => state);
    const dispatch = useDispatch();


    return <Page title={'Shopping cart'}>
        <div className={'cart'}>
            <div className="cart__bar">
                <button className={'btn btn_primary'}>Add Cart Item</button>
            </div>
            <div className="cart__list">
                {
                    cart.items.map((item: cartT) => <CartItem key={item.id} item={item}
                                                                           changeQuantity={(quantity) => dispatch(changeQuantity(item.id, quantity))}
                                                                           deleteItem={() => dispatch(deleteItem(item.id))}

                                                        /> )
                }
            </div>

        </div>
    </Page>
}