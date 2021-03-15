export const FETCH_NOTES = "FETCH_NOTES";
export const FETCH_NOTES_SUCCESS = "FETCH_NOTES_SUCCESS";
export const FETCH_NOTES_ERROR = "FETCH_NOTES_ERROR";

export const fetchNotes = () => ({
    type: FETCH_NOTES,
});

export const fetchNotesSuccess = (payload) => ({
    type: FETCH_NOTES_SUCCESS,
    payload,
});

export const fetchNotesError = (payload) => ({
    type: FETCH_NOTES_ERROR,
    payload,
});
