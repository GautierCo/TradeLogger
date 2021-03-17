import UpdateNote from "../../../Components/Dashboard/Journal/UpdateNote/UpdateNote";
import { updateNote, setNoteUpdateData } from "../../../Store/actions/note.actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    noteUpdateData: state.noteReducer.noteUpdateData,
    noteUpdateId: state.noteReducer.noteUpdateId,
});

const mapDispatchToProps = (dispatch) => ({
    updateNote: () => {
        dispatch(updateNote());
    },
    setNoteUpdateData: (updateDataForm) => {
        dispatch(setNoteUpdateData(updateDataForm));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateNote);
