import "./bobAdmin.css"
import SidebarAdmin from "../../components/sidebarAdmin/SidebarAdmin";
import TopbarAdmin from "../../components/topbarAdmin/TopbarAdmin";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../URL";
import jwt_decode from "jwt-decode"
import PdfList from "../../components/pdfList/PdfList";
import Autenticado from "../../components/Autenticado/Auntenticado";

function BOBAdmin() {
  const navigate = useNavigate();
  const [role,setRole]=useState("")
  const [userId,setUserId]=useState("")
  const [user,setUser]=useState("")
  useEffect(()=>{
    const getUser=async ()=>{
      const token= window.localStorage.getItem("token")
      const decodedToken=jwt_decode(token)
      setUserId(decodedToken.id)
      setRole(decodedToken.role)
      if(role=="user"){
        navigate("/unauthorized");
      }else{
        console.log("Si se puedo");
      }
  }
  getUser()
},[userId])


  const [ImageSelectedPrevious, setImageSelectedPrevious] = useState(null);
  const [file,setFile]=useState(null)
  const [files,setFiles]=useState([])
  const changeImage = (e) => {
    if (e.target.files[0] !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        e.preventDefault();
        setImageSelectedPrevious(e.target.result); // le damos el binario de la imagen para mostrarla en pantalla
      };
    }
  };
  useEffect(()=>{
    const obtenerF = async ()=>{
      try {
        const response =await axios.get(`${URL}files`);
        setFiles(response.data)
      } catch (error) {
          console.log(error);
      }
    };
    obtenerF();
  }, [])
  

  const subirPdf=async (e)=>{
    if(!file) return;

    e.preventDefault();
    const formData = new FormData();
    var fileName=file.name
    fileName=fileName.replace(/\s+/g, '_')
    formData.append('name', fileName)
    formData.append('file', file);
    try {
      // Enviar el archivo PDF al servidor usando Axios
      const response = await axios.post(`${URL}upload2`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      window.location.reload();
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
  }
  

  return (
    <>
    <Autenticado>
      <TopbarAdmin />
      <div className="bobAdminContainer">      
        <SidebarAdmin />
        <div className="bobAdmin">
        <StyleDragArea>
          <div className="wrap">
            <div className="text-information">
            <h4>Arrastra y suelta un archivo o presiona para subir un archivo</h4>
            </div>
            
            <input
              className="file-upload-input"
              type="file"
              accept="pdf/*"
              onChange={(e) => {
                console.log("Archivo seleccionado");
                setFile(e.target.files[0]);
              }}
            />
          
        </div>
        <div>
          <center><button className="but" onClick={(e)=>{subirPdf(e)}}>Insertar</button></center>
        </div>
        <div>
        <PdfList pdfFiles={files} />
        </div>
        </StyleDragArea>
        </div>
      </div>
    </Autenticado>
    </>
  )

}
export default BOBAdmin;

const StyleDragArea = styled.div`
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .file-upload-content {
    display: none;
    text-align: center;
  }

  .file-upload-input {
    padding: 10px 25px;
    font-size: 17px;
    border: 0;
    outline: none;
    background-color: transparent;
    height: 700px;
    width: 600px;
    color: white;
    border-radius: 10px;
    cursor:pointer;
    margin: 10px;
  }

  .image-upload-wrap {
    background-color: rgb(58, 57, 55);
    color: rgb(231, 227, 227);
    border: 2px dashed #4B0928;
    display: flex;
    height: 400px;
    width: 700px;
    border-radius: 40px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
  }
  .image-upload-wrap:hover {
    background-color: transparent;
    border: 4px dashed #d0d7de;
  }
  .text-information {
    margin-top: 30px;
    text-align: center;
  }
`;