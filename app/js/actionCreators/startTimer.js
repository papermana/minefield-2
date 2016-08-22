import {
  INCREMENT_TIMER,
} from './types';


const startTimer = () => {
  return dispatch => {
    setInterval(() => dispatch({
      type: INCREMENT_TIMER,
      data: undefined,
    }), 1000);
  };
};


export default startTimer;
