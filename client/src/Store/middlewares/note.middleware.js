import axios from "axios";
import { FETCH_NOTES, fetchNotes, fetchNotesSuccess, fetchNotesError } from "../actions/note.actions";

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
                });
            break;
        }
    }
};
