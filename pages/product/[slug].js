import Layout from '@/components/Layout';
import data from '@/utils/data';
import { Store } from '@/utils/Store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

export default function ProductScreen() {
	const { state, dispatch } = useContext(Store);
	const { query } = useRouter();
	const { slug } = query;
	const product = data.products.find(x => x.slug === slug);

	if (!product) {
		return <div>Product not Found</div>;
	}

	function addToCartHandler() {
		const existItem = state.cart.cartItems.find(
			x => x.slug === product.slug
		);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		if (product.countInStock < quantity) {
			alert('Sorry, product is Out of Stock.');
			return;
		}
		dispatch({
			type: 'CART_ADD_ITEM',
			payload: { ...product, quantity },
		});
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
				<div className="card w-96 bg-base-100 shadow-xl ">
					<div className="card-body">
						<h2 className="card-title">
							{product.name}
							<div className="badge badge-secondary">NEW</div>
						</h2>
						<p>Category: {product.category}</p>
						<p>
							{product.rating}★ from {product.numReviews} reviews
						</p>
						<p>Description: {product.description}</p>
						<div className="card-actions justify-end">
							<div className="badge badge-outline">Fashion</div>
							<div className="badge badge-outline">Products</div>
						</div>
						<div className="card p-5 w-20 flex inset-x-20">
							<div className="mb-2 justify">
								Price: Rs.{product.price}
							</div>
						</div>
						<div className="card p-5 w-20 flex inset-x-20">
							<div className="mb-2 justify">Status:</div>
							<div>
								{product.countInStock > 0
									? 'In Stock'
									: 'Unavailable'}
							</div>
						</div>
						<div
							className="btn bg-yellow-400 text-black"
							onClick={addToCartHandler}
						>
							{''}
							Add to Cart
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
