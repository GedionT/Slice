import React, { useEffect } from "react";
import Menu from "./menu";
import Chatbot from "./chatbot";
import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
//usehistory to redirect
import { useHistory } from 'react-router-dom';
import { Input } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import './chatroom.css';
//socket.io for chatbackend
import { io } from "socket.io-client";
//firebase
import firebase from "firebase";
import config from "../hooks/firebaseConfig";

const socket = io('https://slicechat.herokuapp.com/', { transports: ['websocket'] });


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },

}));


const userid = localStorage.getItem("userid");
  const githubUsername = localStorage.getItem("github");
  const PERSON_IMG = `https://eu.ui-avatars.com/api?name=${githubUsername}&&size=80&background=random&rounded=true`;


socket.emit('join-room', 'globalchat', userid, githubUsername);

socket.on('createMessage', (msg, userName, givenId) => {
  if (givenId === userid) {
    console.log("hi");
    appendMessage(userName, PERSON_IMG, "right", msg);
  }
  else
    appendMessage(userName, `https://eu.ui-avatars.com/api?name=${userName}&&size=80&background=random&rounded=true`, "left", msg);

})


const appendMessage = (name, img, side, text) => {
  
  const messageBox = document.getElementById("messageBox");
  const msgHTML = `
   <div class="msg ${side}-msg">
     <div class="msg-img" style="background-image: url(${img})"></div>
     <div class="msg-bubble">
       <div class="msg-info">
         <div class="msg-info-name">${name}</div>
         <div class="msg-info-time">${formatDate(new Date())}</div>
       </div>
       <div class="msg-text">${text}</div>
     </div>
   </div>
 `;

  messageBox.insertAdjacentHTML("beforeend", msgHTML);
  messageBox.scrollTop += 500;
}

const appendMessage2 = (name, img, side, text, time) => {
  
  const messageBox = document.getElementById("messageBox");
  const msgHTML = `
   <div class="msg ${side}-msg">
     <div class="msg-img" style="background-image: url(${img})"></div>
     <div class="msg-bubble">
       <div class="msg-info">
         <div class="msg-info-name">${name}</div>
         <div class="msg-info-time">${time}</div>
       </div>
       <div class="msg-text">${text}</div>
     </div>
   </div>
 `;

 if(messageBox) {messageBox.insertAdjacentHTML("beforeend", msgHTML);
  messageBox.scrollTop += 500;}
}


const formatDate = (date) => {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}else {
  firebase.app(); // if already initialized, use that one
}



  const ChatRoom = () => {  
  let history = useHistory();
  const classes = useStyles();
  var messageset = 1;
 useEffect(()=>{
 if(messageset){
  firebase.database().ref('/').on('value', (snapshot) => {
 
 if(messageset){snapshot.forEach(element => {
  
     if (element.val().userid === userid) {
       appendMessage2(element.val().githubUsername, PERSON_IMG, "right", element.val().msg,element.val().time);
     }
     else
       appendMessage2(element.val().githubUsername, `https://eu.ui-avatars.com/api?name=${element.val().githubUsername}&&size=80&background=random&rounded=true`, "left",element.val().msg,element.val().time);
 
    });
   }
   messageset=0;
 });
  
  }
 })




  //checking jwt tokens
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    }
  }, [history]);

  //logout function
  const logout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("token");
    localStorage.removeItem("github");
    history.push("/");
  }

  const sendMessage = () => {
    const msgInput = document.getElementById("msgInput");
    if(msgInput)
    {var msg = msgInput.value;
    if (msg != "") {
      console.log("i emit");
      socket.emit('message', msg);
      var time = formatDate(new Date());
      const msgobj ={
        time, msg,githubUsername,userid 
      }
      firebase.database().ref("/").push(msgobj);

      msgInput.value = "";
    }}

  }


  document.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      sendMessage();
    }
  });



  

  return (
    <div className="Main" >
      <AppBar position="static">
        <Toolbar>
          <Menu />
          <Typography variant="h6" className={classes.title}>
            &emsp; SLICE Share
          </Typography>

          
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <div className="msger" >
        <div className="main__header">Doubt Discussion</div>
        <div id="messageBox" className="msger-chat"></div>
        <div  className="msg_in"><Input placeholder="Type Here ..." inputProps={{ 'aria-label': 'description' }}  id="msgInput" defaultValue="" /> <Button variant="outlined" size="small" color="primary" onClick={sendMessage}> <SendIcon /></Button>
        </div>
        </div>



      <Chatbot />
    </div>
  );
};

export default ChatRoom;



