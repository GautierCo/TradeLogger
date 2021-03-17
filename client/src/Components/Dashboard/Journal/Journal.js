import React, { useEffect, useState } from "react";
import { Button, Icon, Input } from "semantic-ui-react";
import Layout from "../../../Containers/Dashboard/Layout.container";
import DatePicker, { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";
import "./journal.scss";
import AddNote from "../../../Containers/Dashboard/Notes/AddNote.container";
import { formatDate } from "../../../Utils/trade.utils";
import UpdateNote from "../../../Containers/Dashboard/Notes/UpdateNote.container";
registerLocale("fr", fr);

const Journal = ({ fetchNotes, notes, setNoteUpdateId, noteUpdateId, setNoteUpdateData }) => {
    const [showPost, setShowPost] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    return (
        <Layout title="Journal">
            <div className="journal">
                <div className="journal-actions">
                    <div className="actions-left">
                        <AddNote showAddModal={showAddModal} setShowAddModal={setShowAddModal} />
                    </div>
                    <div className="actions-right">
                        <Input type="date" onChange={(e) => console.log(e.target.value)} />
                        <Input type="date" />

                        <Button size="small" secondary>
                            Filter
                        </Button>
                    </div>
                </div>
                <div className="journal-posts">
                    {notes &&
                        notes.map((note) => (
                            <div className="post" key={note._id}>
                                {noteUpdateId === note._id && showUpdateModal && (
                                    <UpdateNote
                                        showUpdateModal={showUpdateModal}
                                        setShowUpdateModal={setShowUpdateModal}
                                    />
                                )}
                                <div className="post-header">
                                    <div className="header-left">
                                        <div className="header__title">{note.title}</div>
                                    </div>
                                    <div className="header-right">
                                        <div className="header__date">{formatDate(note.createdAt)}</div>
                                        <div className="header__emote">
                                            {note.feeling === 1 && <Icon name="smile" size="big" />}
                                            {note.feeling === 2 && <Icon name="meh" size="big" />}
                                            {note.feeling === 3 && <Icon name="frown" size="big" />}
                                        </div>
                                    </div>
                                </div>
                                <div className="post-content">
                                    <div className="content-intro">{note.content}</div>
                                </div>

                                <div className="post-footer">
                                    <Button
                                        size="mini"
                                        secondary
                                        onClick={() => {
                                            setNoteUpdateId(note._id);
                                            setShowUpdateModal(true);
                                            setNoteUpdateData(note);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button size="mini" primary onClick={() => setShowPost(!showPost)}>
                                        {showPost ? "See less" : "See more"}
                                    </Button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </Layout>
    );
};

export default Journal;
