import React from "react";
import Menu from "./menu";
import Graph from "./graph";
import Chatbot from "./chatbot";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Main = (response) => {
  const classes = useStyles();
  return (
    <div className="Main" >
      <AppBar position="static">
      <Toolbar>

        <Menu /> 
         <Typography variant="h6" className={classes.title}>
         &emsp; SLICE
    </Typography>
    <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>

      
      <br/>
      <Graph />
      <Chatbot />
    </div>
  );
};

export default Main;
