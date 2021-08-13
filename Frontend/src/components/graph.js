import React, { useState , useEffect} from "react";
import axios from "axios";
import {Bar, Doughnut , Line} from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container } from "@material-ui/core";
import AssessmentIcon from "@material-ui/icons/Assessment";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.text.primary
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
  }
}));


const Graph =()=> {
  const classes = useStyles();

  const [lang, setLang] = useState(0);
  const [Efficiency, setEfficiency] = useState(0);

  const [langdata, setLangdata] = useState(0);
  const [dailyread, setdailyread] = useState(0);
  const [dailycode,setdailycode] = useState(0);


  const userid = localStorage.getItem("userid");
  useEffect(() => {
    // This gets called after every render, by default
    // (the first one, and every one after that)
    console.log('render!');
    axios.post(`https://slice--back.herokuapp.com/api/data/front/data/get/${userid}/language`)
    .then(response => {setLang(response.data.data.language); setLangdata(response.data.data.hours); 
  }); 
  axios.post(`https://slice--back.herokuapp.com/api/data/front/data/get/${userid}/efficiency`)
  .then(response => {setEfficiency(response.data.data.effeciency);  
}); 
axios.post(`https://slice--back.herokuapp.com/api/data/front/data/get/${userid}/current/read`)
.then(response => {setdailyread(response.data.data.daily_read);  
});  axios.post(`https://slice--back.herokuapp.com/api/data/front/data/get/${userid}/current/code`)
.then(response => {setdailycode(response.data.data.daily_hours);  
}); 

  }, [userid]);
  
  const state = {
    labels: lang,
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
        ],
        data: langdata
      }
    ]
  }
  const data2 = {
    labels: ['Monday', 'Tuesday', 'Wednesday',
    'Thrusday', 'Friday','Saturday'],
    datasets: [
      {
        label: "Efficiency",
        data: Efficiency,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
     
    ]
  };
  const state2 = {
    labels: ['Monday', 'Tuesday', 'Wednesday',
             'Thrusday', 'Friday','Saturday'],
    datasets: [
      {
        label: 'Daily Code',
        backgroundColor: '#FE9898',
        borderColor: '#FE9898',
        borderWidth: 1,
        data: dailycode
      },{
        label: 'Daily Read',
        backgroundColor: '#B980F0',
        borderColor: '#B980F0',
        borderWidth: 1,
        data: dailyread
      },
    ]
  }
  
  return (
    <div className="Graph">

<div className={classes.root}> 
  <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper2}> <AssessmentIcon/> 24 Hour Report 
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}> Language used
          <Doughnut
          data={state}
          options={{
            title:{
              display:true,
              text:'Languages used',
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
          </Paper>
        </Grid>
        <Grid item xs={11} sm={6}>
        <Grid >
          <Paper className={classes.paper}> Efficiency report
          <Line data={data2} />
        <br/>
           Daily Coding Vs Daily Reading
          <Bar data={state2}
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
        </Grid>
      </Grid>
      
      </Container>
    </div>
    </div>
  );
}

export default Graph;



