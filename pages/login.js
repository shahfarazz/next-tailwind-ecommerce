import Layout from '@/components/Layout';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function LoginScreen() {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const submitHandler = ({ email, password }) => {
		console.log(email);
		console.log(password);
	};

	return (
		<Layout title={'Login'}>
			<form
				className="max-w-screen-md mx-auto"
				onSubmit={handleSubmit(submitHandler)}
			>
				<h1 className="mb-10 text-xl font-bold">Login</h1>

				<div className="mb-4">
					<label htmlFor="email" className="ml-1">
						Email
					</label>
					<input
						{...register('email', {
							required: 'Please enter email',
							pattern: {
								value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
								message: 'Please enter a valid email.',
							},
						})}
						type="text"
						placeholder="Enter your Email here"
						className="input w-full mt-1"
						id="email"
						autoFocus
					/>
					{errors.email && (
						<div className="text-red-500">
							{errors.email.message}
						</div>
					)}
				</div>
				<div className="mb-4">
					<label htmlFor="password" className="ml-1">
						Password
					</label>
					<input
						{...register('password', {
							required: 'Please enter password',
							minLength: {
								value: 6,
								message:
									'password has to be more than 5 characters.',
							},
						})}
						type="text"
						placeholder="Enter your Password here"
						className="input w-full mt-1"
						id="password"
						autoFocus
					/>
					{errors.password && (
						<div className="text-red-500">
							{errors.password.message}
						</div>
					)}
				</div>
				<div className="mb-4">
					<button className="rounded bg-amber-300 py-2 px-4 shadow outline-none hover:bg-amber-400  active:bg-amber-500">
						Login
					</button>
				</div>
				<div className="mb-4">
					Don&apos;t have an account? &nbsp;
					<Link href="register"> Register </Link>
				</div>
			</form>
		</Layout>
	);
}
