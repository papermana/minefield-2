import {
  INCREMENT_TIMER,
} from './types';
import {
  gameStates,
} from '@js/reducers/dataTypes';


const startTimer = () => {
  return (dispatch, getState) => {
    setInterval(() => {
      if (getState().status.state === gameStates.STATE_GOING) {
        dispatch({
          type: INCREMENT_TIMER,
          data: undefined,
        });
      }
    }, 1000);
  };
};


export default startTimer;
