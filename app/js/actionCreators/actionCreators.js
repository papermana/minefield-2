import * as types from './types';
import clickField from './clickField';
import rightClickField from './rightClickField';
import startTimer from './startTimer';


const showTopbar = () => ({
  type: types.SHOW_TOPBAR,
  data: undefined,
});

const hideTopbar = () => ({
  type: types.HIDE_TOPBAR,
  data: undefined,
});

const startNewGame = () => ({
  type: types.START_NEW_GAME,
  data: undefined,
});


export default {
  clickField,
  rightClickField,
  startTimer,
  showTopbar,
  hideTopbar,
  startNewGame,
};
export {
  types,
};
