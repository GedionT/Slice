import React, { useState , useEffect} from "react";
import axios from "axios";
import {Bar , Line} from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));






const Graph =()=> {
  const classes = useStyles();

  const [goals, setGoals] = useState(0);
  const [daily, setDaily] = useState(0);
  const [past, setPast] = useState(0);

  const userid = localStorage.getItem("userid");
  useEffect(() => {
    // This gets called after every render, by default
    // (the first one, and every one after that)
    console.log('render!');
    axios.post(`https://slice--back.herokuapp.com/api/data/front/data/get/${userid}/goal`)
    .then(response => {setGoals(response.data.data.goals); 
  });
  axios.post(`https://slice--back.herokuapp.com/api/data/front/data/get/${userid}/goal`)
  .then(response => {setDaily(response.data.data.daily_hours); 
});
axios.post(`https://slice--back.herokuapp.com/api/data/front/data/get/${userid}/past`)
  .then(response => {setPast(response.data.data.last_week); 
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
   
  
const data = {
  labels: ['Monday', 'Tuesday', 'Wednesday',
  'Thrusday', 'Friday','Saturday'],
  datasets: [
    {
      label: "Daily Hours",
      data: daily,
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Goals",
      data: goals,
      fill: false,
      borderColor: "#742774"
    }
  ]
};

  
  return (
    <div className="Graph">

<div className={classes.root}>
  <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>24 Hour Report
          <Line data={data} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}> Progress Report
          <Bar 
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
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
          <Paper className={classes.paper}> Goals Achieved Report
          <Line data={data} />
          </Paper>
        </Grid>
        {/* <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid> */}
      </Grid>
      </Container>
    </div>
    </div>
  );
}

export default Graph;



