import "./post.css"
import { BookmarkBorderOutlined, Bookmark } from "@mui/icons-material"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { URL } from "../../URL"
import { PF } from "../../PF"
import { format } from "timeago.js"
import jwt_decode from "jwt-decode"
import EditPost from "../editPost/EditPost"
import DeletePost from "../deletePost/DeletePost"

export default function Post(props) {
  const [username, setUsername] = useState()
  const [userId, setUserid] = useState("")
  const [userPicture, setUserPicture] = useState("")
  const post = props.post
  const id = post.userId
  const [guardado, setGuardado] = useState(props.saved)
  const token = window.localStorage.getItem("token")
  const decodeToken = jwt_decode(token)
  const currentUser = decodeToken.id
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${URL}api/users?userId=${id}`)
        setUsername(res.data.username)
        setUserid(res.data.userId)
        setUserPicture(res.data.profilePicture)
      } catch (error) {
        console.log("ERRO" + error)
      }
    }
    fetchUser()
  }, [])

  const Save = async () => {
    try {
      const response = await axios.put(`${URL}api/users/${post._id}/save`, {
        userId: decodeToken.id,
      })
      setGuardado(true)
    } catch (err) {
      console.log(err)
    }
  }

  const unSave = async () => {
    try {
      const response = await axios.put(`${URL}api/users/${post._id}/unsave`, {
        userId: decodeToken.id,
      })
      setGuardado(false)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = () => {
    if (currentUser !== post.userId) {
      console.log("NO MISMO USER")
    }
    console.log("hola")
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={PF + userPicture}
              alt=""
            />
            <div>
              {currentUser === post.userId ? (
                <Link to="/profileadmin/">
                  <span className="postUsername">{username}</span>
                </Link>
              ) : (
                <Link to={`/others/${post.userId}`} state={{ some: post.userId }}>
                  <span className="postUsername">{username}</span>
                </Link>
              )}
              <p><span className="postDate">{format(post.createdAt)}</span></p>
              <p className="postAsunto">{post?.asunto}</p>
            </div>
          </div>
          <div className="postTopRight">
            {currentUser === post.userId && (
              <>
                <EditPost className="postTopRightIcon" postid={props} />
                <span onClick={handleDelete}>
                  <DeletePost className="postTopRightIcon" userId={post._id} />
                </span>
              </>
            )}
          </div>
        </div>
        <div className="postCenter">
                <div className="postDescripcion">{post?.desc}</div>
                <a href={post?.link}><div className="postLink">{post?.link}</div></a>
                <img className='postImg' src={PF+post.img} alt=""></img>
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                </div>
                <div className="postBottomRight">
                    {
                        guardado ? <span onClick={unSave}> <Bookmark sx={{ fontSize:35 }} htmlColor="#C0A8B4"/> </span> : <span onClick={Save} ><BookmarkBorderOutlined sx={{ fontSize:35 }} htmlColor="#C0A8B4"/></span> 
                    }              
                </div>
            </div>
        </div>
    </div>
  )
}
