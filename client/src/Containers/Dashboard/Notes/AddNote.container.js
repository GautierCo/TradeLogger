import AddNote from "../../../Components/Dashboard/Journal/AddNote/AddNote";
import { addNote, setNoteData } from "../../../Store/actions/note.actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    notes: state.noteReducer.notes,
    noteData: state.noteReducer.noteData,
});

const mapDispatchToProps = (dispatch) => ({
    addNote: () => {
        dispatch(addNote());
    },
    setNoteData: (noteDataForm) => {
        dispatch(setNoteData(noteDataForm));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNote);
