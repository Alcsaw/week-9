import React, { useState } from 'react';

import api from '../../services/api';

// <> is a fragment. It's like a <div>, but it's going to appear in the HTML after starting the page
// This way we can preserve the css styling (.content > p) for example
export default function Login({ history }) {    //history -> (default) property used to navigation
    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        
        const response = await api.post('/sessions', {
        email   //email: email -> simplification
        });

        const { _id } = response.data;

        localStorage.setItem('user', _id);

        history.push('./dashboard');
    }
    return (
        <>
            <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa.
            </p>

            <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-MAIL *</label>
            <input
                type="email"
                id="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={event => setEmail(event.target.value)}
            />

            <button className="btn" type="submit">Entrar</button>
            </form>
        </>)
}
