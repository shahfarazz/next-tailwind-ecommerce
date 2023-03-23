import CheckoutWizard from '@/components/CheckoutWizard';
import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function PaymentScreen() {
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
	const router = useRouter();
	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const { shippingAddress, paymentMethod } = cart;

	const submitHandler = e => {
		e.preventDefault();
		if (!selectedPaymentMethod) {
			return toast.error('Payment method is required');
		}
		dispatch({
			type: 'SAVE_PAYMENT_METHOD',
			payload: selectedPaymentMethod,
		});

		Cookies.set(
			'cart',
			JSON.stringify({
				...cart,
				paymentMethod: selectedPaymentMethod,
			})
		);

		router.push('/placeorder');
	};

	useEffect(() => {
		if (!shippingAddress.address) {
			return router.push('/shipping');
		}
		setSelectedPaymentMethod(paymentMethod || '');
	}, [paymentMethod, router, shippingAddress.address]);

	return (
		<Layout title={'Payment Method'}>
			<CheckoutWizard activeStep={2} />
			<form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
				<h1 className="mb-4 text-xl">Payment Method</h1>
				{['Cash-On-Delivery (C.O.D)'].map(payment => (
					<div key={payment} className="mb-4">
						<input
							name="paymentMethod"
							className="p-2 outline-none focus:ring-0"
							id={payment}
							type="radio"
							checked={selectedPaymentMethod === payment}
							onChange={() => setSelectedPaymentMethod(payment)}
						/>
						<label className="p-2" htmlFor={payment}>
							{payment}
						</label>
					</div>
				))}
				<div className="mb-4 flex justify-between">
					<button
						onClick={() => router.push('/shipping')}
						type="button"
						className="bg-gray-100 py-2 px-4 text-black shadow outline-none hover:bg-gray-200"
					>
						Back
					</button>
					<button className="rounded bg-amber-300 py-2 px-4 shadow outline-none hover:bg-amber-400  active:bg-amber-500">
						Next
					</button>
				</div>
			</form>
		</Layout>
	);
}
