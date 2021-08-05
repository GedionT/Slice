import React, { useState } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import gif from '../assets/SLICE.gif'
import signupgif from '../assets/signup.png'
import { useHistory } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${gif})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
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
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Login = () => {
  let history = useHistory();

  const classes = useStyles();
  const [showing, setShowing] = useState(true);
  const [success, setSuccess] = useState(false);
  const loginSubmit = ()=> {

    if(document.getElementById("github") && document.getElementById("password"))
    {
      const logindata = {
      "githubUsername": document.getElementById("github").value ,
      "password": document.getElementById("password").value
  };
  axios.post('https://slice--back.herokuapp.com/api/users/account/login/', logindata)
            .then(response => {setSuccess(response.data.data.success ); 
                localStorage.setItem("userid",response.data.data.userid );
            localStorage.setItem("token", response.data.data.token);
          });
  }

  if(success)
  {
    history.push("/home");

  }
  }
  
  const signupSubmit = ()=> {
    var success ;
    if(document.getElementById("github") && document.getElementById("password"))
    {
      const signupdata = {
        "name":document.getElementById("firstName").value+" "+document.getElementById("lastName"),
        "email":document.getElementById("email").value,
        "githubUsername": document.getElementById("github").value ,
        "password": document.getElementById("password").value,
        "number":document.getElementById("number").value
  };
  axios.post('https://slice--back.herokuapp.com/api/users/account/signup', signupdata)
    .then(response => {setSuccess(response.data.data.success )});
}
    if(success)
    {
    history.push("/");

    }
  }
        

  return (
    <div>
      {showing ? (
        <div className="Login">
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="github"
                    label="GitHub Username"
                    name="github"
                    autoComplete="github"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={loginSubmit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link
                        href="#"
                        variant="body2"
                        onClick={() => setShowing(!showing)}
                      >
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </form>
              </div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div className="signup"  className={classes.image2} >
          <Grid container component="main"  >
          <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper} >
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up 
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="github"
                      label="GitHub Username"
                      name="github"
                      autoComplete="github"
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="number"
                      label="Mobile"
                      name="number"
                      autoComplete="number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={signupSubmit}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link
                      href="#"
                      variant="body2"
                      onClick={() => setShowing(!showing)}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
              <Box mt={4}>
              <Copyright  />
              </Box>
            </div>
            
            </Container>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Login;
