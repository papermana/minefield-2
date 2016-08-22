import * as ReactRedux from 'react-redux';
import BoardUi from '@components/BoardUi';
import actionCreators from '@js/actionCreators';


const {
  flagField,
  unflagField,
  clickField,
} = actionCreators;

const mapStateToProps = state => ({
  layout: state.boardLayout,
  playerActions: state.playerActions,
});

const mapDispatchToProps = dispatch => ({
  flagField(id) {
    dispatch(flagField(id));
  },
  unflagField(id) {
    dispatch(unflagField(id));
  },
  clickField(id) {
    dispatch(clickField(id));
  },
});

export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardUi);
