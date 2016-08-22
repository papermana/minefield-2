jest.unmock('@js/reducers');
jest.unmock('@js/reducers/dataTypes');
jest.unmock('@js/actionCreators');

import Immutable from 'immutable';
import reducers from '@js/reducers';
import {
  State,
} from '@js/reducers/dataTypes';
import {
  types,
} from '@js/actionCreators';


const {
  CLICK_FIELD,
  FLAG_FIELD,
  UNFLAG_FIELD,
  SHOW_TOPBAR,
  HIDE_TOPBAR,
} = types;

describe('`reducers.js` - The main reducer in the app', () => {
  it('should use a new State instance if no state was passed in', () => {
    const result = reducers(undefined, {});

    expect(result).toEqual(new State());
  });

  it('should return state unchanged if it doesn\'t recognize the action', () => {
    const state = new Immutable.Map();
    const action = {
      type: 'TEST',
      data: undefined,
    };
    const result = reducers(state, action);

    expect(result).toBe(state);
  });

  it('should, in case of a `CLICK_FIELD` action, take the array passed in as action data, and for each value in that array set "clicked" in the `playerActions` property at an index equal to the value', () => {
    const action = {
      type: CLICK_FIELD,
      data: [0, 5, 8],
    };
    const result = reducers(undefined, action);

    expect(result.playerActions.toJS()).toEqual([
      'clicked',
      undefined, undefined, undefined, undefined,
      'clicked',
      undefined, undefined,
      'clicked',
    ]);
  });

  it('should, in case of a `FLAG_FIELD` action, set "flagged" in the `playerActions` property at an index equal to the value in action data and increase the `flagsDeployed` counter in `status`', () => {
    const state = new State({
      boardLayout: [],
    });
    const action = {
      type: FLAG_FIELD,
      data: 2,
    };
    const result = reducers(state, action);

    expect(result.playerActions.toJS()).toEqual([
      undefined, undefined,
      'flagged',
    ]);
    expect(result.status.flagsDeployed).toBe(1);
  });

  it ('should, in case of an `UNFLAG_FIELD` action, set `undefined` in the `playerActions` property at an index equal to the value in action data and decrease the `flagsDeployed` counter in `status`', () => {
    const state = new State({
      boardLayout: [],
      playerActions: [undefined, undefined, 'flagged'],
      status: {
        flagsDeployed: 1,
      },
    });
    const action = {
      type: UNFLAG_FIELD,
      data: 2,
    };
    const result = reducers(state, action);

    expect(result.playerActions.toJS()).toEqual([
      undefined, undefined, undefined,
    ]);
    expect(result.status.flagsDeployed).toBe(0);
  });

  it('should, in case of a `FLAG_FIELD` or `UNFLAG_FIELD` action, if neccessary, increase or decrease the `minesFlagged` counter in the `status` property', () => {
    let state = new State({
      boardLayout: ['mine', 0],
    });

    state = reducers(state, {
      type: FLAG_FIELD,
      data: 0,
    });
    expect(state.status.minesFlagged).toBe(1);

    state = reducers(state, {
      type: UNFLAG_FIELD,
      data: 0,
    });
    expect(state.status.minesFlagged).toBe(0);

    state = reducers(state, {
      type: FLAG_FIELD,
      data: 1,
    });
    expect(state.status.minesFlagged).toBe(0);
  });

  it('should change `uiState.topbarActive` in response to actions `SHOW_TOPBAR` and `HIDE_TOPBAR`', () => {
    let state = new State();

    expect(state.uiState.topbarActive).toBe(false);

    state = reducers(state, {
      type: SHOW_TOPBAR,
      data: undefined,
    });
    expect(state.uiState.topbarActive).toBe(true);

    state = reducers(state, {
      type: HIDE_TOPBAR,
      data: undefined,
    });
    expect(state.uiState.topbarActive).toBe(false);
  });
});
