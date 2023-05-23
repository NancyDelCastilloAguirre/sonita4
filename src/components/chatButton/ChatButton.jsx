import axios from 'axios';
import "./chatButton.css"
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import {ChatBubble} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../URL';

export default function ChatButton({profileId}) {
    const navigate = useNavigate(); 
    const [user, setUser] = useState('');
    const [userId, setUserId] = useState('');
    const [profile, setProfile] = useState('');
    const [convo, setConvo] = useState([]);

    // Obtener datos del usuario y el perfil
    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (token) {
            const decodeToken = jwt_decode(token);
            const currentUser = decodeToken.id;
            setUserId(currentUser);

            const getProfile = async ()=> {
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

            const getUser = async ()=> {
                try {
                    const res = await axios.get(
                        `${URL}api/users?userId=${userId}`
                    );
                    setUser(res.data);
                } catch (error) {
                    console.log(error);
                }
            };
            getUser();
        }
    }, [profileId]);

    //Obtener conversaciones del usuario
    useEffect(()=>{
        const getConvo = async ()=> {
            try {
                const res = await axios.get(
                    `${URL}api/conversations/${userId}`
                );
                setConvo(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getConvo();
    }, [userId])

    //Verificar si ya tiene una conversación
    const convoObj = convo.find((item) => item.members.includes(profileId));
    const convoId = convoObj && convoObj._id;

    //Mandar o crear convo
    const handleCock = async () => {
        if (convoId) {
          const rol = user.role;
          if (rol === 'user') {
            navigate('/chat', { state: { convo: convoId } });
          } else if (rol === 'admin') {
            navigate('/chat', { state: { convo: convoId } });
          }
        } else {
          try {
            const res = await axios.post(
              `${URL}api/conversations/`,
              {
                senderId: userId,
                receiverId: profileId
              }
            );
            const createdConvoId = res.data._id;
            const rol = user.role;
            if (rol === 'user') {
              navigate('/chat', { state: { convo: createdConvoId } });
            } else if (rol === 'admin') {
              navigate('/chat', { state: { convo: createdConvoId } });
            }
          } catch (err) {
            console.log(err);
          }
        }
      };      

    return (
        <div>
            <button className='buttonChat' onClick={handleCock}><ChatBubble />Chatear</button>
        </div>
    )
}
