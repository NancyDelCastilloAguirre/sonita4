import axios from "axios";
import "./profileOthers.css"
import jwt_decode from "jwt-decode"
import {useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import FeedOthers from "../../components/feedOthers/FeedOthers";
import TopbarAdmin from "../../components/topbarAdmin/TopbarAdmin";
import Autenticado from "../../components/Autenticado/Auntenticado";
import SidebarAdmin from "../../components/sidebarAdmin/SidebarAdmin";
import RightbarOthers from "../../components/rightbarOthers/RightbarOthers";
import { URL } from "../../URL";
import { PF } from "../../PF"

export default function ProfileOthers() {
  const token=window.localStorage.getItem("token");
  const decodeToken=jwt_decode(token)
  const currentUser=decodeToken.id;
  const [rol, setRol] = useState("")

  const { state } = useLocation();
  const profileId=state.some
  const [profileUser,setProfileUser] = useState("")

  //Obtener rol del currentUser
  useEffect(() => {
    const fetchRol = async () => {
      try {
        const res = await axios.get(
          `${URL}api/users?userId=${currentUser}`
        );
        setRol(res.data.role);
      } catch (error) {
        console.log("ERRO" + error);
      }
    };
    fetchRol();
  }, [currentUser]);

  //Obtener datos del profile 
  useEffect(() =>{
    const fetchProfile = async () => {
      try{
        const res = await axios.get(
          `${URL}api/users?userId=${profileId}`  
        )
        setProfileUser(res.data);
      } catch(error) {
        console.log("ERRO" + error);
      }
    } 
    fetchProfile()
  }, [profileId])

  return (
    <>
    <Autenticado>
    {rol === "admin" ? <TopbarAdmin /> : <Topbar />}
      <div className="profile">
        {rol === "admin" ? <SidebarAdmin /> : <Sidebar />}
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={PF+profileUser.coverPicture}
                alt=""
              >
              </img>
              <span >
              <img
                className="profileUserImg"
                src={PF+profileUser.profilePicture}
                alt=""
                />
              </span>
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{profileUser.username}</h4>
                <span className="profileInfoDesc">{profileUser.desc}</span>
                <span className="profileInfoDesc">{profileUser.email}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <div className="profileFeed"><FeedOthers profileId={profileUser._id} /></div>
            <div className="profileRightbar"><RightbarOthers profileId={profileUser._id} /></div>
          </div>
        </div>
      </div>
    </Autenticado>
    </>
  )
}
