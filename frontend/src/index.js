import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AirtableProvider } from "./data/candidates.js";

ReactDOM.render(
  <AirtableProvider>
    <App />
  </AirtableProvider>,
  document.getElementById("root")
);

reportWebVitals();
