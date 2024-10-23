import React, { useEffect, useState } from 'react';
import {user} from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css"
import sendlogo from "../../image/send.png"
import Message from '../Message/Message';
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeicon from "../../image/closeIcon.png"

let socket;

const ENDPOINT = 'http://localhost:4500/';
const Chat = () => {

  const [id,setid]=useState("");

  const [message,setmessage]=useState([]);

  const send=()=>{
   const message = document.getElementById('chatInput').value;
    socket.emit('message',{message,id});
    document.getElementById('chatInput').value="";
  }
  useEffect(()=>{
    socket = socketIo(ENDPOINT,{transports:['websocket']});

    socket.on('connect',()=>{
      alert("connected");
      setid(socket.id);
    })

    socket.emit('joined',{user})   //data bhej raha hai --->user

    socket.on('welcome',(data)=>{
      setmessage([...message,data]);// pure msg ke array traverse ho usek baad data to add kr do
      console.log(data.user,data.message);
    })

    socket.on('userJoined',(data)=>{
      setmessage([...message,data]);
      console.log(data.user,data.message);
    })
    socket.on('leave',(data)=>{
      setmessage([...message,data]);
      console.log(data.user,data.message);
    })
    return ()=>{
      socket.emit('disconnected');
      socket.off();
    }
  },[])

  //for receveing
  useEffect(()=>{
    socket.on('sendMessage',(data)=>{
      setmessage([...message,data]);
      console.log(data.user,data.message);
    })
    return ()=>{
     socket.off();
    }
  },[message])

  return (
    <div className='chatPage'>
      <div className="chatContainer">
          <div className="header">
            <h2>C chat</h2>
          <a href="/"> <img src={closeicon} alt="" /> </a> 
          </div>
          <ReactScrollToBottom className="chatBox">
            {/* //now item is an object which contains user,message,id */}
          {message.map((item,i)=><Message user={item.id===id?'':item.user}  message={item.message} classs={item.id===id?'right':'left'}/>)}
          </ReactScrollToBottom>

          <div className="inputBox">
            <input onKeyDown={(event) => event.key === 'Enter' ? send() : null} type="text" id='chatInput' />
            <button onClick={send} className="sendbtn"><img src={sendlogo} alt="send" /></button>
          </div>
        </div>
      </div>
  )
}
 
export default Chat
