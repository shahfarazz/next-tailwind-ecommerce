import CheckoutWizard from '@/components/CheckoutWizard';
import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import Link from 'next/link';
import React, { useContext } from 'react';

export default function PlaceOrderScreen() {
	const { state, dispatch } = useContext(Store);

	const { cart } = state;
	const { cartItems, shippingAddress, paymentMethod } = cart;

	return (
		<Layout title={'Place Order'}>
			<CheckoutWizard activeStep={3} />
			<h1 className="mb-4 text-4xl font-bold text-gray-800 text-center md:text-left">
				Place Order
			</h1>
			{cartItems.length === 0 ? (
				<div className="text-lg text-gray-800 text-center md:text-left">
					Your cart is empty.{' '}
					<Link href="/" className="text-blue-500 underline">
						Go shopping
					</Link>
					.
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-4 md:gap-5">
					<div className="md:col-span-3">
						<div className="card p-5 bg-white shadow-lg rounded-lg">
							<h2 className="mb-2 text-lg font-bold text-gray-800">
								Shipping Address
							</h2>
							<div className="text-lg text-gray-800">
								{shippingAddress.fullName}
							</div>
							<div className="text-lg text-gray-800">
								{shippingAddress.address}
							</div>
							<div className="text-lg text-gray-800">
								{shippingAddress.city},{' '}
								{shippingAddress.postalCode}
							</div>
							<div className="text-lg text-gray-800">
								{shippingAddress.country}
							</div>
						</div>
						<div className="mt-4">
							<Link
								href="/shipping"
								className="text-blue-500 underline hover:text-blue-700"
							>
								Edit shipping address
							</Link>
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
}
