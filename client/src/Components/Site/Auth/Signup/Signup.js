import React, { useEffect, useRef } from "react";
import { Form, Button } from "semantic-ui-react";
import Auth from "../index";
import { useForm } from "react-hook-form";
import "./signup.scss";

const Signup = (props) => {
    const { signupErrors, signupSubmit, setSignupData } = props;

    const { register, errors, handleSubmit, setValue, trigger, watch } = useForm();

    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = (data, e) => {
        setSignupData(data);
        signupSubmit();
    };

    useEffect(() => {
        register(
            { name: "email" },
            {
                required: "Votre email est invalide",
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            }
        );
        register({ name: "pseudo" }, { required: "Votre pseudo doit faire 3 caractères minimum", minLength: 3 });
        register(
            { name: "password" },
            { required: "Votre mot de passe doit faire 6 caractères au minimum", minLength: 6 }
        );
        register(
            { name: "confirmPassword" },
            {
                validate: (value) => value === password.current || "Votre mot de passe ne correspond pas",
                required: true,
                minLength: 6,
            }
        );
    }, []);

    const handleChange = async (e, { name, value }) => {
        setValue(name, value);
        await trigger({ name });
    };

    return (
        <Auth>
            <div className="signup">
                <div className="signup-form">
                    <Form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Field>
                            <label>Email</label>
                            <Form.Input
                                placeholder="youremail@gmail.com"
                                name="email"
                                type="text"
                                onChange={handleChange}
                                //value={signupData.email}
                            />
                        </Form.Field>

                        {errors.email ? (
                            <Form.Field>
                                <div className="form-error">Votre email est invalide</div>
                            </Form.Field>
                        ) : (
                            signupErrors.email && (
                                <Form.Field>
                                    <div className="form-error">{signupErrors.email}</div>
                                </Form.Field>
                            )
                        )}
                        <Form.Field>
                            <label>Pseudo</label>
                            <Form.Input
                                placeholder="JohnDoe"
                                name="pseudo"
                                type="text"
                                onChange={handleChange}
                                //value={signupData.pseudo}
                            />
                        </Form.Field>

                        {errors.pseudo ? (
                            <Form.Field>
                                <div className="form-error">Votre pseudo doit faire 3 caractères minimum</div>
                            </Form.Field>
                        ) : (
                            signupErrors.pseudo && (
                                <Form.Field>
                                    <div className="form-error">{signupErrors.pseudo}</div>
                                </Form.Field>
                            )
                        )}

                        <Form.Field>
                            <label>Password</label>
                            <Form.Input
                                placeholder="********"
                                name="password"
                                type="password"
                                onChange={handleChange}
                                //value={signupData.password}
                            />
                        </Form.Field>
                        {errors.password ? (
                            <Form.Field>
                                <div className="form-error">Votre mot de passe doit faire 6 caractères au minimum</div>
                            </Form.Field>
                        ) : (
                            signupErrors.password && (
                                <Form.Field>
                                    <div className="form-error">{signupErrors.password}</div>
                                </Form.Field>
                            )
                        )}
                        <Form.Field>
                            <label>Confirm Password</label>
                            <Form.Input
                                placeholder="********"
                                name="confirmPassword"
                                type="password"
                                onChange={handleChange}
                                //value={signupData.confirmPassword}
                            />
                        </Form.Field>
                        {errors.confirmPassword && (
                            <Form.Field>
                                <div className="form-error">Votre mot de passe ne correspond pas</div>
                            </Form.Field>
                        )}
                        <Form.Field>
                            {/* {signupErrors.password && <div className="form-error">Mot de passe incorrect</div>} */}
                        </Form.Field>
                        <Form.Field>
                            <Button primary className="form-submit" type="submit">
                                Inscription
                            </Button>
                        </Form.Field>
                    </Form>
                </div>
            </div>
        </Auth>
    );
};

export default Signup;

/*
    const handleChange = (e) => {
        const { name, value } = e.target;

        const data = {
            ...signupData,
            [name]: value,
        };

        setSignupData(data);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    */
