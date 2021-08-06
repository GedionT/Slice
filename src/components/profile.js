import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./menu";
import Chatbot from "./chatbot";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
//usehistory to redirect
import { useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FaceIcon from '@material-ui/icons/Face';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import Divider from "@material-ui/core/Divider";
import signupgif from '../assets/signup.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
   image2: {
    backgroundImage: `url(${signupgif})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize:"100% 100%",
    backgroundPosition: "center",
    height: "100vh",
  },
}));
const Profile = () => {
  let history = useHistory();
  const classes = useStyles();
  const userid = localStorage.getItem("userid");
  const [Name, setName] = useState(0);
  const [Email, setEmail] = useState(0);
  const [GitHub, setGitHub] = useState(0);
  const [Number, setNumber] = useState(0);

  //checking jwt tokens
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    }
  }, [history]);

  useEffect(() => {
    // This gets called after every render, by default
    // (the first one, and every one after that)
    console.log("render!");
    axios
      .post(
        `https://slice--back.herokuapp.com/api/users/account/${userid}/info`
      )
      .then((response) => {
        setName(response.data.data.name);
        setEmail(response.data.data.email);
        setGitHub(response.data.data.githubUsername);
        setNumber(response.data.data.number);

      });
  }, [userid]);

  //logout function
  const logout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("token");
    history.push("/");
  };
const sendNotification = ()=>{
  axios
      .post(
        `https://slice--back.herokuapp.com/api/data/front/data/reply/${userid}/send`
      )
      .then((response) => {console.log("Notification sent !")});
}
  return (
    <div className="Main" className={classes.image2}>
      <AppBar position="static">
        <Toolbar>
          <Menu />
          <Typography variant="h6" className={classes.title}>
            &emsp; SLICE
          </Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <br />
      <div>
        {" "}
        <Container>
          <Grid container spacing={3} >
            <Grid item xs={12}  > 
              <Paper className={classes.paper} >
                <img
                  src={`https://eu.ui-avatars.com/api?name=${localStorage.getItem(
                    "github"
                  )}&&size=80&background=random&rounded=true`}
                />

                <List className={classes.list} >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FaceIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Name" secondary={Name} />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <EmailIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Email" secondary={Email} />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <GitHubIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="GitHub Username"
                      secondary={GitHub}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PhoneAndroidIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Mobile"
                      secondary={Number||"Not Provided"}
                    />
                  </ListItem>
                </List>
                <Button
                  
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={sendNotification}
                >Send Notification !</Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      
      </div>
   
                      <Chatbot />
    </div>
  );
};

export default Profile;
