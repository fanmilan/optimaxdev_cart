import './QuantitySwitcher.scss';

type quantitySwitcherP = {
    quantity: number,
    changeQuantity: (quantity: number) => void
}

export const QuantitySwitcher = ({quantity, changeQuantity} : quantitySwitcherP) => {
    return <div className={'quantity-switcher'}>
        <div className="quantity-switcher__btn" onClick={() => changeQuantity(quantity-1)}>-</div>
        <div className="quantity-switcher__current">{quantity}</div>
        <div className="quantity-switcher__btn" onClick={() => changeQuantity(quantity+1)}>+</div>
    </div>
}