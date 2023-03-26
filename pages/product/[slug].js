import Layout from '@/components/Layout';
import Product from '@/models/Product';
// import data from '@/utils/data';
import db from '@/utils/db';
import { Store } from '@/utils/Store';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';

export default function ProductScreen(props) {
	const { product } = props;
	const { state, dispatch } = useContext(Store);
	const router = useRouter();
	if (!product) {
		return <Layout title={'Product not found'}>Product not Found</Layout>;
	}

	async function addToCartHandler() {
		const existItem = state.cart.cartItems.find(
			x => x.slug === product.slug
		);
		const quantity = existItem ? existItem.quantity + 1 : 1;

		const { data } = await axios.get(`/api/products/${product._id}`);

		if (data.countInStock < quantity) {
			return toast.error('Sorry. Product is out of stock.');
		}
		dispatch({
			type: 'CART_ADD_ITEM',
			payload: { ...product, quantity },
		});

		router.push(`/cart`);
	}
	return (
		<Layout title={product.name}>
			<div className="py-2">
				<Link href="/">Back to products</Link>
			</div>

			<div className="grid md:grid-cols-4 md:gap-3">
				<div className="md:col-span-2">
					<Image
						src={product.image}
						width={640}
						height={640}
						alt={product.name}
					/>
				</div>
				<div className="card w-96 bg-base-100 shadow-xl p-5">
					<div className="card-title font-bold text-xl mb-2">
						{product.name}
					</div>
					<div className="badge badge-secondary text-sm mb-2">
						NEW
					</div>
					<p className="text-sm text-gray-500 mb-2">
						Category: {product.category}
					</p>
					<div className="flex items-center mb-2">
						<div className="mr-2 text-yellow-400">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 fill-current"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10 15.854l4.147 2.26-.79-4.602 3.358-3.275-4.657-.677L10 7.52l-1.068 4.04-4.657.677 3.358 3.275-.79 4.602L10 15.854z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<p className="text-sm text-gray-500">
							{product.rating}★ from {product.numReviews} reviews
						</p>
					</div>
					<p className="text-sm text-gray-500 mb-2">
						Description: {product.description}
					</p>
					<div className="flex items-center mb-2">
						<div className="badge badge-outline mr-2">Fashion</div>
						<div className="badge badge-outline">Products</div>
					</div>
					<div className="flex items-center justify-between mb-2">
						<p className="text-lg font-bold">
							Price: Rs.{product.price}
						</p>
						<p
							className={`text-lg font-bold ${
								product.countInStock > 0
									? 'text-green-500'
									: 'text-red-500'
							}`}
						>
							{product.countInStock > 0
								? 'In Stock'
								: 'Unavailable'}
						</p>
					</div>
					<button
						className={`btn w-full py-3 ${
							product.countInStock > 0
								? 'flex items-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
								: 'bg-gray-300 text-gray-500 cursor-not-allowed'
						}`}
						onClick={addToCartHandler}
						disabled={product.countInStock === 0}
					>
						Add to Cart
					</button>
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const { params } = context;
	const { slug } = params;

	await db.connect();
	const product = await Product.findOne({ slug }).lean();
	await db.disconnect();
	return {
		props: {
			product: product ? db.convertDocToObj(product) : null,
		},
	};
}
