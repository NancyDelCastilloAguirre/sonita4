import './editPost.css'
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {Create, AttachFileOutlined } from "@mui/icons-material"
import { red } from '@mui/material/colors';
import { URL } from '../../URL';
import axios from 'axios';
import jwt_decode from "jwt-decode"


export default function EditPost(props) {
  const [show, setShow] = useState(false);
  const [asunto,setAsunto]=useState(props.postid.post.asunto);
  const [contenido ,setContenido]=useState(props.postid.post.desc)
  const [file, setFile]=useState("")
  const [imgP, setImg]=useState(props.postid.post.img)
  const [postinfo, setPostinfo]=useState("")
  const [postCont, setPostcont]=useState("")
  const token=window.localStorage.getItem("token");
  
  console.log(token);
  const decodeToken=jwt_decode(token)
  const userId=decodeToken.id;
  console.log(props.postid.post);

  const handleClose = async() => {
    
    const Apost={
      userId: userId,
      asunto: asunto,
      desc: contenido,
      img: imgP
    };

    if (file) {
      console.log("FILEEEE");
      console.log(file);
      var tempI=Date.now() + file.name;
      console.log(tempI);
      setImg(tempI);
      
      var data = new FormData();
      data.set('name', Date.now() +file.name )
      data.set('file', file)
      Apost.img=tempI
      // data.append("file", file);
      // data.append("name", fileName);
      // newPost.img = fileName;
      // console.log("OBJETO POST NUEVO "+newPost.img);
      console.log(data)
      try {
      await axios.post(`${URL}upload`,data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
        
      
        console.log("EL ARCHIVO SE SUBIO A LA CARPETA SIUUU ");
      } catch (error) {
        console.log("NO SE SUBIO A LA CARPETA "+error);
      }
    }


    try {
      await axios.put(`${URL}api/posts/${props.postid.post._id}`,Apost)
      window.location.reload() 
    } catch (error) {
      console.log(error);
    }
    setShow(false)
  };
    const handleCok = async() => {
      setShow(false)};


  const handleShow = async() => {
    const info=props.postid.post.asunto
      setPostinfo(info)
      const cont=props.postid.post.desc
      setPostcont(cont)
    
    setShow(true)};
   

  return (
    <>
      <Create onClick={handleShow} sx={{ fontSize:30 }} htmlColor="#ffff"/>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='modalheader'>
          <Modal.Title className='modaltitle'>Editar Publicación</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalbody'>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInputText">
              <Form.Label>Asunto</Form.Label>
              <Form.Control
                type="text"
                placeholder={postinfo}
                className='forminput'
                onChange={(e)=>{setAsunto(e.target.value)}}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea"
            >
              <Form.Label>Contenido</Form.Label>
              <Form.Control 
                as="textarea" rows={3} 
                placeholder={postCont}
                className='forminput'
                
                onChange={(e)=>{setContenido(e.target.value)}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInputFile">
            <AttachFileOutlined sx={{ color: red[500] }} />
              <Form.Label className='formlabelfile'>Adjuntar Archivo</Form.Label>
              <Form.Control
                type="file"
                className='forminputfile'
                onChange={(e)=>setFile(e.target.files[0])}
              >
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='modalfooter'>
          <button className='modalbuttonGrey' onClick={handleCok}>
            Cancelar
          </button>
          <button className='modalbuttonRedSmall' onClick={handleClose}>
            Modificar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

