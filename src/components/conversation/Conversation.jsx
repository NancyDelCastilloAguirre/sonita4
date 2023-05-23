import { useEffect, useState } from "react"
import "./conversation.css"
import axios from "axios"
import { PF } from "../../PF"
import { URL } from "../../URL"

export default function Conversation(props) {
  const [user, setUser]=useState(null)

  useEffect(()=>{
    const friendId= props.conversation.members.find((m)=>m !== props.currentUser)
    const getUser = async() =>{
      try{
        const res= await axios(`${URL}api/users?userId=` + friendId)
        setUser(res.data)
      }catch(err){
        console.log(err);
      }     
    }
    getUser()
  }, [props])

  return (
    <div className="conversation">
      {user && <img className="conersationImg" src={PF+user.profilePicture} alt="" />}
      {user && <span className="conversationName">{user.username}</span>}
    </div>
  )
}
