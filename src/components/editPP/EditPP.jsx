import './editPP.css'
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {CameraAlt } from "@mui/icons-material"
import { URL } from '../../URL';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { AttachFileOutlined } from '@mui/icons-material';
import { common } from '@mui/material/colors';
import { red } from '@mui/material/colors';


export default function EditPP() {
    const [show, setShow] = useState(false);
    const [userId,setUserId]=useState("")
    const [user,setUser]=useState("")
    const [profile, setProfile]=useState(user.profilePicture)
    useEffect(()=>{
        const getUser= async()=>{
            const token= window.localStorage.getItem("token")
            const decodedToken=jwt_decode(token)
            setUserId(decodedToken.id)
            try{
                const res=await axios.get(`${URL}api/users?userId=${userId}`)
                setUser(res.data)
                setProfile(res.data.profilePicture)
            }catch(err){
                console.log(err);
            }
        }
        getUser()
    },[userId])

    const handleImg= (e)=>{
        const file = e.target.files[0];
        setProfile(file)
    }

    const handleClose= async()=>{
        var name=Date.now() + profile.name
        var data = new FormData();
        data.set('name', name )
        data.set('file', profile)

        try {
            await axios.post(`${URL}upload`,data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (err) {
            console.log(err);
        }
        try {
            const response = await axios.put(`${URL}api/users/${userId}`, {
              userId:userId,
              profilePicture:name
            });  
            window.location.reload()   
        } catch (err) {
            console.log(err);
        }
        setShow(false)
    }

    const handleShow = () => setShow(true);

    const handleCok = async() => {
        setShow(false)
    }


    return (
        <>
        <CameraAlt onClick={handleShow}  sx={{ color: common[500] }} />
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className='modalheader'>
            <Modal.Title className='modaltitle'>Edita tu foto de perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalbody'>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInputText">
                <AttachFileOutlined sx={{ color: red[500] }} />
                <Form.Label>Foto de perfil</Form.Label>
                <Form.Control
                    type="file"
                    className='forminputfile'
                    onChange={handleImg}
                />
            </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer className='modalfooter'>
            <button className='modalbuttonGrey' onClick={handleCok}>
                Cancelar
            </button>
            <button className='modalbuttonRedSmall' onClick={handleClose}>
                Guardar
            </button>
            </Modal.Footer>
        </Modal>
        </>
    )
}
