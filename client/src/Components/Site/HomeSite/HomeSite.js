import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

import "./homeSite.scss";

const HomeSite = () => {
    return (
        <>
            Home Site
            <Link to="/dashboard">
                <Button>Go to dashboard</Button>
            </Link>
        </>
    );
};

export default HomeSite;
