import * as ReactRedux from 'react-redux';
import HeaderUi from '@components/HeaderUi';
import actionCreators from '@js/actionCreators';


const mapStateToProps = state => ({
  status: state.status,
  uiState: state.uiState,
});

const mapDispatchToProps = dispatch => ({
  startTimer() {
    dispatch(actionCreators.startTimer());
  },
  showTopbar() {
    dispatch(actionCreators.showTopbar());
  },
  hideTopbar() {
    dispatch(actionCreators.hideTopbar());
  },
  startNewGame() {
    dispatch(actionCreators.startNewGame());
  },
});


export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderUi);
