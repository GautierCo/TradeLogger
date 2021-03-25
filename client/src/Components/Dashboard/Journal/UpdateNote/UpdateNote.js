import React from "react";
import { Modal } from "semantic-ui-react";
import FormNote from "../FormNote/FormNote";
import "../AddNote/style.scss";

const UpdateNote = ({
    showUpdateModal,
    setShowUpdateModal,
    updateNote,
    setNoteUpdateData,
    noteUpdateData,
    deleteNote,
}) => {
    console.log(showUpdateModal);
    return (
        <div className="modal">
            <Modal
                className="addmodal"
                style={{ backgroundColor: "#bbb" }}
                open={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
            >
                <Modal.Content>
                    <h1>Update your note</h1>
                    <FormNote
                        setShowModal={setShowUpdateModal}
                        setNoteData={setNoteUpdateData}
                        noteData={noteUpdateData}
                        submitForm={updateNote}
                        update={true}
                        deleteNote={deleteNote}
                    />
                </Modal.Content>
            </Modal>
        </div>
    );
};

export default UpdateNote;
