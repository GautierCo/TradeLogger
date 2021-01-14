import React from "react";
import { Form, Button } from "semantic-ui-react";
import Auth from "../index";
import "./login.scss";

const Login = (props) => {
    const { loginData, loginErrors, loginLoading, setLoginData, loginSubmit } = props;

    const handleChange = (e) => {
        const { name, value } = e.target;
        const data = {
            ...loginData,
            [name]: value,
        };
        setLoginData(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginSubmit();
    };

    return (
        <Auth>
            <div className="login">
                <div className="login-form">
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
                        {loginErrors.message && (
                            <Form.Field>
                                <div className="form-error">{loginErrors.message}</div>
                            </Form.Field>
                        )}
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

                        <Button primary className="form-submit" type="submit" loading={loginLoading}>
                            Connexion
                        </Button>
                    </Form>
                </div>
            </div>
        </Auth>
    );
};

export default Login;
