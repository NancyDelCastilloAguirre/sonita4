import "./message.css";
import { format } from "timeago.js";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { URL } from "../../URL";
import { PF } from "../../PF";

export default function Message({ message, own, convo }) {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});

  // Conseguir datos del usuario y del perfil
  useEffect(() => {
    const getUserAndProfile = async () => {
      const token = window.localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      setUserId(decodedToken.id);

      try {
        const userRes = await axios.get(`${URL}api/users?userId=${decodedToken.id}`);
        setUser(userRes.data);

        const profileId = convo.members.find((item) => item !== decodedToken.id);
        const profileRes = await axios.get(`${URL}api/users?userId=${profileId}`);
        setProfile(profileRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserAndProfile();
  }, [convo.members]);

  const profilePicture = own ? user.profilePicture : profile.profilePicture;

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={`${PF}${profilePicture}`} alt="" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
