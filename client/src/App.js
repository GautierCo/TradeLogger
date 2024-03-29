import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

/* Styles */
import "semantic-ui-less/semantic.less";
import "./app.scss";

/* Protected Route */
import ProtectedRoute from "./Routes/protected.routes";

/* Containers */
import HomeDashboard from "./Containers/Dashboard/HomeDashboard.container";
import TradeLogger from "./Containers/Dashboard/Trades/TradeLogger.container";
import Market from "./Containers/Dashboard/Market.container";
import Journal from "./Containers/Dashboard/Notes/Journal.container";
import Invest from "./Containers/Dashboard/Invest.container";
import Plan from "./Containers/Dashboard/Plan.container";
import HomeSite from "./Containers/Site/HomeSite.container";
import Login from "./Containers/Site/Login.container";
import Signup from "./Containers/Site/Signup.container";

const App = ({ user }) => {
    return (
        <div className="app">
            <Switch>
                <Route exact path="/">
                    <HomeSite />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <ProtectedRoute isAuth={user.connected} exact path="/dashboard" component={HomeDashboard} />
                <ProtectedRoute isAuth={user.connected} exact path="/dashboard/trades" component={TradeLogger} />
                <ProtectedRoute isAuth={user.connected} exact path="/dashboard/market" component={Market} />
                <ProtectedRoute isAuth={user.connected} exact path="/dashboard/journal" component={Journal} />
                <ProtectedRoute isAuth={user.connected} exact path="/dashboard/invest" component={Invest} />
                <ProtectedRoute isAuth={user.connected} exact path="/dashboard/plan" component={Plan} />
                <Route path="*">
                    <Redirect to="/dashboard" />
                </Route>
            </Switch>
        </div>
    );
};

export default App;
