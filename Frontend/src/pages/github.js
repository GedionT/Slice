import React, { useEffect } from "react";
import Menu from "../components/menu";
import Chatbot from "../components/chatbot";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
//use-history to redirect
import { useHistory } from "react-router-dom";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.text.primary
    
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

const GitHubReport = () => {
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

      <div className={classes.root}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>
              <img
                src={`https://activity-graph.herokuapp.com/graph?username=${localStorage.getItem(
                  "github"
                )}&theme=react-dark`}
                alt="GitHub Activity Graph"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${localStorage.getItem(
                  "github"
                )}`}
                alt="GitHub General Stat"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <img
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${localStorage.getItem(
                  "github"
                )}`}
                alt="GitHub Language Stat"
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

export default GitHubReport;
