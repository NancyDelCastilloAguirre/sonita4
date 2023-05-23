import "./savedp.css"
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"
import { URL } from "../../URL";
import Post from "../../components/post/Post";

export default function Savedp() {
  const [userId,setUserId]=useState("")
  const [saves,setSaves]=useState([])
  const [savedId, setSavedid]=useState([])
  
  useEffect(()=>{
    const getUser=async ()=>{
      const token= window.localStorage.getItem("token")
      const decodedToken=jwt_decode(token)
      setUserId(decodedToken.id)
    try {
            const res=await axios.get(`${URL}api/posts/savedpost/${userId}`)
            setSaves(res.data)
            console.log(res.data);
            setSavedid(res.data._id)
          } catch (error) {
            console.log("ERROR EN SavedPost");
            console.log(error);
          }
  }
  getUser()
},[userId])
return (
    <>
      <div className="saved">      
        <div className="savedWrapper">
        {saves.map((p,key) => (
          <Post key={key} post={p} savedId={savedId} />
        ))} 
        </div>
      </div>
    </>
  )
}
