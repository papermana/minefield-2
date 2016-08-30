import findNeighbors from '@utils/findNeighbors';
import {
  CLICK_FIELD,
} from '@js/actions/actionTypes';


const clickField = id => {
  return (dispatch, getState) => {
    const state = getState();
    const actions = state.playerActions;
    const layout = state.boardLayout;
    const config = state.boardConfig;

    const uncoverField = (currentId, alreadyUncovered) => {
      const value = layout.get(currentId);

      if (value === 'mine') {
        alreadyUncovered.add(currentId);
      }
      else if (value !== 0) {
        alreadyUncovered.add(currentId);
      }
      else if (value === 0) {
        const neighbors = findNeighbors(currentId, config);

        alreadyUncovered.add(currentId);

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
