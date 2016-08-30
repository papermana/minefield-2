import {
  INCREMENT_TIMER,
} from '@js/actions/actionTypes';
import {
  gameStates,
} from '@js/dataTypes';


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
