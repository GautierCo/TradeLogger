import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

/* Styles */
import "semantic-ui-less/semantic.less";
import "./app.scss";

/* Components */
import HomeDashboard from "./Components/Dashboard/HomeDashboard/HomeDashboard";
import TradeLogger from "./Components/Dashboard/TradeLogger/TradeLogger";
import HomeSite from "./Components/Site/HomeSite/HomeSite";
import Login from "./Components/Site/Login/Login";

const App = () => {
    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <HomeSite />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/dashboard">
                        <HomeDashboard />
                    </Route>
                    <Route exact path="/dashboard/tradelogger">
                        <TradeLogger />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
