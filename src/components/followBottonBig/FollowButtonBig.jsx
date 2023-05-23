import axios from 'axios';
import "./followButtonBig.css"
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { URL } from '../../URL';
import {PersonAddAlt1, PersonAddDisabled } from '@mui/icons-material';

export default function FollowButtonBig({ profileId }) {
    const [user, setUser] = useState('');
    const [userId, setUserId] = useState('');
    const [profile, setProfile] = useState('');
    const [seguido, setSeguido] = useState();

    // Obtener datos del usuario y el perfil
    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (token) {
            const decodeToken = jwt_decode(token);
            const currentUser = decodeToken.id;
            setUserId(currentUser);

            const getProfile = async () => {
                try {
                    const res = await axios.get(
                        `${URL}api/users?userId=${profileId}`
                    );
                    setProfile(res.data);
                } catch (error) {
                    console.log(error);
                }
            };
            getProfile();

            const getUser = async () => {
                try {
                    const res = await axios.get(
                        `${URL}api/users?userId=${currentUser}`
                    );
                    setUser(res.data);
                } catch (error) {
                    console.log(error);
                }
            };
            getUser();
        }
    }, [profileId]);

    // Checar si se sigue o no al usuario
    useEffect(() => {
        if (user.followings && user.followings.includes(profileId)) {
            setSeguido(true);
        } else {
            setSeguido(false);
        }
    }, [user.followings, profileId]);

    console.log(seguido);

    // Seguir
    const follow = async () => {
        try {
            const response = await axios.put(`${URL}api/users/${profileId}/follow`, {
                userId: userId
            });
            setSeguido(true);
        } catch (err) {
            console.log(err);
        }
    };

    // Dejar de seguir
    const unfollow = async () => {
        try {
            const response = await axios.put(`${URL}api/users/${profileId}/unfollow`, {
                userId: userId
            });
            setSeguido(false);
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {seguido ? (
                <button className='buttonFollowss' onClick={unfollow}>Dejar de seguir</button>
            ) : (
                <button className='buttonFollowss' onClick={follow}>Seguir</button>
            )}
        </>
    );
}