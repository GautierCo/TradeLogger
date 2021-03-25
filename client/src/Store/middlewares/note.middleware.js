import axios from "axios";
import {
    FETCH_NOTES,
    fetchNotesSuccess,
    fetchNotesError,
    ADD_NOTE,
    addNoteSuccess,
    addNoteError,
    UPDATE_NOTE,
    updateNoteSuccess,
    updateNoteError,
    DELETE_NOTE,
    deleteNoteSuccess,
    deleteNoteError,
} from "../actions/note.actions";

export const noteMiddleware = (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FETCH_NOTES: {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_URL}/note/`,
            })
                .then((data) => {
                    store.dispatch(fetchNotesSuccess(data.data.notes));
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(fetchNotesError("error"));
                });
            break;
        }
        case ADD_NOTE: {
            const { noteData } = store.getState().noteReducer;
            const { user } = store.getState().authReducer;

            axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_URL}/note/`,
                data: {
                    ...noteData,
                    userId: user.id,
                },
            })
                .then((data) => {
                    console.log(data.data.note);
                    store.dispatch(addNoteSuccess(data.data.note));
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(addNoteError("error"));
                });
            break;
        }
        case UPDATE_NOTE: {
            const { noteUpdateData, noteUpdateId, notes } = store.getState().noteReducer;

            axios({
                method: "PATCH",
                url: `${process.env.REACT_APP_API_URL}/note/${noteUpdateId}`,
                data: noteUpdateData,
            })
                .then(() => {
                    const newNoteData = notes.map((note) => (note._id === noteUpdateId ? noteUpdateData : note));

                    store.dispatch(updateNoteSuccess(newNoteData));
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(updateNoteError("error"));
                });
            break;
        }
        case DELETE_NOTE: {
            console.log("delete NOTE");
            const { notes, noteUpdateId } = store.getState().noteReducer;

            axios({
                method: "DELETE",
                url: `${process.env.REACT_APP_API_URL}/note/${noteUpdateId}`,
            })
                .then((res) => {
                    let removeNote = notes.filter((note) => note._id !== noteUpdateId);
                    console.log("removeNote", removeNote);
                    store.dispatch(deleteNoteSuccess(removeNote));
                })
                .catch((err) => {
                    console.log(err);
                    store.dispatch(deleteNoteError());
                });

            break;
        }
    }
};
