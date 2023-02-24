import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Store } from '@/utils/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';

export default function Layout({ title, children }) {
	const { status, data: session } = useSession();
	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const [cartItemsCount, setCartItemsCount] = useState(0);
	useEffect(() => {
		setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
	}, [cart.cartItems]);

	return (
		<>
			<Head>
				<title>{title ? title + '- Amazona' : 'Amazona'}</title>
				<meta name="description" content="Ecommerce Website" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<ToastContainer position="bottom-center" limit={1}></ToastContainer>
			<div className="flex min-h-screen flex-col justify-between">
				<header>
					<nav className="flex h-12 items-center px-4 justify-between shadow-md ">
						<Link href="/" className="text-lg font-bold">
							Amazonaa
						</Link>
						<div>
							<Link href="/cart" className="p-2">
								Cart
								{cartItemsCount > 0 && (
									<span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
										{cartItemsCount}
									</span>
								)}
							</Link>

							{status === 'loading' ? (
								'Loading'
							) : session?.user ? (
								session.user.name
							) : (
								<Link href="/login" className="p-2">
									Login
								</Link>
							)}
						</div>
					</nav>
				</header>
				<main className="container m-auto mt-4 px-4">{children}</main>
				<footer className="flex h-10 justify-center items-center shadow-inner">
					Copyright © 2023 Amazona
				</footer>
			</div>
		</>
	);
}
