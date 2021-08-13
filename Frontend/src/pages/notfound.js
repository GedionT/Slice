import React from 'react';
import hargun from '../assets/hargun.png'
import shivam from '../assets/shivam.jpg'
import gedion from '../assets/gedion.jpg'
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { Grid } from '@material-ui/core';
import { Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue, red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';;


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  
  },
  media: {
    height: 100,
    width:300,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  notfound:{
    backgroundColor: blue[700],
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    fontSize: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height:"95.5vh",
  },
  collapsy:{
    position: "absolute"

  }
 
}));
export default function NotFound() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  function handleclick(e){
    setOpen(true);
  }
  return (
    <div className={classes.notfound}>
       <Collapse in={open} className={classes.collapsy} >
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
         Thank for Voting ! Surely , We will catch the mice :)
        </Alert>
      </Collapse>
      <Paper className={classes.paper}>
        <h1>Error 404</h1>
        <h3>Whom do you think is responsible?</h3>
      <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
              <Card className={classes.root}>
      <CardHeader
        title="Gedion"
        subheader="I'm just escaping !! "
      />
      <CardMedia
        className={classes.media}
        image={gedion}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        Let me find my Spider web !!
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"  onClick={e => handleclick(e)}>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
            </Grid>
            
            
      <Grid item xs={12} sm={4}>
              <Card className={classes.root}>
      <CardHeader
        title="Shivam"
        subheader="Let me drive !"
      />
      <CardMedia
        className={classes.media}
        image={shivam}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          I wont crash !!
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={e => handleclick(e)}>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card className={classes.root}>
      <CardHeader
        title="Hargun"
        subheader="Let me sleep !"
      />
      <CardMedia
        className={classes.media}
        image={hargun}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          I said it was not me !!
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"  onClick={e => handleclick(e)}>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
            </Grid>
            
            
            </Grid>
         
       
     

    
    
    </Paper>
      
    </div>
  );
}
