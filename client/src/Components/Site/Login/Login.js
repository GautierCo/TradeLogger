import React, { useEffect } from "react";
import { Form, Input, Label, Button, Image } from "semantic-ui-react";
//import history from "../../../Utils/history";

import "./login.scss";

const Login = (props) => {
    const { loginData, loginErrors, loginLoading, setLoginData, loginSubmit, user } = props;

    useEffect(() => {
        // if (user.connected) {
        //     history.push("/dashboard");
        // }
    }, [user.connected]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const data = {
            ...loginData,
            [name]: value,
        };

        console.log(data);

        setLoginData(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginSubmit();
    };

    return (
        <div className="login">
            <div className="login-form">
                <Image src="./logo.png" size="small" className="form-logo" />
                <Form className="form" onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>Email</label>
                        <Form.Input
                            placeholder="youremail@gmail.com"
                            name="email"
                            type="text"
                            onChange={handleChange}
                            value={loginData.email}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <Form.Input
                            placeholder="********"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            value={loginData.password}
                        />
                    </Form.Field>
                    <Form.Field>
                        <div className="form-error">Erreur</div>
                    </Form.Field>
                    <Button primary className="form-submit" type="submit" loading={loginLoading}>
                        Connexion
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;
