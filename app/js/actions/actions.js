import * as types from '@js/actions/actionTypes';
import clickField from './clickField';
import rightClickField from './rightClickField';
import startTimer from './startTimer';


const actionCreators = {
  clickField,
  rightClickField,
  startTimer,
};

actionCreators.showTopbar = () => ({
  type: types.SHOW_TOPBAR,
  data: undefined,
});

actionCreators.hideTopbar = () => ({
  type: types.HIDE_TOPBAR,
  data: undefined,
});

actionCreators.startNewGame = () => ({
  type: types.START_NEW_GAME,
  data: undefined,
});

actionCreators.pauseGame = () => ({
  type: types.PAUSE_GAME,
  data: undefined,
});

actionCreators.unpauseGame = () => ({
  type: types.UNPAUSE_GAME,
  data: undefined,
});


export default actionCreators;
export {
  types,
};
