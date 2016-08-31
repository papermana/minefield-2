jest.unmock('@js/reducers');
jest.unmock('@js/dataTypes');
jest.unmock('@js/actions');

import Immutable from 'immutable';
import reducers from '@js/reducers';
import {
  gameStates,
  Status,
  BoardConfig,
  UiState,
  State,
} from '@js/dataTypes';
import {
  types,
} from '@js/actions';
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
  SET_BOARD_CONFIG,
  SHOW_NEW_GAME_DIALOG,
  HIDE_NEW_GAME_DIALOG,
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

  it('should set the `status.state` property to `STATE_WON` if all mines are flagged, only mines are flagged, and all other fields have been uncovered', () => {
    let state;

    //  Win if all mines are flagged:
    state = new State({
      boardLayout: [1, 1, 'mine', 'mine'],
      playerActions: ['clicked', 'clicked', 'flagged'],
      status: new Status({
        flagsDeployed: 1,
        minesFlagged: 1,
      }),
      boardConfig: new BoardConfig({
        mines: 2,
      }),
    });
    expect(state.status.state).toBe(gameStates.STATE_GOING);

    state = reducers(state, {
      type: FLAG_FIELD,
      data: 3,
    });
    expect(state.status.state).toBe(gameStates.STATE_WON);

    //  Win only if nothing besides mines is flagged and everything is uncovered:
    state = new State({
      boardLayout: [1, 1, 'mine', 'mine'],
      playerActions: ['flagged', 'clicked', 'flagged'],
      status: new Status({
        flagsDeployed: 2,
        minesFlagged: 1,
      }),
      boardConfig: new BoardConfig({
        mines: 2,
      }),
    });
    expect(state.status.state).toBe(gameStates.STATE_GOING);

    state = reducers(state, {
      type: FLAG_FIELD,
      data: 3,
    });
    expect(state.status.state).toBe(gameStates.STATE_GOING);

    state = reducers(state, {
      type: UNFLAG_FIELD,
      data: 0,
    });
    expect(state.status.state).toBe(gameStates.STATE_GOING);

    state = reducers(state, {
      type: CLICK_FIELD,
      data: new Set([0]),
    });
    expect(state.status.state).toBe(gameStates.STATE_WON);
  });

  it('should set the `status.state` property to `STATE_LOST` if a field has been clicked that contains a mine', () => {
    let state = new State({
      boardLayout: [1, 'mine'],
    });

    state = reducers(state, {
      type: CLICK_FIELD,
      data: new Set([1]),
    });
    expect(state.status.state).toBe(gameStates.STATE_LOST);
  });

  it('should merge the received data into `state.boardConfig` when the action `SET_BOARD_CONFIG` is dispatched', () => {
    let state = new State({
      boardConfig: {
        rows: 5,
        columns: 5,
        mines: 10,
      },
    });

    state = reducers(state, {
      type: SET_BOARD_CONFIG,
      data: {
        rows: 10,
        columns: 10,
      },
    });
    expect(state.boardConfig).toEqual(new BoardConfig({
      rows: 10,
      columns: 10,
      mines: 10,
    }));
  });

  it('should switch `uiState.showNewGameDialog` to true when the action `SHOW_NEW_GAME_DIALOG` is dispatched, and switch it to false on action `START_NEW_GAME`', () => {
    let state;

    state = new State();
    expect(state.uiState.showNewGameDialog).toBe(false);

    state = reducers(state, {
      type: SHOW_NEW_GAME_DIALOG,
      data: undefined,
    });
    expect(state.uiState.showNewGameDialog).toBe(true);

    state = reducers(state, {
      type: START_NEW_GAME,
      data: undefined,
    });
    expect(state.uiState.showNewGameDialog).toBe(false);
  });

  it('should set `uiState.showNewGameDialog` and `uiState.topbarActive` both to false when the action `HIDE_NEW_GAME_DIALOG` is dispatched', () => {
    let state;

    state = new State({
      uiState: {
        showNewGameDialog: true,
        topbarActive: true,
      },
    });
    expect(state.uiState.showNewGameDialog).toBe(true);
    expect(state.uiState.topbarActive).toBe(true);

    state = reducers(state, {
      type: HIDE_NEW_GAME_DIALOG,
      data: undefined,
    });
    expect(state.uiState.showNewGameDialog).toBe(false);
    expect(state.uiState.topbarActive).toBe(false);
  });

});
