import {
  FLAG_FIELD,
  UNFLAG_FIELD,
  WIN_GAME,
} from './types';


const rightClickField = id => {
  return (dispatch, getState) => {
    const state = getState();
    const playerActions = state.playerActions;
    const layout = state.boardLayout;
    const config = state.boardConfig;
    const status = state.status;

    if (playerActions.get(id) === undefined) {
      dispatch({
        type: FLAG_FIELD,
        data: id,
      });

      if (
        layout.get(id) === 'mine' &&
        status.minesFlagged === config.mines - 1
      ) {
        dispatch({
          type: WIN_GAME,
          data: undefined,
        });
      }
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
