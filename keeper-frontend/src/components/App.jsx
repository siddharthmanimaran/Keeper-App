import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import MainPage from "../Pages/MainPage";
import SignUpPage from "../Pages/SignUpPage";
import LogInPage from "../Pages/LogInPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/" component={LogInPage} exact />
          <Route path="/MainPage/:userId" component={MainPage} />
          <Route path="/SignUp" component={SignUpPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
