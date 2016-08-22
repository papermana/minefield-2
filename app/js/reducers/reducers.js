import {
  State,
} from './dataTypes';
import {
  types,
} from '@js/actionCreators';


const {
  CLICK_FIELD,
  FLAG_FIELD,
  UNFLAG_FIELD,
  INCREMENT_TIMER,
  LOSE_GAME,
  WIN_GAME,
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
  else {
    return state;
  }
};


export default reducers;
