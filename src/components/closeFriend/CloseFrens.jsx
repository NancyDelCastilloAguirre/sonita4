import "./closeFriend.css";
import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import axios from "axios";
import { URL } from "../../URL";
import { PF } from "../../PF";
import FollowButtonBig from "../followBottonBig/FollowButtonBig";
export default function CloseFrens({userid}) {
const [user,setUser]=useState([])
  useEffect(()=>{
    const getUser=async ()=>{
    
    try {
            const res=await axios.get(`${URL}api/users?userId=${userid}`)
            setUser(res.data);
          } catch (error) {
            console.log("ERROR EN PERFIL ADMIN");
            console.log(error);
          }
  }
  getUser()
},[userid])
  
  return (
    <div className="closeFriendContainer">
      <div className="closeFriendsLeft">
        <li className="closeFriend">
          <img className="closeFriendImg" src={PF+user.profilePicture} alt="" />
          <Link to={`/others/${user._id}`} state={{ some: user._id }}>
            <span className="closeFriendName">{user.username} </span>       
          </Link>  
        </li>
      </div>
      <div className="closeFriendsRight">
        <FollowButtonBig className="buttonFollow" profileId={user._id}/>
      </div>
    </div>
  );
}
