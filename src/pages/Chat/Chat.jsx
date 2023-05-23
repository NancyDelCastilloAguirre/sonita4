import "./chat.css";
import axios from "axios";
import { URL } from "../../URL";
import jwt_decode from "jwt-decode";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import TopbarAdmin from "../../components/topbarAdmin/TopbarAdmin";
import SidebarAdmin from "../../components/sidebarAdmin/SidebarAdmin";
import Conversation from "../../components/conversation/Conversation";
import React,{ useEffect, useRef, useState } from "react";
import ChatContent from "./ChatContent";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Autenticado from "../../components/Autenticado/Auntenticado";
import { Anchor, Drawer, Button } from 'antd';

export default function Chat() {
  const navigate = useNavigate();
  const [role,setRole]=useState("")
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [userId, setUserId] = useState("");
  const handleNewMessage = (newMsg) => {
    setMessages((prevMessages) => [...prevMessages, newMsg]);
  };
  useEffect(() => {
    const getConversations = async () => {
      const token = window.localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      setUserId(decodedToken.id);
      setRole(decodedToken.role)
        try {
          const res = await axios.get(`${URL}api/conversations/${decodedToken.id}`);
          setConversations(res.data);
        } catch (error) {
          console.log("ERROR: " + error);
        }        

    };
    getConversations();
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (currentChat !== null) {
      const getMessages = async () => {
        try {
          const res = await axios.get(`${URL}api/messages/${currentChat._id}`);
          setMessages(res.data);
        } catch (err) {
          console.log("ERROR: " + err);
        }
      };
      getMessages();
    }
  }, [currentChat]);

  const handleSubmit = async (message2) => {
    try {
      const res = await axios.post(`${URL}api/messages`, message2);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log("ERROR: " + err);
    }
  };

  // Obtener el createdConvoId de la ubicación actual
  const location = useLocation();
  const createdConvoId = location.state?.convo;

  // Asignar el createdConvoId al currentChat
  useEffect(() => {
    if (createdConvoId) {
      const selectedChat = conversations.find((chat) => chat._id === createdConvoId);
      setCurrentChat(selectedChat);
    }
  }, [createdConvoId, conversations]);

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
    <Autenticado>
      {role === "admin" ? <TopbarAdmin /> : <Topbar />}
      <div className="chat">
        <div className="chatSidebar">
          <div className="chatSidebarWrapper">
          {role === "admin" ? <SidebarAdmin /> : <Sidebar />}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <ChatContent
                messages={messages}
                userId={userId}
                handleSubmit={handleSubmit}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                currentChat={currentChat}
                handleNewMessage={handleNewMessage}
                setMessages={setMessages}
              />
            ) : (
              <span className="noConversationText">
                Abre una conversación para empezar <br /> a chatear
              </span>
            )}
          </div>
        </div>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div className="mobileHidden">
            <input placeholder="Buscar un chat con..." className="chatMenuInput" />
            {conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={userId} />
              </div>
            ))}
            </div>
        </div>

        <div className="mobileVisible">
          <center>
            <Button className="butt" onClick={showDrawer}>
            <i className="fas fa-bars"></i>Conversaciones
          </Button>
          </center>
          <Drawer
            className="draw"
            placement="bottom"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <input placeholder="Buscar un chat con..." className="chatMenuInput" />
            {conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={userId} />
              </div>
            ))}
          </Drawer>
        
          </div>
        </div>
      </div> 
    </Autenticado>
    </>
  );
}