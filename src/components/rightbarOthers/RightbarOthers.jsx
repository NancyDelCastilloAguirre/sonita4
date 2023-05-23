import axios from "axios";
import React, { useState, useEffect } from "react";
import "./rightbarOthers.css";
import { URL } from "../../URL";
import FollowButton from "../followBotton/followBotton";
import ChatButton from "../chatButton/ChatButton";
import Autenticado from "../Autenticado/Auntenticado";


export default function RightbarOthers({ profileId }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER_A;
  const userId = profileId;

  const [user, setUser] = useState("");
  const [rol, setRol] = useState("");

  // Obtener data del usuario
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `${URL}api/users?userId=${userId}`
        );
        setUser(res.data);
        setRol(res.data.role);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [userId]);

  const AdmRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Información de Usuario</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Encargado:</span>
            <span className="rightbarInfoValue">{user.encargado}</span>
          </div>
        </div>
      </>
    );
  };

  const UserRightbar = () => {
    return (
      <>
      <Autenticado>
        <h4 className="rightbarTitle">Información de Usuario</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Carrera:</span>
            <span className="rightbarInfoValue">{user.carrera}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Semestre:</span>
            <span className="rightbarInfoValue">{user.semestre}</span>
          </div>
        </div>
      </Autenticado>
      </>
    );
  };

  return (
    <Autenticado>
    <div className="rightbar">
      <div className="rightbarWrapper">
          <FollowButton profileId={userId} />
          <ChatButton profileId={userId} />
        {rol === "admin" ? <AdmRightbar /> : <UserRightbar />}
      </div>
    </div>
    </Autenticado>

  );
}
