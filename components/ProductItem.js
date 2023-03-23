/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function ProductItem({ product }) {
	return (
		<div className="bg-white shadow-md rounded-lg overflow-hidden">
			<Link href={`/product/${product.slug}`}>
				<img
					src={product.image}
					alt={product.name}
					className="w-full h-48 object-cover"
				/>
			</Link>
			<div className="p-6">
				<Link href={`/product/${product.slug}`}>
					<h2 className="text-lg font-bold text-gray-900 hover:text-blue-500">
						{product.name}
					</h2>
				</Link>
				<p className="text-gray-500 mb-2">{product.brand}</p>
				<p className="text-gray-900 font-bold text-xl mb-2">
					Rs.{product.price}
				</p>
				<button
					className="flex items-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
"
				>
					Add to cart
				</button>
			</div>
		</div>
	);
}
