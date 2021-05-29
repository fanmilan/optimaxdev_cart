import './Form.scss';

import {Field} from "../Field/Field";
import {useState} from "react";
import {newCartItemT} from "../../redux/types/cart";

type formT = {
    name: string,
    price: number | string,
    quantity: number
}

type errorT = {
    [key in keyof formT]?: string
}

type formP = {
    addItem: (cartItem: newCartItemT) => void
}

export const Form = ({addItem}: formP) => {

    const initialFormState = {
        name: '',
        price: '',
        quantity: 1
    }

    const [form, setForm] = useState<formT>(initialFormState);
    const [error, setError] = useState<errorT>({});


    /**
     * validation input
     * @param name: string - name of field
     * @param value: string - value of field
     *
     * @return string or false - message of error, or false
     */
    const getValidationError = (name: string, value: string | number) => {
        if (String(value).trim().length === 0) return 'This field is required';
        switch (name) {
            case 'quantity':
                if (value < 1) return 'This field should be more then 1';
                break;
            case 'price':
                if (value <= 0) return 'This field should be more then 0';
                break;
        }
        return false;
    }

    const validateForm = (form: formT) => {
        const errorResult: errorT = {};
        let key: keyof formT;
        for (key in form) {
            let validationError = getValidationError(key, form[key]);
            if (validationError !== false) errorResult[key] = validationError;
        }
        return errorResult;
    }


    /**
     * Handle input
     * @param e
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }


    /**
     * Submit form
     * Validate all fields
     * If ok - add Cart Item, else Show Field Error
     *
     */
    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const errorResult = validateForm(form);
        setError(errorResult);

        if (Object.keys(errorResult).length === 0) {
            addItem({
                name: form.name,
                price: Number(form.price),
                quantity: Math.floor(form.quantity)
            });
        }
    }

    return <div className={'new-item-form'} data-testid="form">
        <h2 className="new-item-form__title">Add New Cart Item</h2>
        <form onSubmit={onSubmit} noValidate>
            <Field label={'Name'} error={error?.name}>
                <input className={'input'}
                       type={'text'}
                       name={'name'}
                       onChange={handleInputChange}
                       value={form.name}
                       data-testid={'input-name'}
                       required/>
            </Field>
            <Field label={'Price'} error={error?.price}>
                <input className='input'
                       type={'number'}
                       name={'price'}
                       onChange={handleInputChange}
                       value={form.price}
                       data-testid={'input-price'}
                       min={0.01}
                       step={0.01}
                       required/>
            </Field>
            <Field label={'Quantity'} error={error?.quantity}>
                <input className='input'
                       type={'number'}
                       name={'quantity'}
                       onChange={handleInputChange}
                       value={form.quantity}
                       min={1}
                       required
                />
            </Field>
            <div className="new-item-form__btns">
                <button className={'btn btn_primary'}>Создать</button>
            </div>
        </form>
    </div>
}