import {render, cleanup, fireEvent} from '@testing-library/react';
import {Form} from "./Form";
import userEvent from "@testing-library/user-event";

describe('form test', () => {


    let props;
    beforeEach(() => {
        props = {
            addItem: jest.fn(),
        };
    });

    afterEach(cleanup);

    it('should be mount', () => {
        const { getByTestId } = render(<Form {...props} />);
        expect(getByTestId('form')).toBeInTheDocument();
    })



    it('test validate fields', () => {
        const { getByTestId, getByText, queryAllByText, queryByText } = render(<Form {...props} />);

        const inputName = getByTestId('input-name');
        const inputPrice = getByTestId('input-price');

        const button = getByText('Создать');

        expect(inputName).toHaveValue('');
        expect(inputPrice).toHaveValue(null);
        fireEvent.click(button);

        //Should be 2 field required errors
        expect(queryAllByText('This field is required').length).toBe(2);

        fireEvent.change(inputName, { target: { value: 'Name new item' } });
        fireEvent.click(button);

        //Should be 1 field required error
        expect(queryAllByText('This field is required').length).toBe(1);

        fireEvent.change(inputPrice, { target: { value: 0 } });
        fireEvent.click(button);

        //Should be error min value
        expect(queryByText('This field should be more then 0')).toBeInTheDocument();

        fireEvent.change(inputPrice, { target: { value: 10.5 } });
        fireEvent.click(button);


        //Shouldn't be error
        expect(queryByText('This field is required')).not.toBeInTheDocument();
        expect(props.addItem).toBeCalledTimes(1);
        expect(inputName).toHaveValue('Name new item');
        expect(inputPrice).toHaveValue(10.5);
    });

});