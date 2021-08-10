import React, { useState, useEffect } from "react";
import Menu from "../components/menu";
import Chatbot from "../components/chatbot";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
//use-history to redirect
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import axios from "axios";
import { Line } from "react-chartjs-2";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paper2: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    fontSize: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper3: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    fontSize: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 300,
  },
}));
const Goals = () => {
  let history = useHistory();
  const classes = useStyles();

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
    history.push("/");
  };

  const [goals, setGoals] = useState(0);
  const [daily, setDaily] = useState(0);
  const [goals2, setGoals2] = useState(0);
  const [daily2, setDaily2] = useState(0);
  const [mo, setmo] = useState(0);
  const [tu, settu] = useState(0);
  const [wed, setwed] = useState(0);
  const [th, setth] = useState(0);
  const [fr, setfr] = useState(0);
  const [sa, setsa] = useState(0);

  const userid = localStorage.getItem("userid");
  useEffect(() => {
    // This gets called after every render, by default
    // (the first one, and every one after that)
    console.log("render!");
    axios
      .post(
        `https://slice--back.herokuapp.com/api/data/front/data/get/${userid}/goal/code`
      )
      .then((response) => {
        setGoals(response.data.data.goals);
      });
    axios
      .post(
        `https://slice--back.herokuapp.com/api/data/front/data/get/${userid}/goal/code`
      )
      .then((response) => {
        setDaily(response.data.data.daily_hours);
      });
    axios
      .post(
        `https://slice--back.herokuapp.com/api/data/front/data/get/${userid}/goal/read`
      )
      .then((response) => {
        setGoals2(response.data.data.daily_read);
      });
    axios
      .post(
        `https://slice--back.herokuapp.com/api/data/front/data/get/${userid}/goal/read`
      )
      .then((response) => {
        setDaily2(response.data.data.past_read);
      });
  }, [userid]);

  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thrusday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Daily Coding Hours",
        data: daily,
        fill: true,
        backgroundColor: "rgba(50,0,0,0.2)",
        borderColor: "#FF3F00",
      },
      {
        label: "Daily Coding Goals",
        data: goals,
        fill: false,
        borderColor: "#141E61",
      },
    ],
  };

  const data2 = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thrusday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Daily Read",
        data: daily2,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Past Read",
        data: goals2,
        fill: false,
        borderColor: "#742774",
      },
    ],
  };
  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 15,
      label: "15",
    },
    {
      value: 24,
      label: "24",
    },
  ];

  const valuetext = (value) => {
    return `${value}`;
  };

  //set goals function
  const setgoals = () => {
    const goals = { goals: [mo, tu, wed, th, fr, sa, 0] };
    console.log(goals);
    axios
      .post(
        `https://slice--back.herokuapp.com/api/users/account/${userid}/edit`,
        goals
      )
      .then((response) => {});
    axios
      .post(
        `https://slice--back.herokuapp.com/api/data/front/data/get/${userid}/goal/code`
      )
      .then((response) => {
        setGoals(response.data.data.goals);
      });
  };
  return (
    <div className="Main">
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
      <div className={classes.root}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                {" "}
                <TrackChangesIcon /> Weekly Goals Report
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                {" "}
                Coding Goals Achieved Report
                <Line data={data} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                {" "}
                Reading Goals Achieved Report
                <Line data={data2} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                {" "}
                <TrackChangesIcon /> Edit Goals
                <div className={classes.paper3}>
                  <Typography id="discrete-slider-custom" gutterBottom>
                    Monday
                  </Typography>
                  <Slider
                    defaultValue={1}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    max={24}
                    valueLabelDisplay="auto"
                    marks={marks}
                    onChange={(e, value) => setmo(value)}
                  />
                  <Typography id="discrete-slider-custom" gutterBottom>
                    Tuesday
                  </Typography>
                  <Slider
                    defaultValue={1}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    max={24}
                    valueLabelDisplay="auto"
                    marks={marks}
                    onChange={(e, value) => settu(value)}
                  />
                  <Typography id="discrete-slider-custom" gutterBottom>
                    Wednesday
                  </Typography>
                  <Slider
                    defaultValue={1}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    max={24}
                    valueLabelDisplay="auto"
                    marks={marks}
                    onChange={(e, value) => setwed(value)}
                  />
                  <Typography id="discrete-slider-custom" gutterBottom>
                    Thursday
                  </Typography>
                  <Slider
                    defaultValue={1}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    max={24}
                    valueLabelDisplay="auto"
                    marks={marks}
                    onChange={(e, value) => setth(value)}
                  />
                  <Typography id="discrete-slider-custom" gutterBottom>
                    Friday
                  </Typography>
                  <Slider
                    defaultValue={1}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    max={24}
                    valueLabelDisplay="auto"
                    marks={marks}
                    onChange={(e, value) => setfr(value)}
                  />
                  <Typography id="discrete-slider-custom" gutterBottom>
                    Saturday
                  </Typography>
                  <Slider
                    defaultValue={1}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    max={24}
                    valueLabelDisplay="auto"
                    marks={marks}
                    onChange={(e, value) => setsa(value)}
                  />
                  <br />
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    className={classes.submit}
                    onClick={setgoals}
                  >
                    Set Goals!
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>

      <Chatbot />
    </div>
  );
};

export default Goals;
