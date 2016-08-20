import {
  State,
} from './dataTypes';
import {
  types,
} from '@js/actionCreators';


const {
  CLICK_FIELD,
  FLAG_FIELD,
} = types;

const reducers = (state = new State(), action) => {
  if (action.type === CLICK_FIELD) {
    return state
    .setIn(['playerActions', action.data], 'clicked');
  }
  else if (action.type === FLAG_FIELD) {
    return state
    .setIn(['playerActions', action.data], 'flagged');
  }
  else {
    return state;
  }
};


export default reducers;
