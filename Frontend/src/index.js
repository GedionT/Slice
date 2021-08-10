import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";

import * as serviceWorkerRegistration from "./utils/serviceWorkerRegistration";
import reportWebVitals from "./utils/reportWebVitals";
import ReactGA from "react-ga";

ReactGA.initialize(process.env.REACT_APP_REACT_GA_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();

function sendToAnalytics({ id, name, value }) {
  ReactGA.event({
    category: "Web Vitals",
    action: name,
    value: Math.round(name === "CLS" ? value * 1000 : value),
    label: id,
    nonInteraction: true,
  });
}

reportWebVitals(sendToAnalytics);
