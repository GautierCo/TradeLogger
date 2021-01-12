import React from "react";
import { Form, Input, Label, Button, Image } from "semantic-ui-react";
import "./login.scss";

const Login = () => {
    return (
        <div className="login">
            <div className="login-form">
                <Image src="./logo.png" size="small" className="form-logo" />
                <Form className="form" onSubmit={""}>
                    <Form.Field>
                        <label>Email</label>
                        <Form.Input placeholder="youremail@gmail.com" type="text" />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <Form.Input placeholder="********" type="password" />
                    </Form.Field>
                    <Form.Field>
                        <div className="form-error">Erreur</div>
                    </Form.Field>
                    <Button primary className="form-submit" type="submit">
                        Connexion
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;
