import './edit.css'
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {Create } from "@mui/icons-material"
import { red } from '@mui/material/colors';
import { URL } from '../../URL';
import axios from 'axios';
import jwt_decode from "jwt-decode"


export default function Edit() {
  const [userId,setUserId]=useState("")
  const [user,setUser]=useState("")
  useEffect(()=>{
    const getUser=async ()=>{
      const token= window.localStorage.getItem("token")
      const decodedToken=jwt_decode(token)
      setUserId(decodedToken.id)
    try {
            const res=await axios.get(`${URL}api/users?userId=${userId}`)
            setUser(res.data);
          } catch (error) {
            console.log("ERROR EN Profile USER");
            console.log(error);
          }
  }
  getUser()
},[userId])


  const [show, setShow] = useState(false);
  const [usuario,setUsuario]=useState(user.username)
  const [contraseña ,setContraseña]=useState(user.password) 
  const [email, setEmail]=useState(user.email)
  const [descripcion,setDescripcion]=useState(user.desc)
  const [carrera ,setCarrera]=useState(user.carrera)
  const [semestre ,setSemestre]=useState(user.semestre)
  
  function eliminarC(e){
    var textoPegado = (e.clipboardData || window.clipboardData).getData(
      "text"
    );
    var textoSinCaracteres = textoPegado.replace(/[<>{}()|°()=-_^?¬]/g, "");
    e.preventDefault();
    document.execCommand("insertHTML", false, textoSinCaracteres);
  }
  function validarCaracter(e){
    var codigoTecla = e.keyCode ? e.keyCode : e.which;
    if (
      (codigoTecla >= 65 && codigoTecla <= 90) || 
      (codigoTecla >= 97 && codigoTecla <= 122) || 
      (codigoTecla >= 48 && codigoTecla <= 57) ||
      codigoTecla === 46 || codigoTecla === 64 ||
      codigoTecla===35 || codigoTecla===36 ||
      codigoTecla===37 || codigoTecla===38 ||
      codigoTecla===45 || codigoTecla===95 
    ) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  }

const handleCok = async() => {
  setShow(false)
};
  const handleClose = async() => {
    
    try {
      const response = await axios.put(`${URL}api/users/${userId}`, {
        desc:descripcion,
        userId:userId,
        username:usuario,
        email:email,
        carrera:carrera,
        semestre:semestre,
        password:contraseña
      });
      window.location.reload()
      console.log(response);
     
    } catch (err) {
      console.log(err);
    }



    setShow(false)
    window.reload()

  };
    const handleShow = () => setShow(true);

  return (
    <>
        <Create onClick={handleShow}/>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className='modalheader'>
            <Modal.Title className='modaltitle'>Editar información</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalbody'>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInputText">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={user.username}
                    className='forminput'
                    onChange={(e)=>{setUsuario(e.target.value)}}
                    onKeyPress={(event)=>validarCaracter(event)}
                    onPaste={(e)=> eliminarC(e)}
                    
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInputText">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    className='forminput'
                    onChange={(e)=>{setContraseña(e.target.value)}}
                    onKeyPress={(event)=>validarCaracter(event)}
                    onPaste={(e)=> eliminarC(e)}
                />
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={user.email}
                    className='forminput'
                    onChange={(e)=>{setEmail(e.target.value)}}
                    onKeyPress={(event)=>validarCaracter(event)}
                    onPaste={(e)=> eliminarC(e)}
                    
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInputText">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={user.desc}
                    className='forminput'
                    onChange={(e)=>{setDescripcion(e.target.value)}}
                    onPaste={(e)=> eliminarC(e)}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInputText">
                <Form.Label>Carrera</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={user.carrera}
                    className='forminput'
                    onChange={(e)=>{setCarrera(e.target.value)}}
                    onKeyPress={(event)=>validarCaracter(event)}
                    onPaste={(e)=> eliminarC(e)}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInputText">
                <Form.Label>Semestre</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={user.semestre}
                    className='forminput'
                    onChange={(e)=>{setSemestre(e.target.value)}}
                    onKeyPress={(event)=>validarCaracter(event)}
                    onPaste={(e)=> eliminarC(e)}
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
  );
}

