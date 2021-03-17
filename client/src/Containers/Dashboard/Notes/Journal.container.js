import Journal from "../../../Components/Dashboard/Journal/Journal";
import { fetchNotes, setNoteUpdateId, setNoteUpdateData } from "../../../Store/actions/note.actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    notes: state.noteReducer.notes,
    noteUpdateId: state.noteReducer.noteUpdateId,
});

const mapDispatchToProps = (dispatch) => ({
    fetchNotes: () => {
        dispatch(fetchNotes());
    },
    setNoteUpdateId: (updateId) => {
        dispatch(setNoteUpdateId(updateId));
    },
    setNoteUpdateData: (updateDataForm) => {
        dispatch(setNoteUpdateData(updateDataForm));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Journal);
