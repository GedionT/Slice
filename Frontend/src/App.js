import React from "react";
import "./App.css";
import Main from './components/main'
import Login from './components/loginSignup'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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
        </Switch>
    </div>
        </Router>

  );
}

export default App;
