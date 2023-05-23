import './editPBG.css'
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {InsertPhoto } from "@mui/icons-material"
import { URL } from '../../URL';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { AttachFileOutlined } from '@mui/icons-material';
import { red } from '@mui/material/colors';


export default function EditPBG() {
    const [show, setShow] = useState(false);
    const [userId,setUserId]=useState("")
    const [user,setUser]=useState("")
    const [background, setBackground]=useState(user.coverPicture)

    useEffect(()=>{
        const getUser= async()=>{
            const token= window.localStorage.getItem("token")
            const decodedToken=jwt_decode(token)
            setUserId(decodedToken.id)
            try{
                const res=await axios.get(`${URL}api/users?userId=${userId}`)
                setUser(res.data)
                setBackground(res.data.coverPicture)
            }catch(err){
                console.log(err);
            }
        }
        getUser()
    },[userId])

    const handleImg= (e)=>{
        const file = e.target.files[0];
        setBackground(file)
    }

    const handleClose= async()=>{
        var name=Date.now() + background.name
        var data = new FormData();
        data.set('name', name )
        data.set('file', background)

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
              coverPicture:name
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
        <InsertPhoto onClick={handleShow}/>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className='modalheader'>
            <Modal.Title className='modaltitle'>Edita tu fondo de perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalbody'>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInputText">
                <AttachFileOutlined sx={{ color: red[500] }} />
                <Form.Label>Fondo de perfil</Form.Label>
                <Form.Control
                data-input-id="backgroundPicture"
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
