import Layout from '@/components/Layout';
import ProductItem from '@/components/ProductItem';
import Product from '@/models/Product';
// import data from '@/utils/data';
import db from '@/utils/db';
import { Store } from '@/utils/Store';
import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';

export default function Home({ products }) {
	const { state, dispatch } = useContext(Store);
	const { cart } = state;

	async function addToCartHandler(product) {
		const existItem = cart.cartItems.find(x => x.slug === product.slug);
		const quantity = existItem ? existItem.quantity + 1 : 1;

		const { data } = await axios.get(`/api/products/${product._id}`);

		if (data.countInStock < quantity) {
			return toast.error('Sorry, product is Out of Stock.');
		}
		dispatch({
			type: 'CART_ADD_ITEM',
			payload: { ...product, quantity },
		});

		toast.success('Product added to the cart');
	}

	return (
		<Layout title="Home page">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
				{products.map(product => (
					<ProductItem
						product={product}
						key={product.slug}
						addToCartHandler={addToCartHandler}
					></ProductItem>
				))}
			</div>
		</Layout>
	);
}

export async function getServerSideProps() {
	await db.connect();
	const products = await Product.find().lean();
	return {
		props: {
			products: products.map(db.convertDocToObj),
		},
	};
}
