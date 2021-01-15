import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Divider, Header, Icon, Image, Dropdown } from "semantic-ui-react";
import "./layout.scss";
import Logo from "../../Assets/logo.png";

const Layout = (props) => {
    const { children, title = "NoTitle", logout } = props;

    const trigger = (
        <span>
            <Icon name="settings" />
        </span>
    );

    const options = [
        {
            key: "user",
            text: (
                <span>
                    Signed in as <strong>Bob Smith</strong>
                </span>
            ),
            disabled: true,
        },
        { key: "profile", text: "Your Profile" },
        { key: "stars", text: "Your Stars" },
        { key: "explore", text: "Explore" },
        { key: "integrations", text: "Integrations" },
        { key: "help", text: "Help" },
        { key: "settings", text: "Settings" },
        { key: "sign-out", text: "Sign Out" },
    ];

    const renderDropDownMenu = () => {
        return <Dropdown trigger={trigger} options={options} />;
    };
    return (
        <div className="layout">
            <div className="layout-header">
                <div className="layout-container">
                    <div className="layout-title">
                        <Image src={Logo} size="small"></Image>
                    </div>

                    <div className="layout-menu">
                        <NavLink exact to="/dashboard" activeClassName="active-link" className="layout-menu--link">
                            Dashboard
                        </NavLink>
                        <NavLink
                            exact
                            to="/dashboard/booklog"
                            activeClassName="active-link"
                            className="layout-menu--link"
                        >
                            Journal
                        </NavLink>
                        <NavLink
                            exact
                            to="/dashboard/tradingplan"
                            activeClassName="active-link"
                            className="layout-menu--link"
                        >
                            Plan
                        </NavLink>
                        <NavLink
                            exact
                            to="/dashboard/tradelogger"
                            activeClassName="active-link"
                            className="layout-menu--link"
                        >
                            Trades
                        </NavLink>
                        <NavLink
                            exact
                            to="/dashboard/invest"
                            activeClassName="active-link"
                            className="layout-menu--link"
                        >
                            Invests
                        </NavLink>
                        <NavLink
                            exact
                            to="/dashboard/market"
                            activeClassName="active-link"
                            className="layout-menu--link"
                        >
                            Market
                        </NavLink>
                    </div>
                </div>
                <div className="layout-right">
                    <div className="layout-right_container">
                        <Dropdown item icon="wrench" simple>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="layout-right_container">
                        <Icon name="btc" color="orange" size="large" className="icon-sold" />
                        <div className="layout-right--sold">115.000000</div>
                    </div>

                    <div className="layout-right_container">
                        <div className="layout-right--avatar">
                            <Image
                                src="https://media-exp1.licdn.com/dms/image/C4D03AQF31WZEADth2g/profile-displayphoto-shrink_200_200/0/1583532662962?e=1616025600&v=beta&t=inXlvv0G0yKcz5hnx5vDM6GzstQTN5nJ5t62C0SMvN8"
                                avatar
                                size="small"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Divider />

            <div className="layout-main">{children}</div>
        </div>
    );
};

export default Layout;
