import "./saved.css"
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Autenticado from "../../components/Autenticado/Auntenticado";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"
import { URL } from "../../URL";
import Post from "../../components/post/Post";


export default function Saved() {
  const navigate = useNavigate();
  const [role,setRole]=useState("")
  const [userId,setUserId]=useState("")
  const [saves,setSaves]=useState([])
  const [guardado, setGuardado]=useState()
  
  useEffect(()=>{
    const getUser=async ()=>{
      const token= window.localStorage.getItem("token")
      const decodedToken=jwt_decode(token)
      setUserId(decodedToken.id)
      setRole(decodedToken.role)
      if(role=="admin"){
        navigate("/unauthorized");
      }else{
        try {
          const res=await axios.get(`${URL}api/posts/savedpost/${userId}`)
          setSaves(res.data)
          setGuardado(true)
        } catch (error) {
          console.log(error);
        }
      }
  }
  getUser()
},[userId])
console.log(saves);

return (
  <>
    <Autenticado>
    <Topbar />
      <div className="savedContainer">      
        <Sidebar />
        <div className="saved">
          <div className="savedWrapper">
            {saves.map((p,key) => (
              <Post key={key} post={p} saved={guardado} />
            ))} 
          </div>
        </div>
      </div>
    </Autenticado>
    </>
  )
}
