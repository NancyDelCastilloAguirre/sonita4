import "./followed.css"
import Friend from "../../components/friend/Friend";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Autenticado from "../../components/Autenticado/Auntenticado";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"
import { useEffect, useRef, useState } from "react";


export default function Followed() {
  const navigate = useNavigate();
  const [role,setRole]=useState("")
  const [userId,setUserId]=useState("")
  
  useEffect(()=>{
    const getUser=async ()=>{
      const token= window.localStorage.getItem("token")
      const decodedToken=jwt_decode(token)
      setUserId(decodedToken.id)
      setRole(decodedToken.role)
      if(role=="admin"){
        navigate("/unauthorized");
      }else{
        console.log("Todo bien");
      }
  }
  getUser()
},[userId])
  
  return (
    <>
  <Autenticado>
      <Topbar />
      
      <div className="followedContainer">      
        <Sidebar />
        <div className="followed">
          <Friend />
        </div>
      </div>
  </Autenticado>

    </>
  )
}
