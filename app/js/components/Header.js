import * as ReactRedux from 'react-redux';
import HeaderUi from '@components/HeaderUi';
import actionCreators from '@js/actions';


const mapStateToProps = state => ({
  uiState: state.uiState,
});

const mapDispatchToProps = dispatch => ({
  showTopbar() {
    dispatch(actionCreators.showTopbar());
  },
  hideTopbar() {
    dispatch(actionCreators.hideTopbar());
  },
  startNewGame() {
    dispatch(actionCreators.showNewGameDialog());
  },
});


export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderUi);
