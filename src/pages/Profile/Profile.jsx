import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Autenticado from "../../components/Autenticado/Auntenticado";
import EditPP from "../../components/editPP/EditPP";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { URL } from "../../URL";
import { PF } from "../../PF"

export default function Profile() {
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
      if(role=="admin"){
        navigate("/unauthorized");
      }else{
        try {
          const res=await axios.get(`${URL}api/users?userId=${userId}`)
          setUser(res.data);
        } catch (error) {
          console.log(error);
        }        
      }
  }
  getUser()
},[userId])
 
  return (
    <>
    <Autenticado>
    <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={PF+user.coverPicture}
                alt=""
              >
              </img>
              <span >
              <img
                className="profileUserImg"
                src={PF+user.profilePicture}
                alt=""
                />
              </span>
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
                <span className="profileInfoDesc">{user.email}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <div className="profileFeed"><Feed /></div>
            <div className="profileRightbar"><Rightbar profile/></div>
          </div>
        </div>
      </div>
    </Autenticado>
    </>
  );
}
