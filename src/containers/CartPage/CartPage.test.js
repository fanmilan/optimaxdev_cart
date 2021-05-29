import {CartPage} from "./CartPage";
import {act, fireEvent, getByText, render, screen, waitFor} from '@testing-library/react';
import {unmountComponentAtNode} from "react-dom";
import {store} from "../../redux/store/store";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {rootReducer} from "../../redux/reducers";


function renderRedux(
    ui,
    {
        initialState,
        store = createStore(rootReducer, initialState),
        ...renderOptions
    } = {}
) {
    function Wrapper({children}) {
        return <Provider store={store}>{children}</Provider>
    }

    return render(ui, {wrapper: Wrapper, ...renderOptions})
}


describe('CartPage test', () => {

    const ReduxWrapper = ({children}) => (
        <Provider store={store}>
            {children}
        </Provider>
    );

    jest.mock("../../api/cartApi");

    it('should display a loading text', () => {
        const {queryByTestId} = render(<ReduxWrapper><CartPage/></ReduxWrapper>);
        expect(queryByTestId('cart')).not.toBeInTheDocument();
        expect(queryByTestId('loading')).toBeInTheDocument();
    });


    it('render cart item data', async () => {

        const fakeCartItem = [{
            "id": 1,
            "name": "Hello",
            "price": 1000,
            "quantity": 1
        },
            {
                "id": 2,
                "name": "Glasses",
                "price": 42,
                "quantity": 1
            }];

        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeCartItem)
            })
        );

        const {findByTestId, getAllByTestId, queryByTestId} = render(<ReduxWrapper><CartPage/></ReduxWrapper>);

        await findByTestId('cart');

        /* await act(async () => {
               render(<ReduxWrapper><CartPage /></ReduxWrapper>);
           });*/

        expect(fetch).toHaveBeenCalledTimes(1);

        const cartItems = getAllByTestId('cart-item');

        expect(cartItems.length).toBe(fakeCartItem.length);
        expect(queryByTestId('loading')).not.toBeInTheDocument();

        // expect(screen.getByTestId('cart')).toBeInTheDocument();


        expect(cartItems[0]).toHaveTextContent(fakeCartItem[0].name);
        expect(cartItems[1]).toHaveTextContent(fakeCartItem[1].name);

        global.fetch.mockRestore();
    });

    it('open modal window', async () => {

        const initialState = {
            isLoading: false,
            items: []
        }

        console.log(store.getState());

        const {findByTestId, getAllByTestId, queryByTestId, queryByText} = renderRedux(
            <CartPage/>, {initialState: {cart: initialState}});

        // await findByTestId('cart');
        //Click Add Item Button

        //Open Modal

        const openBtn = queryByText('Add Cart Item');
        fireEvent.click(openBtn);

        const modal = queryByTestId('modal');
        const modalInside = queryByTestId('modal-inside');

        expect(modal).toBeInTheDocument();

        //Click inside modal
        fireEvent.click(modalInside);
        expect(modal).toBeInTheDocument();


        //Close Modal by clicking on close btn
        const closeBtn = queryByText('✕');
        fireEvent.click(closeBtn);
        expect(modal).not.toBeInTheDocument();

        //console.log(document.documentElement.outerHTML);
    })
});