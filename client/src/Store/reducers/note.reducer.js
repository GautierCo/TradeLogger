import { FETCH_NOTES, FETCH_NOTES_SUCCESS, FETCH_NOTES_ERROR } from "../actions/note.actions";

const initialState = {
    notes: [],
    notesLoading: false,
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

        default:
            return state;
    }
};
