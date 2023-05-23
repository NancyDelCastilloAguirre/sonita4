import ChartComponent from "../../components/Chart/ChartComponent";
import Autenticado from "../../components/Autenticado/Auntenticado";
import TopbarAdmin from "../../components/topbarAdmin/TopbarAdmin";
import SidebarAdmin from "../../components/sidebarAdmin/SidebarAdmin";
import "./Estadisticas.css"
import { useEffect, useState } from "react";
import { URL } from "../../URL";
import axios from "axios";
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";

export default function Estadisticas(){
    const [data,setData]=useState([])

    const navigate = useNavigate();
    const [role,setRole]=useState("")
    const [userId,setUserId]=useState("")

    useEffect(()=>{
      const getUser=async ()=>{
        const token= window.localStorage.getItem("token")
        const decodedToken=jwt_decode(token)
        setUserId(decodedToken.id)
        setRole(decodedToken.role)
        if(role=="user"){
          navigate("/unauthorized");
        }else{
          console.log("Todo bien");
        }
    }
    getUser()
  },[userId])

    useEffect(()=>{
        const ObtenerData=async()=>{
            try {
                const response =await axios.get(`${URL}api/pdfCount/all`) 
                setData(response.data)     
            } catch (error) {
                console.log(error);
            }
        }
        ObtenerData()
      },[])

  return (
    <Autenticado>
      <TopbarAdmin/>
        <div className="followedContainer"> 
          <SidebarAdmin/>
            <div className="feed">
              <div className="feedWrapper2">
                <div className="section">
                  <div id="flip" >
                    <div><div>Estadisticas</div></div>
                    <div><div>Data</div></div>
                    <div><div>SONA</div></div>
                  </div>
                </div>
              <ChartComponent data={data} />
              </div>
            </div>      
        </div>
    </Autenticado>
  );
}