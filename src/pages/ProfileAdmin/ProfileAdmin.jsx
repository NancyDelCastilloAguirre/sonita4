import "./profileAdmin.css";
import TopbarAdmin from "../../components/topbarAdmin/TopbarAdmin";
import SidebarAdmin from "../../components/sidebarAdmin/SidebarAdmin";
import Feed from "../../components/feed/Feed";
import RightbarAdmin from "../../components/rightbarAdmin/RightbarAdmin";
import Autenticado from "../../components/Autenticado/Auntenticado";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { URL } from "../../URL";
import { PF } from "../../PF"

export default function ProfileAdmin() {
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
      <div className="profileAdm">
        <SidebarAdmin />
        <div className="profileAdmRight">
          <div className="profileAdmRightTop">
            <div className="profileAdmCover">
              <div className="profileAdmBG">
                <img
                  className="profileAdmCoverImg"
                  src={PF+user.coverPicture}
                  alt=""
                />
              </div>
              <span >
              <div className="profileAdmPic">
                <img
                  className="profileAdmUserImg"
                  src={PF+user.profilePicture}
                  alt=""
                  />
              </div>
              </span>
            </div>
            <div className="profileAdmInfo">
                <h4 className="profileAdmInfoName">{user.username}</h4>
                <span className="profileAdmInfoDesc">{user.desc}</span>
                <span className="profileAdmInfoDesc">{user.email}</span>
            </div>
          </div>
          <div className="profileAdmRightBottom">
            <div className="profileFeed"><Feed /></div>
            <div className="profileRightbar"><RightbarAdmin profile/></div>
          </div>
        </div>
      </div>
    </Autenticado>
    </>
  );
}
