import findNeighbors from '@utils/findNeighbors';
import {
  CLICK_FIELD,
  LOSE_GAME,
} from './types';


const clickField = id => {
  return (dispatch, getState) => {
    const state = getState();
    const actions = state.playerActions;
    const layout = state.boardLayout;
    const config = state.boardConfig;

    const uncoverField = (id, alreadyUncovered) => {
      const value = layout.get(id);

      if (value === 'mine') {
        alreadyUncovered.add(id);
        dispatch({
          type: LOSE_GAME,
          data: undefined,
        });
      }
      else if (value !== 0) {
        alreadyUncovered.add(id);
      }
      else if (value === 0) {
        const neighbors = findNeighbors(id, config);

        alreadyUncovered.add(id);

        neighbors.forEach(entry => {
          if (!alreadyUncovered.has(entry) && actions.get(entry) === undefined) {
            uncoverField(entry, alreadyUncovered);
          }
        });
      }

      return alreadyUncovered;
    };

    const fields = uncoverField(id, new Set());

    dispatch({
      type: CLICK_FIELD,
      data: fields,
    });
  };
};


export default clickField;
export {
  CLICK_FIELD,
};
