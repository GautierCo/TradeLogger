import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

/* Styles */
import "semantic-ui-less/semantic.less";
import "./app.scss";

/* Containers */
import HomeDashboard from "./Containers/Dashboard/HomeDashboard.container";
import TradeLogger from "./Containers/Dashboard/TradeLogger.container";
import HomeSite from "./Containers/Site/HomeSite.container";
import Login from "./Containers/Site/Login.container";

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
