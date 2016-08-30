import {
  INCREMENT_TIMER,
} from './types';


const startTimer = () => {
  return (dispatch, getState) => {
    setInterval(() => {
      const state = getState();

      if (state.status.state === state.status.STATE_GOING) {
        dispatch({
          type: INCREMENT_TIMER,
          data: undefined,
        });
      }
    }, 1000);
  };
};


export default startTimer;
