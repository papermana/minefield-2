import * as ReactRedux from 'react-redux';
import BoardUi from '@components/BoardUi';
import actionCreators from '@js/actions';


const {
  clickField,
  rightClickField,
} = actionCreators;

const mapStateToProps = state => ({
  layout: state.boardLayout,
  playerActions: state.playerActions,
  status: state.status.state,
});

const mapDispatchToProps = dispatch => ({
  rightClickField(id) {
    dispatch(rightClickField(id));
  },
  clickField(id) {
    dispatch(clickField(id));
  },
});

export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardUi);
