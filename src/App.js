import React from "react";
import "./styles.css";
import ThemeProvider from "./Material/PrimaryColor";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import CryptoCurrency from "./components/cryptoCurrency/index";
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={CryptoCurrency} exact />
      </Switch>
    </BrowserRouter>
  );
}
