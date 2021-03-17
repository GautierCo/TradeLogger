import React from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import FormNote from "../FormNote/FormNote";
import "./style.scss";

const AddNote = ({ showAddModal, setShowAddModal, addNote, setNoteData, noteData }) => {
    return (
        <div className="modal">
            <Modal
                className="addmodal"
                style={{ backgroundColor: "#bbb" }}
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onOpen={() => setShowAddModal(true)}
                trigger={
                    <Button icon labelPosition="left" size="small" primary>
                        <Icon name="add" />
                        Add Note
                    </Button>
                }
            >
                <Modal.Content>
                    <h1>Add your note</h1>
                    <FormNote
                        setShowModal={setShowAddModal}
                        setNoteData={setNoteData}
                        noteData={noteData}
                        submitForm={addNote}
                    />
                </Modal.Content>
            </Modal>
        </div>
    );
};

export default AddNote;
