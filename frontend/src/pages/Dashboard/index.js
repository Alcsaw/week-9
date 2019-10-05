import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
// Links is used to create links to other pages without needind to history.push it
import socketio from 'socket.io-client';

import api from '../../services/api';

import './styles.css';

const serverConfig = require('../../config/server');

export default function Dashboard() {

    const [spots, SetSpots] = useState([]); // since the backend sends an array, the best way to
                                            // initialize the variable is an empty array
    const[requests, setResquests] = useState([]);

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

    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio(serverConfig.baseURL, {
        query: { user_id },
    }), [user_id]);     // useMemo will save the socket variable and update it only when the
                        // variable user_id changes

    useEffect(() => {
        socket.on('booking_request', data => {
            setResquests([...requests, data]);
        })
    }, [requests, socket]);

    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                        </p>

                        <button className="accept">ACEITAR</button>
                        <button className="reject">REJEITAR</button>
                    </li>
                ))}
            </ul>

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
