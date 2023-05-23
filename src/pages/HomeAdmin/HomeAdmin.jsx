import "./homeAdmin.css"
import Feed from "../../components/feed/Feed";
import SidebarAdmin from "../../components/sidebarAdmin/SidebarAdmin";
import TopbarAdmin from "../../components/topbarAdmin/TopbarAdmin";
import { useEffect, useState } from "react";
import Autenticado from "../../components/Autenticado/Auntenticado";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"
import axios from "axios";
import { URL } from "../../URL";

export default function HomeAdmin () {
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
         try {
            const res=await axios.get(`${URL}api/users?userId=${userId}`)
            setUser(res.data);
          } catch (error) {
            console.log("ERROR EN INICIO ADMIN");
            console.log(error);
          }   
      }
  }
  getUser()
},[userId])

  return (
    <>
    <Autenticado>
      <TopbarAdmin />
      <div className="homeContainer">      
        <SidebarAdmin />
        <div className="homefeed">
          <Feed />
        </div>
      </div>
    </Autenticado>
    </>
  )
}
