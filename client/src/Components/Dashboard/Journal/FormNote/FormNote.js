import React from "react";
import { Button, Input, Form, Icon } from "semantic-ui-react";
import "./style.scss";

const FormNote = () => {
    return (
        <div className="formnote">
            <Form>
                <Form.Field>
                    <Form.Input />
                    <Form.TextArea />
                    <div className="formnote-feelings">
                        <div className="formnote-feelings_title">Feeling: </div>
                        <Icon name="smile" size="big" />
                        <Icon name="meh" size="big" />
                        <Icon name="frown" size="big" />
                    </div>
                    <Form.Button>Create</Form.Button>
                </Form.Field>
            </Form>
        </div>
    );
};

export default FormNote;
