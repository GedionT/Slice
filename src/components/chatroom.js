import React,{useEffect} from "react";
import Menu from "./menu";
import Chatbot from "./chatbot";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
//usehistory to redirect
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));
const ChatRoom = () => {
  let history = useHistory();
  const classes = useStyles();

  //checking jwt tokens
  useEffect(() => {
      if(!localStorage.getItem("token")){
        history.push("/");
      }
  }, [history]);

    //logout function
    const logout =()=>{
      localStorage.removeItem("userid");
      localStorage.removeItem("token");
      history.push("/");
     }
  

  return (
    <div className="Main" >
      <AppBar position="static">
      <Toolbar>
        <Menu /> 
         <Typography variant="h6" className={classes.title}>
         &emsp; SLICE
    </Typography>
    <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>

      
      <br/>
      <div>  ChatRoom</div>
   
      
      <Chatbot />
    </div>
  );
};

export default ChatRoom;



