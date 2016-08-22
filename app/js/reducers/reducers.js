import Immutable from 'immutable';
import {
  Status,
  State,
} from './dataTypes';
import {
  types,
} from '@js/actionCreators';
import createBoardLayout from '@utils/createBoardLayout';


const {
  CLICK_FIELD,
  FLAG_FIELD,
  UNFLAG_FIELD,
  INCREMENT_TIMER,
  LOSE_GAME,
  WIN_GAME,
  SHOW_TOPBAR,
  HIDE_TOPBAR,
  START_NEW_GAME,
} = types;

const reducers = (state = new State(), action) => {
  if (action.type === CLICK_FIELD) {
    return state
    .update('playerActions', list => {
      return list.withMutations(list => {
        action.data.forEach(entry => {
          list.set(entry, 'clicked');
        });
      });
    });
  }
  else if (action.type === FLAG_FIELD) {
    state = state
    .setIn(['playerActions', action.data], 'flagged')
    .updateIn(['status', 'flagsDeployed'], flags => ++flags);

    if (state.boardLayout.get(action.data) === 'mine') {
      state = state
      .updateIn(['status', 'minesFlagged'], mines => ++mines);
    }

    return state;
  }
  else if (action.type === UNFLAG_FIELD) {
    state = state
    .setIn(['playerActions', action.data], undefined)
    .updateIn(['status', 'flagsDeployed'], flags => --flags);

    if (state.boardLayout.get(action.data) === 'mine') {
      state = state
      .updateIn(['status', 'minesFlagged'], mines => --mines);
    }

    return state;
  }
  else if (action.type === INCREMENT_TIMER) {
    return state
    .updateIn(['status', 'time'], time => ++time);
  }
  else if (action.type === LOSE_GAME) {
    return state
    .update('status', status => {
      return status
      .set('state', status.STATE_LOST);
    });
  }
  else if (action.type === WIN_GAME) {
    return state
    .update('status', status => {
      return status
      .set('state', status.STATE_WON);
    });
  }
  else if (action.type === SHOW_TOPBAR) {
    return state
    .setIn(['uiState', 'topbarActive'], true);
  }
  else if (action.type === HIDE_TOPBAR) {
    return state
    .setIn(['uiState', 'topbarActive'], false);
  }
  else if (action.type === START_NEW_GAME) {
    return state
    .set('boardLayout', createBoardLayout(state.get('boardConfig')))
    .set('playerActions', new Immutable.List())
    .set('status', new Status())
    .setIn(['uiState', 'topbarActive'], false);
  }
  else {
    return state;
  }
};


export default reducers;
