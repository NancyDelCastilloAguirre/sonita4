import avatar from "../../";
import {Avatar, Box, Chip, Typography} from "@mui/material";
import "./message.css"
import {format} from "timeago.js"
import { useState } from "react";


export default function Message(props) {
    const [avatar,setAvatar]=useState("");

    
  return (
    <div>
      <Box className="messageTop"
        sx={{
          my: 2,
          display: "flex",
          flexFlow: "row",
          justifyContent: props.isCustomer ? "right" : "left",
        }}
      >
        {!props.isCustomer && (
          <div className="messageImg">
            <img src={avatar} alt="Chatbot avatar" width={34}/>
          </div>
        )}
        <Box className="messageText">
          <Typography gutterBottom component="div" sx={{mt: 1.5}}>
            {props.content}
          </Typography>
          {props.image && (
            <img src={props.image} alt="Bot response" style={{width: "100%"}}/>
          )}
          {!props.isCustomer && props.choices && (
            <div sx={{mt: 1}}>
              {props.choices.map((choice, index) => (
                <Chip
                  key={index}
                  label={choice}
                  onClick={() => props.handleChoice(choice)}
                  sx={{mr: 0.5, mb: 0.5}}
                />
              ))}
            </div>
          )}
          <div className="messageBottom">
            {format(props.createdAt)}
        </div>
        </Box>
      </Box>
    </div>
  );
}