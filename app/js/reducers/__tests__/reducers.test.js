jest.unmock('@js/reducers');
jest.unmock('@js/reducers/dataTypes');
jest.unmock('@js/actionCreators');

import Immutable from 'immutable';
import reducers from '@js/reducers';
import {
  gameStates,
  Status,
  BoardConfig,
  UiState,
  State,
} from '@js/reducers/dataTypes';
import {
  types,
} from '@js/actionCreators';
import createBoardLayout from '@utils/createBoardLayout';



const {
  CLICK_FIELD,
  FLAG_FIELD,
  UNFLAG_FIELD,
  INCREMENT_TIMER,
  SHOW_TOPBAR,
  HIDE_TOPBAR,
  START_NEW_GAME,
  PAUSE_GAME,
  UNPAUSE_GAME,
} = types;

describe('`reducers.js` - The main reducer in the app', () => {
  it('should use a new State instance if no state was passed in', () => {
    const result = reducers(undefined, {});

    expect(result).toEqual(new State());
  });

  it('should return state unchanged if it doesn\'t recognize the action', () => {
    const state = new State();
    const result = reducers(state, {
      type: 'TEST',
      data: undefined,
    });

    expect(result).toBe(state);
  });

  //  We shouldn't have side effects in reducers.
  //  Is there any other way of doing is?
  it('should set state in local storage every time', () => {
    reducers(undefined, {
      type: 'fakeAction',
      data: undefined,
    });

    expect(window.localStorage.setItem).toBeCalledWith(
      'savedGame',
      JSON.stringify(new State())
    );
  });

  it('should, in case of a `CLICK_FIELD` action, take the array passed in as action data, and for each value in that array set "clicked" in the `playerActions` property at an index equal to the value', () => {
    const result = reducers(undefined, {
      type: CLICK_FIELD,
      data: [0, 5, 8],
    });

    expect(result.playerActions.toJS()).toEqual([
      'clicked',
      undefined, undefined, undefined, undefined,
      'clicked',
      undefined, undefined,
      'clicked',
    ]);
  });

  it('should, in case of a `FLAG_FIELD` action, set "flagged" in the `playerActions` property at an index equal to the value in action data and increase the `flagsDeployed` counter in `status`', () => {
    let state = new State({
      boardLayout: [],
    });

    state = reducers(state, {
      type: FLAG_FIELD,
      data: 2,
    });
    expect(state.playerActions.toJS()).toEqual([
      undefined, undefined,
      'flagged',
    ]);
    expect(state.status.flagsDeployed).toBe(1);
  });

  it('should, in case of an `UNFLAG_FIELD` action, set `undefined` in the `playerActions` property at an index equal to the value in action data and decrease the `flagsDeployed` counter in `status`', () => {
    let state = new State({
      boardLayout: [],
      playerActions: [undefined, undefined, 'flagged'],
      status: {
        flagsDeployed: 1,
      },
    });

    state = reducers(state, {
      type: UNFLAG_FIELD,
      data: 2,
    });
    expect(state.playerActions.toJS()).toEqual([
      undefined, undefined, undefined,
    ]);
    expect(state.status.flagsDeployed).toBe(0);
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

  it('should increase the value of `status.time` when receiving the action `INCREMENT_TIMER`', () => {
    let state = new State();

    expect(state.status.time).toBe(0);

    state = reducers(state, {
      type: INCREMENT_TIMER,
      data: undefined,
    });
    expect(state.status.time).toBe(1);
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

  it('should create fresh properties `boardLayout`, `playerActions` and `status` if the action `START_NEW_GAME` is dispatched', () => {
    const state = new State({
      boardLayout: new Immutable.List([0, 1, 2, 3, 'mine']),
      playerActions: new Immutable.List([undefined, 'clicked', 'flagged']),
      status: new Status({
        time: 34,
        flagsDeployed: 1,
      }),
      boardConfig: new BoardConfig({
        rows: 10,
        columns: 10,
      }),
      UiState: new UiState(),
    });
    const result = reducers(state, {
      type: START_NEW_GAME,
      data: undefined,
    });

    //  A utility function gets called and current config is passed:
    expect(result.boardLayout).not.toBe(state.boardLayout);
    expect(createBoardLayout).toBeCalled();
    expect(createBoardLayout).toBeCalledWith(state.boardConfig);
    //  Those two are simply reset:
    expect(result.playerActions).not.toBe(state.playerActions);
    expect(result.playerActions).toEqual(new Immutable.List());
    expect(result.status).not.toBe(state.status);
    expect(result.status).toEqual(new Status());
    //  Hide the topbar:
    expect(result.uiState.topbarActive).toBe(false);
    //  The rest remains the same:
    expect(result.boardConfig).toBe(state.boardConfig);
  });

  it('should change the property `status.state` when receiving actions `PAUSE_GAME` and `UNPAUSE_GAME`', () => {
    let state = new State();

    expect(state.status.state).toBe(gameStates.STATE_GOING);

    state = reducers(state, {
      type: PAUSE_GAME,
      data: undefined,
    });
    expect(state.status.state).toBe(gameStates.STATE_PAUSED);

    state = reducers(state, {
      type: UNPAUSE_GAME,
      data: undefined,
    });
    expect(state.status.state).toBe(gameStates.STATE_GOING);
  });
});
