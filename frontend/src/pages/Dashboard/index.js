import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Links is used to create links to other pages without needind to history.push it
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {

    const [spots, SetSpots] = useState([]); // since the backend sends an array, the best way to
                                            // initialize the variable is an empty array

    // useEffect receives a callback function and an array of dependencies
    // wich determines when the cb function should be executed. When a variable in the array is changed,
    // the cb function is changed. Useful for filters, for example, when the user changes the filter,
    // call the api again. When there's no variables in the dependencies array, the cb function of
    // useEffect is called only once at page load (i.e. a first fetch for the page)
    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

            console.log(response.data);
            SetSpots(response.data);
        }

        loadSpots();
    }, [])

    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    )
}
