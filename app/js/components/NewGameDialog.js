import * as ReactRedux from 'react-redux';
import NewGameDialogUi from '@components/NewGameDialogUi';
import actionCreators from '@js/actions';


const mapStateToProps = state => ({
  config: state.boardConfig,
  uiState: state.uiState,
});

const mapDispatchToProps = dispatch => ({
  setBoardConfig(data) {
    dispatch(actionCreators.setBoardConfig(data));
  },
  startNewGame() {
    dispatch(actionCreators.startNewGame());
  },
});


export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(NewGameDialogUi);
