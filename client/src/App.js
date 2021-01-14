import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

/* Styles */
import "semantic-ui-less/semantic.less";
import "./app.scss";

/* Protected Route */
import ProtectedRoute from "./Routes/protected.routes";

/* Containers */
import HomeDashboard from "./Containers/Dashboard/HomeDashboard.container";
import TradeLogger from "./Containers/Dashboard/TradeLogger.container";
import HomeSite from "./Containers/Site/HomeSite.container";
import Login from "./Containers/Site/Login.container";

const App = ({ user }) => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (user.connected) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    });
    return (
        <div className="app">
            <Switch>
                <Route exact path="/">
                    <HomeSite />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <ProtectedRoute isAuth={user.connected} exact path="/dashboard" component={HomeDashboard} />
                <ProtectedRoute isAuth={user.connected} exact path="/dashboard/tradelogger" component={TradeLogger} />
            </Switch>
        </div>
    );
};

export default App;
