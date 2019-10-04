import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function New({ history }) {
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    // useMemo watches the value of a variable and each time it changes it generates a new value for
    // another variable. Its syntax is like useEffect, first parammeter is a callback function and
    // the second is an array of variables to watch.

    //URL.createObjectURL() creates an URL for a temporary variable which hasn't been uploaded yet.
    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null;
        },
        [thumbnail]
    )

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();    // The backend expects a multipart form with the data for post

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        const user_id = localStorage.getItem('user');

        await api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }

    // event.target.files is always an array, event not passing the `multiple` parammeter to the input
    // so we need to get the thumbnail from event.target.files[0], the first position.
    return (
        <form onSubmit={handleSubmit}>
            <label
                id="thumbnail"
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Selecione uma imagem" />
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input
                id="company"
                placeholder="Sua empresa incrível"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
            <input
                id="techs"
                placeholder="Quais tecnologias utilizam?"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="price">VALOR DA DIÁRIA <span>(em branco para GRATUITO)</span></label>
            <input
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}
