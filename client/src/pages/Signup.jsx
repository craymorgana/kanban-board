import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = (props) => {
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [name, setName] = useState('');
	const [addUser, { error, data }] = useMutation(ADD_USER);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(email, pass, name);
		try {
			const { data } = await addUser({
				variables: { email, username: name, password: pass },
			});

			Auth.login(data.addUser.token);
			console.log(data.addUser.token);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className='auth-form'>
			{data ? (
				<Link to='/Dashboard'>Dashboard</Link>
			) : (
				<form className='signup-form' onSubmit={handleSubmit}>
					<label for='name'>Name</label>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						type='name'
						placeholder='your name'
						id='name'
					/>
					<label for='email'>Email</label>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type='email'
						placeholder='email.com'
						id='email'
					/>
					<label for='password'>Password</label>
					<input
						value={pass}
						onChange={(e) => setPass(e.target.value)}
						type='password'
						placeholder='******'
						id='password'
					/>
					<button className='clickBtn' type='submit'>
						Sign up
					</button>
				</form>
			)}

			<button className='linkBtn' onClick={() => props.onFormSwitch('login')}>
				Already have an account? Log in here
			</button>
			{error && <div className=''>{error.message}</div>}
		</div>
	);
};

export default Signup;