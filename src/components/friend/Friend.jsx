import "./friend.css"
import CloseFriend from "../closeFriend/CloseFrens"
import { URL } from "../../URL"
import axios from "axios"
import {useState, useEffect} from "react"
import jwt_decode from "jwt-decode"

export default function Feed() {
  const [users, setUsers]=useState([]); 
  const[user,setUser]=useState([]);
  const[followings,setFollow]=useState([])
  const [userId,setUserId]=useState("")

  useEffect(()=>{
    const getUser=async ()=>{
      const token= window.localStorage.getItem("token")
      const decodedToken=jwt_decode(token)
      setUserId(decodedToken.id)
    try {
            const res=await axios.get(`${URL}api/users?userId=${userId}`)
            setUser(res.data);
            setFollow(res.data.followings)
          } catch (error) {
            console.log("ERROR EN PERFIL ADMIN");
            console.log(error);
          }
  }
  getUser()

  
},[userId])

  useEffect(()=>{
   
    const fetchPost = async ()=>{
      try {
        const res=await axios.get(`${URL}api/users/all/users`)
        setUsers(res.data);
      } catch (error) {
          console.log(error);
      }
    };

    fetchPost();
  }, []) 
  // const followList=user.followings
  // console.log(followList);
  return (

    <div className="friend">
        <div className="friendWrapper">
            <ul className="friendList">
            {followings.map((u) => (
                <CloseFriend key={u.id} userid={u} />
            ))}
            </ul>
        </div>
    </div>
  )
}


