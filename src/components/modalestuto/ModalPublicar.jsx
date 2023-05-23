import './tutoModal.css'
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import {HelpOutline } from "@mui/icons-material"
import ReactPlayer from 'react-player';


export default function ModalPublicar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCok = async() => {
        setShow(false)
  };
  

  return (
    <>
        <HelpOutline onClick={handleShow} className="sidebarIcon"/>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className='modalheader'>
            <Modal.Title className='modaltitle'>¿Cómo crear una Publicación?</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalbody'>
            <div className="contenedor">
                <ReactPlayer
                url={'https://youtu.be/961Pa3HXNfI'}
                width='100%'
                height='100%'
                controls
                loop
                className="react-player"
                />
                </div>
                    
            </Modal.Body>
            <Modal.Footer className='modalfooter'>
            <button className='modalbuttonGrey' onClick={handleCok}>
                ok
            </button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

