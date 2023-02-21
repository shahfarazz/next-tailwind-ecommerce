import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const Store = createContext();
const initialState = {
	cart: Cookies.get('cart')
		? JSON.parse(Cookies.get('cart'))
		: { cartItems: [] },
};

function reducer(state, action) {
	switch (action.type) {
		case 'CART_ADD_ITEM': {
			const newItem = action.payload;
			const existItem = state.cart.cartItems.find(
				item => item.slug === newItem.slug
			);

			const cartItems = existItem
				? state.cart.cartItems.map(
						item => (item.name === existItem.name ? newItem : item)
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  )
				: [...state.cart.cartItems, newItem];

			Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case 'CART_REMOVE_1_ITEM': {
			// console.log('Over here and indexToRemove is', state.cart.cartItems);
			console.log('called by chatgpt');

			const cartItems = state.cart.cartItems.filter(
				item => item.slug !== action.payload.slug
			);

			// console.log('Over here and indexToRemove is', indexToRemove);

			// if (indexToRemove !== -1) {
			// 	cartItems.map(item => );
			// }
			// console.log('Over here and cartitems is', cartItems);
			Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
			return { ...state, cart: { ...state.cart, cartItems } };
		}

		default:
			return state;
	}
}

export function StoreProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };
	return <Store.Provider value={value}>{children}</Store.Provider>;
}
