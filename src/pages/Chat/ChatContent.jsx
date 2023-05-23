import React from "react";
import "./chat.css";
import Message from "../../components/message/Message";
import { Send } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Autenticado from "../../components/Autenticado/Auntenticado";
const ChatContent = ({
  messages,
  userId,
  newMessage,
  setNewMessage,
  currentChat,
  handleSubmit,
  handleNewMessage,
  setMessages,
}) => {
  const socket = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (newMessage) {
      const message = {
        sender: userId,
        text: newMessage,
        conversationId: currentChat._id,
      };

      socket.current.emit("message", { roomId: currentChat._id, message }); // Modifica esta línea
  setNewMessage("");
  await handleSubmit(message)
    }
  };

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(`https://socketsapi-production.up.railway.app`);
    }
  
    if (currentChat) {
      socket.current.emit("join", { roomId: currentChat._id, userId });
    }

    socket.current.on("message", (newMsg) => {
      handleNewMessage(newMsg);
    });
    
    return () => {
      if (socket.current) {
        if (currentChat) {
          socket.current.emit("leave", currentChat._id);
        }
        socket.current.disconnect();
        socket.current = null; // Asegúrate de asignar null al socket al desconectar
      }
    };
  }, [currentChat]);
  

  return (
    <>
    <Autenticado> 
      <div className="chatBoxTop">
        {messages.map((m) => (
          <Message key={m._id} message={m} own={m.sender === userId} convo={currentChat}/>
        ))}
      </div>
      <div className="chatBoxBottom">
        <textarea
          className="chatMessageInput"
          placeholder="Escribe tu mensaje"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        ></textarea>
        <button
          className="chatSubmit"
          onClick={(e) => {
            sendMessage(e, handleSubmit);
          }}
        >
          <Send sx={{ color: "white" }} />
        </button>
      </div>
    </Autenticado>
    </>
  );
};

export default ChatContent;
