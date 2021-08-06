import React from "react";
import "./App.css";
import Main from './components/main'
import Login from './components/loginSignup'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import GitHubReport from "./components/github";
import Goals from "./components/goals";
import Progress from "./components/progress";
import Profile from "./components/profile";
import ChatRoom from "./components/chatroom";

function App() {
  

  return (
    <Router>

    <div className="App">
     
      <Switch>
          <Route path="/" strict exact>
          <Login/>
          </Route>
          <Route path="/home" strict exact>
          <Main/>
          </Route>
          <Route path="/goals" strict exact>
          <Goals/>
          </Route>
          <Route path="/progress" strict exact>
          <Progress/>
          </Route>
          <Route path="/github" strict exact>
          <GitHubReport/>
          </Route>
          <Route path="/profile" strict exact>
          <Profile/>
          </Route>
          <Route path="/chat" strict exact>
          <ChatRoom/>          
          </Route>
        </Switch>
    </div>
        </Router>

  );
}

export default App;
