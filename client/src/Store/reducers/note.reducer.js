import {
    FETCH_NOTES,
    FETCH_NOTES_SUCCESS,
    FETCH_NOTES_ERROR,
    ADD_NOTE,
    SET_NOTE_DATA,
    ADD_NOTE_SUCCESS,
    ADD_NOTE_ERROR,
    SET_NOTE_UPDATE_ID,
    SET_NOTE_UPDATE_DATA,
    UPDATE_NOTE,
    UPDATE_NOTE_SUCCESS,
    UPDATE_NOTE_ERROR,
} from "../actions/note.actions";

const initialState = {
    notes: [],
    noteData: {
        title: "",
        content: "",
        feeling: "",
        date: Date.now(),
    },
    notesLoading: false,
    addNoteLoading: false,
    updateNoteLoading: false,
    noteUpdateId: "",
    noteUpdateData: {},
};

export const noteReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case FETCH_NOTES:
            return {
                ...state,
                notesLoading: true,
            };
        case FETCH_NOTES_SUCCESS:
            return {
                ...state,
                notes: [...action.payload],
                notesLoading: false,
            };
        case FETCH_NOTES_ERROR:
            return {
                ...state,
                notesLoading: false,
            };
        case SET_NOTE_DATA:
            return {
                ...state,
                noteData: {
                    ...state.noteData,
                    ...action.payload,
                },
            };
        case ADD_NOTE:
            return {
                ...state,
                addNoteLoading: true,
            };
        case ADD_NOTE_SUCCESS:
            return {
                ...state,
                addNoteLoading: false,
                notes: [...state.notes, action.payload],
            };
        case ADD_NOTE_ERROR:
            return {
                ...state,
                addNoteLoading: false,
            };
        case SET_NOTE_UPDATE_ID:
            return {
                ...state,
                noteUpdateId: action.payload,
            };
        case SET_NOTE_UPDATE_DATA:
            return {
                ...state,
                noteUpdateData: {
                    ...state.noteUpdateData,
                    ...action.payload,
                },
            };
        case UPDATE_NOTE:
            return {
                ...state,
                updateNoteLoading: true,
            };
        case UPDATE_NOTE_SUCCESS:
            return {
                ...state,
                updateNoteLoading: false,
                notes: action.payload,
            };
        case UPDATE_NOTE_ERROR:
            return {
                ...state,
                updateNoteLoading: false,
            };

        default:
            return state;
    }
};
