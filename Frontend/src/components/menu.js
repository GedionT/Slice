import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
//icons
import HomeIcon from "@material-ui/icons/Home";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import AssessmentIcon from "@material-ui/icons/Assessment";
import GitHubIcon from "@material-ui/icons/GitHub";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import ChatIcon from '@material-ui/icons/Chat';

import { grey } from "@material-ui/core/colors";
import MenuIcon from "@material-ui/icons/Menu";
//usehistory to redirect
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

// sidenav
const Menu = () => {
  let history = useHistory();
  const classes = useStyles();
  //navbar side = left
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  //logout function
  const logout = () => {
    localStorage.removeItem("userid");
    localStorage.removeItem("token");
    history.push("/");
  };

  // list of items of side nav
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem
          button
          key="Home"
          onClick={() => {
            history.push("/home");
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          key="Weekly Goals"
          onClick={() => {
            history.push("/goals");
          }}
        >
<<<<<<< HEAD
            <List>
                
                    <ListItem button key="Home" onClick={()=>{history.push("/home");}}>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button key="Weekly Goals" onClick={()=>{history.push("/goals");}}>
                        <ListItemIcon><TrackChangesIcon /></ListItemIcon>
                        <ListItemText primary="Weekly Goals" />
                    </ListItem>
                    <ListItem button key="Progess Report" onClick={()=>{history.push("/progress");}}>
                        <ListItemIcon><AssessmentIcon /></ListItemIcon>
                        <ListItemText primary="Progess Report" />
                    </ListItem>
                    <ListItem button key="Chat Rooms" onClick={()=>{history.push("/chat");}}>
                        <ListItemIcon><ChatIcon /></ListItemIcon>
                        <ListItemText primary="Chat Rooms" />
                    </ListItem>
            </List>
            <Divider />
            <List>
                    <ListItem button key="GitHub Report" onClick={()=>{history.push("/github");}}>
                        <ListItemIcon><GitHubIcon /></ListItemIcon>
                        <ListItemText primary="GitHub Report" />
                    </ListItem>
                    <ListItem button key="User Profile" onClick={()=>{history.push("/profile");}}>
                        <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                        <ListItemText primary="User Profile" />
                    </ListItem>
                    <ListItem button key="Logout" onClick={logout}>
                        <ListItemIcon>< ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
            </List>
        </div>
    );
=======
          <ListItemIcon>
            <TrackChangesIcon />
          </ListItemIcon>
          <ListItemText primary="Weekly Goals" />
        </ListItem>
        <ListItem
          button
          key="Progess Report"
          onClick={() => {
            history.push("/progress");
          }}
        >
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Progess Report" />
        </ListItem>
        {/* <ListItem button key="Chat Rooms" onClick={()=>{history.push("/chat");}}>
                        <ListItemIcon><ChatIcon /></ListItemIcon>
                        <ListItemText primary="Chat Rooms" />
                    </ListItem> */}
      </List>
      <Divider />
      <List>
        <ListItem
          button
          key="GitHub Report"
          onClick={() => {
            history.push("/github");
          }}
        >
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText primary="GitHub Report" />
        </ListItem>
        <ListItem
          button
          key="User Profile"
          onClick={() => {
            history.push("/profile");
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="User Profile" />
        </ListItem>
        <ListItem button key="Logout" onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
>>>>>>> 2fcaa012a3be37d18b269f6b9c744bca5a568ad6

  return (
    <div className="Menu">
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            mt={3}
            onClick={toggleDrawer(anchor, true)}
            style={{ color: grey[50], border: "1px solid white" }}
          >
            <MenuIcon style={{ color: grey[50] }} />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Menu;
