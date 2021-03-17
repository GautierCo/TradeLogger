import React from "react";
import { Form, Icon } from "semantic-ui-react";
import "./style.scss";

const FormNote = ({ setShowModal, setNoteData, noteData, submitForm }) => {
    const handleChange = (e, data) => {
        const { name, value } = data ? data : e.target;
        const dataForm = {
            ...noteData,
            [name]: value,
        };
        setNoteData(dataForm);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitForm();
        // if no error
        setShowModal(false);
    };
    return (
        <div className="formnote">
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <Form.Input placeholder="Your title" name="title" onChange={handleChange} value={noteData.title} />
                    <Form.TextArea
                        placeholder="Your content"
                        name="content"
                        onChange={handleChange}
                        rows={2}
                        rows={10}
                        value={noteData.content}
                    />
                    <div className="formnote-feelings">
                        <div className="formnote-feelings_title">Feeling: </div>
                        <Icon
                            name="smile"
                            size="big"
                            color={noteData.feeling === 1 ? `green` : "grey"}
                            onClick={() => setNoteData({ ...noteData, feeling: 1 })}
                        />
                        <Icon
                            name="meh"
                            size="big"
                            color={noteData.feeling === 2 ? `green` : "grey"}
                            onClick={() => setNoteData({ ...noteData, feeling: 2 })}
                        />
                        <Icon
                            name="frown"
                            size="big"
                            color={noteData.feeling === 3 ? `green` : "grey"}
                            onClick={() => setNoteData({ ...noteData, feeling: 3 })}
                        />
                    </div>
                    <Form.Button>Save</Form.Button>
                </Form.Field>
            </Form>
        </div>
    );
};

export default FormNote;
