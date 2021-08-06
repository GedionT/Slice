import React, { useState , useEffect} from "react";
import Menu from "./menu";
import Chatbot from "./chatbot";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
//usehistory to redirect
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container } from "@material-ui/core";
import axios from "axios";
import {Bar , Line} from 'react-chartjs-2';
import AssessmentIcon from '@material-ui/icons/Assessment';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paper2: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontSize:"20px"
  },
}));
const Progress = () => {
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

     
  const [daily, setDaily] = useState(0);
  const [past, setPast] = useState(0);
  
  const [daily2, setDaily2] = useState(0);
  const [past2, setPast2] = useState(0);

  const userid = localStorage.getItem("userid");
  useEffect(() => {
    // This gets called after every render, by default
    // (the first one, and every one after that)
    console.log('render!');
  //coding report
  axios.post(`https://slice--back.herokuapp.com/api/data/front/data/get/${userid}/goal/code`)
  .then(response => {setDaily2(response.data.data.daily_hours); 
});
axios.post(`https://slice--back.herokuapp.com/api/data/front/data/get/${userid}/past/code`)
  .then(response => {setPast2(response.data.data.last_week); 
});
//reading report
axios.post(`https://slice--back.herokuapp.com/api/data/front/data/get/${userid}/goal/read`)
  .then(response => {setDaily(response.data.data.daily_read); 
});
axios.post(`https://slice--back.herokuapp.com/api/data/front/data/get/${userid}/past/read`)
  .then(response => {setPast(response.data.data.past_read); 
});

  }, [userid]);
  

const state = {
    labels: ['Monday', 'Tuesday', 'Wednesday',
             'Thrusday', 'Friday','Saturday'],
    datasets: [
      {
        label: 'Past Week',
        backgroundColor: '#FF7600',
        borderColor: '#FF7600',
        borderWidth: 1,
        data: past
      },{
        label: 'Current Week',
        backgroundColor: '#28FFBF',
        borderColor: '#28FFBF',
        borderWidth: 1,
        data: daily
      },
    ]
  }
  const state2 = {
    labels: ['Monday', 'Tuesday', 'Wednesday',
             'Thrusday', 'Friday','Saturday'],
    datasets: [
      {
        label: 'Past Week',
        backgroundColor: '#FE9898',
        borderColor: '#FE9898',
        borderWidth: 1,
        data: past2
      },{
        label: 'Current Week',
        backgroundColor: '#B980F0',
        borderColor: '#B980F0',
        borderWidth: 1,
        data: daily2
      },
    ]
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
      <div className={classes.root}>
  <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper2}><AssessmentIcon/> Progress Report
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}> Reading Progress  Report
          <Bar 
          data={state}
          options={{
            title:{
              display:true,
              text:'Reading Progress  Report',
              fontSize:14},
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}> Coding Progress  Report
          <Bar 
          data={state2}
          options={{
            title:{
              display:true,
              text:'Coding Progress  Report',
              fontSize:14},
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
          </Paper>
        </Grid>
       
      </Grid>
      </Container>
    </div>
   
      
      <Chatbot />
    </div>
  );
};

export default Progress;



