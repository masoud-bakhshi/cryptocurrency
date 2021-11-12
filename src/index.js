import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import StepContext from "./components/cryptoCurrency/StepContext";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <StepContext>
      <App />
    </StepContext>
  </StrictMode>,
  rootElement
);
