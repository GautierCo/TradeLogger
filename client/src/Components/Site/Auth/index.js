import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";
import "./index.scss";

const Auth = (props) => {
    const [activePage, setActivePage] = useState("");
    const { children } = props;

    useEffect(() => {
        setActivePage(children.props.className);
    }, [children]);

    return (
        <div className="auth">
            <div className="auth-container">
                <Image src="./logo.png" size="small" className="form-logo" />
                <div className="auth-selector">
                    <div className="selector__signup">
                        <NavLink to="/signup">
                            <Button size="big" color={activePage === "signup" ? "green" : ""}>
                                Signup
                            </Button>
                        </NavLink>
                    </div>
                    <div className="selector__login">
                        <NavLink to="/login">
                            <Button size="big" color={activePage === "login" ? "green" : ""}>
                                Login
                            </Button>
                        </NavLink>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Auth;
