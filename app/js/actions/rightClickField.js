import {
  FLAG_FIELD,
  UNFLAG_FIELD,
} from '@js/actions/actionTypes';


const rightClickField = id => {
  return (dispatch, getState) => {
    const state = getState();
    const playerActions = state.playerActions;

    if (playerActions.get(id) === undefined) {
      dispatch({
        type: FLAG_FIELD,
        data: id,
      });
    }
    else if (playerActions.get(id) === 'flagged') {
      dispatch({
        type: UNFLAG_FIELD,
        data: id,
      });
    }
  };
};


export default rightClickField;
export {
  FLAG_FIELD,
  UNFLAG_FIELD,
};
