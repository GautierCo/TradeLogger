import Journal from "../../Components/Dashboard/Journal/Journal";
import { fetchNotes } from "../../Store/actions/note.actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    notes: state.noteReducer.notes,
});

const mapDispatchToProps = (dispatch) => ({
    fetchNotes: () => {
        dispatch(fetchNotes());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Journal);
