import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { history } from "./history";
import SignUp from "./Views/SignUpView";
import SignIn from "./Views/SignInView";
import ApproveView from "./Views/ApproveView";
import Welcome from "./components/Welcome/Welcome";
import Sidebar from "./components/Sidebar/Sidebar";
import AboutUs from "./components/AboutUs/AboutUS";

export default function PrivateRoute({ children, ...rest }) {
  const auth = { user: true };

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/welcome",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/">
            <Redirect
              to={{
                pathname: "/dashboard",
              }}
            />
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <App>
              <p>Dashboard</p>
            </App>
          </PrivateRoute>
          <PrivateRoute path="/about-us">
            <App>
              <AboutUs></AboutUs>
            </App>
          </PrivateRoute>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
        </Switch>
      </Router>
    </Provider>
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
