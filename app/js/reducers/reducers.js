import Immutable from 'immutable';
import {
  gameStates,
  Status,
  State,
} from '@js/dataTypes';
import {
  types,
} from '@js/actions';
import createBoardLayout from '@utils/createBoardLayout';


const {
  CLICK_FIELD,
  FLAG_FIELD,
  UNFLAG_FIELD,
  INCREMENT_TIMER,
  SHOW_TOPBAR,
  HIDE_TOPBAR,
  START_NEW_GAME,
  PAUSE_GAME,
  UNPAUSE_GAME,
} = types;

const winGameReducer = state => {
  if (
    state.status.minesFlagged === state.boardConfig.mines &&
    state.status.flagsDeployed === state.status.minesFlagged &&
    !state.playerActions.includes(undefined)
  ) {
    state = state
    .update('status', status => {
      return status
      .set('state', gameStates.STATE_WON);
    });
  }

  return state;
};

const loseGameReducer = (state, action) => {
  if (
    action.type === CLICK_FIELD &&
    action.data.size === 1 &&
    state.boardLayout.get([...action.data][0]) === 'mine'
  ) {
    state = state
    .update('status', status => {
      return status
      .set('state', gameStates.STATE_LOST);
    });
  }

  return state;
};

const reducers = (state = new State(), action) => {
  if (action.type === CLICK_FIELD) {
    state = state
    .update('playerActions', list => {
      return list.withMutations(listMut => {
        action.data.forEach(entry => {
          listMut.set(entry, 'clicked');
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
  }
  else if (action.type === UNFLAG_FIELD) {
    state = state
    .setIn(['playerActions', action.data], undefined)
    .updateIn(['status', 'flagsDeployed'], flags => --flags);

    if (state.boardLayout.get(action.data) === 'mine') {
      state = state
      .updateIn(['status', 'minesFlagged'], mines => --mines);
    }
  }
  else if (action.type === INCREMENT_TIMER) {
    state = state
    .updateIn(['status', 'time'], time => ++time);
  }
  else if (action.type === SHOW_TOPBAR) {
    state = state
    .setIn(['uiState', 'topbarActive'], true);
  }
  else if (action.type === HIDE_TOPBAR) {
    state = state
    .setIn(['uiState', 'topbarActive'], false);
  }
  else if (action.type === START_NEW_GAME) {
    state = state
    .set('boardLayout', createBoardLayout(state.get('boardConfig')))
    .set('playerActions', new Immutable.List())
    .set('status', new Status())
    .setIn(['uiState', 'topbarActive'], false);
  }
  else if (action.type === PAUSE_GAME) {
    state = state
    .update('status', status => {
      return status
      .set('state', gameStates.STATE_PAUSED);
    });
  }
  else if (action.type === UNPAUSE_GAME) {
    state = state
    .update('status', status => {
      return status
      .set('state', gameStates.STATE_GOING);
    });
  }

  state = winGameReducer(state, action);
  state = loseGameReducer(state, action);

  localStorage.setItem('savedGame', JSON.stringify(state));

  return state;
};


export default reducers;
