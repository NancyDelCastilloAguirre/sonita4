import "./home.css"
import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"
import Autenticado from "../../components/Autenticado/Auntenticado";

export default function Home() {
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
    <Autenticado >
    <Topbar />
      <div className="homeContainer">      
        <Sidebar />
        <div className="homefeed">
          <Feed />
        </div>
      </div>
    </Autenticado>

    </>
  )
}
