import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';

function CartScreen() {
	const { state, dispatch } = useContext(Store);
	const router = useRouter();

	const {
		cart: { cartItems },
	} = state;

	function removeItemHandler(item) {
		dispatch({ type: 'CART_REMOVE_1_ITEM', payload: item });
	}

	async function updateCartHandler(item, qty) {
		const quantity = Number(qty);
		const { data } = await axios.get(`/api/products/${item._id}`);
		if (data.countInStock < quantity) {
			return toast.error('Sorry. Product is out of stock.');
		}
		dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
		toast.success('Product updated in the cart');
	}

	return (
		<Layout title="Shopping cart">
			<h1 className="mb-4 text-xl">Shopping Cart</h1>
			{cartItems.length === 0 ? (
				<div>
					Cart is empty. <Link href="/">Go to Shopping Page</Link>
				</div>
			) : (
				<div className="grid md:grid-cols-4 md:gap-5">
					<div className="overflow-x-auto md:col-span-3">
						<table className="min-w-full">
							<thead className="border-b">
								<tr>
									<th className="px-5 text-left">Item</th>
									<th className="px-5 text-right">
										Quantity
									</th>
									<th className="px-5 text-right">Price</th>
									<th className="px-5 text">Action</th>
								</tr>
							</thead>
							<tbody>
								{cartItems.map(item => (
									<tr
										key={item.slug}
										style={{
											border: '1px solid #ccc',
											padding: '10px',
										}}
									>
										<td>
											<Link
												href={`/product/${item.slug}`}
												className="flex items-center"
											>
												<Image
													src={item.image}
													width={50}
													height={50}
													alt={item.name}
												/>
												&nbsp;
												{item.name}
											</Link>
										</td>
										<td className="p-5 text-right">
											<select
												value={item.quantity}
												onChange={e =>
													updateCartHandler(
														item,
														e.target.value
													)
												}
											>
												{[
													...Array(
														item.countInStock
													).keys(),
												].map(x => (
													<option
														key={x + 1}
														value={x + 1}
													>
														{x + 1}
													</option>
												))}
											</select>
										</td>
										<td className="p-5 text-right">
											{item.price}
										</td>
										<td className="p-5 text-center">
											<button
												className="btn btn-circle btn-xs"
												onClick={() =>
													removeItemHandler(item)
												}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-3 w-3"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="card p-5">
						<ul>
							<li>
								<div className="pb-3 text-xl">
									Subtotal (
									{cartItems.reduce(
										(a, c) => a + c.quantity,
										0
									)}
									) : Rs.
									{cartItems.reduce(
										(a, c) => a + c.quantity * c.price,
										0
									)}
								</div>
							</li>
							<li>
								<button
									className="btn bg-yellow-400 text-black w-full"
									onClick={() =>
										router.push('login?redirect=/shipping')
									}
								>
									Check Out
								</button>
							</li>
						</ul>
					</div>
				</div>
			)}
		</Layout>
	);
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
