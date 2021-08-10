import React from "react";
import "./styles/App.css";
import Main from "./pages/main";
import Login from "./pages/loginSignup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GitHubReport from "./pages/github";
import Progress from "./pages/progress";
import NotFound from "./pages/notfound";
import Goals from "./pages/goals";
import Profile from "./pages/profile";
import ChatRoom from "./components/chatroom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" strict exact>
            <Login />
          </Route>
          <Route path="/home" strict exact>
            <Main />
          </Route>
          <Route path="/goals" strict exact>
            <Goals />
          </Route>
          <Route path="/progress" strict exact>
            <Progress />
          </Route>
          <Route path="/github" strict exact>
            <GitHubReport />
          </Route>
          <Route path="/profile" strict exact>
            <Profile />
          </Route>
          <Route path="/chat" strict exact>
            <ChatRoom />
          </Route>
          <Route path="/*" strict exact>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
