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

export const SET_NOTE_DATA = "SET_NOTE_DATA";
export const ADD_NOTE = "ADD_NOTE";
export const ADD_NOTE_SUCCESS = "ADD_NOTE_SUCCESS";
export const ADD_NOTE_ERROR = "ADD_NOTE_ERROR";

export const setNoteData = (payload) => ({
    type: SET_NOTE_DATA,
    payload,
});

export const addNote = () => ({
    type: ADD_NOTE,
});

export const addNoteSuccess = (payload) => ({
    type: ADD_NOTE_SUCCESS,
    payload,
});

export const addNoteError = (payload) => ({
    type: ADD_NOTE_ERROR,
    payload,
});

export const SET_NOTE_UPDATE_ID = "SET_NOTE_UPDATE_ID";
export const SET_NOTE_UPDATE_DATA = "SET_NOTE_UPDATE_DATA";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const UPDATE_NOTE_SUCCESS = "UPDATE_NOTE_SUCCESS";
export const UPDATE_NOTE_ERROR = "UPDATE_NOTE_ERROR";

export const setNoteUpdateId = (payload) => ({
    type: SET_NOTE_UPDATE_ID,
    payload,
});

export const setNoteUpdateData = (payload) => ({
    type: SET_NOTE_UPDATE_DATA,
    payload,
});

export const updateNote = () => ({
    type: UPDATE_NOTE,
});

export const updateNoteSuccess = (payload) => ({
    type: UPDATE_NOTE_SUCCESS,
    payload,
});

export const updateNoteError = (payload) => ({
    type: UPDATE_NOTE_ERROR,
    payload,
});
