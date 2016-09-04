import * as ReactRedux from 'react-redux';
import GameinfoUi from '@components/GameinfoUi';
import actionCreators from '@js/actions';


const mapStateToProps = state => ({
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  startTimer() {
    dispatch(actionCreators.startTimer());
  },
  pauseGame() {
    dispatch(actionCreators.pauseGame());
  },
  unpauseGame() {
    dispatch(actionCreators.unpauseGame());
  },
});


export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(GameinfoUi);
