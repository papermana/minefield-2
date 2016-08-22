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
    return state
    .setIn(['playerActions', action.data], 'flagged');
  }
  else if (action.type === UNFLAG_FIELD) {
    return state
    .setIn(['playerActions', action.data], undefined);
  }
  else {
    return state;
  }
};


export default reducers;
