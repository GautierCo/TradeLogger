import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Divider, Icon, Image, Dropdown } from "semantic-ui-react";
import "./layout.scss";
import Logo from "../../Assets/logo.png";

const Layout = (props) => {
    const { children, title = "NoTitle", logout, pseudo } = props;

    useEffect(() => {
        document.title = process.env.REACT_APP_NODE_ENV === "DEV" ? `[DEV] ${title}` : title;
    }, [title]);

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
                            to="/dashboard/journal"
                            activeClassName="active-link"
                            className="layout-menu--link"
                        >
                            Journal
                        </NavLink>
                        <NavLink exact to="/dashboard/plan" activeClassName="active-link" className="layout-menu--link">
                            Plan
                        </NavLink>
                        <NavLink
                            exact
                            to="/dashboard/trades"
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
                        <div className="layout-right--pseudo">{pseudo}</div>

                        {/* <Icon name="btc" color="orange" size="large" className="icon-sold" />
                        <div className="layout-right--sold">115.000000</div> */}
                    </div>

                    <div className="layout-right_container">
                        <div className="layout-right--avatar">
                            <Image src="/dashboard/default-avatar.png" avatar size="small" />
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
