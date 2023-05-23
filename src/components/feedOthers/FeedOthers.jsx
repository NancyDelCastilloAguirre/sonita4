import "./feedOthers.css"
import Post from "../post/Post"
import axios from "axios"
import { useEffect, useState } from "react";
import { URL } from "../../URL";
import Autenticado from "../Autenticado/Auntenticado";

export default function FeedOthers(profileId) {
    const userId=profileId.profileId
    const [user, setUser]=useState("") 
    const [post, setPosts]=useState([]) 

    //Obtener data del usuario
    useEffect(()=>{
      const getUser=async ()=>{
        try {
          const res=await axios.get(`${URL}api/users?userId=${userId}`)
          setUser(res.data);
        } catch (error) {
            console.log(error);
        }
      }
      getUser()
    },[userId])

    //Obtener Posts del usuario
    useEffect(()=>{
      const fetchPost = async ()=>{
        try {
          const res=await axios.get(`${URL}api/posts/profile/${user.username}`)
          setPosts(res.data);
        } catch (error) {
            console.log(error);
        }
      };
      fetchPost();
    },[user.username])
    
    
    post.sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt))
    return (
      <Autenticado>
        
      <div className="feed">
          <div className="feedWrapper">
            {post.map((p,key)=>(
              <Post key={key} post={p} />
            ))}
          </div>
      </div>
      </Autenticado>
    )
  }