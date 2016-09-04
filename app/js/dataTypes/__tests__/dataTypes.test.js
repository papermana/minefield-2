jest.unmock('@js/dataTypes');

import Immutable from 'immutable';
import {
  BoardConfig,
  gameStates,
  Status,
  UiState,
  State,
} from '@js/dataTypes';
import createBoardLayout from '@utils/createBoardLayout';


describe('`dataTypes` - A collection of `Immutable.Record` classes for use as application state', () => {

  describe('`BoardConfig` - A class holding configuration data relating to the gameboard', () => {
    const defaultValues = {
      rows: 10,
      columns: 10,
      mines: 12,
    };

    it('should return a proper instance', () => {
      const result = new BoardConfig();

      expect(result instanceof BoardConfig).toBe(true);
      expect(result instanceof Immutable.Record).toBe(true);
    });

    it('should have default values', () => {
      expect((new BoardConfig()).toObject()).toEqual(defaultValues);
    });

    it('should use the values it receives as an argument', () => {
      const data = {
        rows: 5,
        columns: 5,
        mines: 3,
      };

      expect((new BoardConfig(data)).toObject()).toEqual(data);
    });
  });

  describe('`Status` - A class holding current state of the game, e.g. time elapsed etc.', () => {
    const defaultValues = {
      time: 0,
      flagsDeployed: 0,
      minesFlagged: 0,
      state: gameStates.STATE_GOING,
    };

    it('should return a proper instance', () => {
      const result = new Status();

      expect(result instanceof Status).toBe(true);
      expect(result instanceof Immutable.Record).toBe(true);
    });

    it('should have default values', () => {
      expect((new Status()).toObject()).toEqual(defaultValues);
    });

    it('should use the values it receives as an argument', () => {
      const data = {
        time: 50,
        flagsDeployed: 1,
        minesFlagged: 2,
        state: gameStates.STATE_PAUSED,
      };

      expect((new Status(data)).toObject()).toEqual(data);
    });
  });

  describe('`UiState` - A class holding the state of UI', () => {
    const defaultValues = {
      topbarActive: false,
      showNewGameDialog: false,
    };

    it('should return a proper instance', () => {
      const result = new UiState();

      expect(result instanceof UiState).toBe(true);
      expect(result instanceof Immutable.Record).toBe(true);
    });

    it('should have default values', () => {
      expect((new UiState()).toJS()).toEqual(defaultValues);
    });

    it('should use the values it receives as an argument', () => {
      const data = {
        topbarActive: true,
        showNewGameDialog: true,
      };

      expect((new UiState(data)).toObject()).toEqual(data);
    });
  });

  describe('`State` - A class holding the entire state of the app', () => {
    const defaultValues = {
      boardConfig: new BoardConfig(),
      status: new Status(),
      boardLayout: createBoardLayout(new BoardConfig()),
      playerActions: new Immutable.List(),
      uiState: new UiState(),
    };

    it('should return a proper instance', () => {
      const result = new State();

      expect(result instanceof State).toBe(true);
      expect(result instanceof Immutable.Record).toBe(true);
    });

    it('should have default values', () => {
      expect((new State()).toObject()).toEqual(defaultValues);
    });

    it('should use the values it receives as an argument', () => {
      const boardConfigData = {
        rows: 5,
        columns: 5,
        mines: 2,
      };
      const statusData = {
        time: 30,
        flagsDeployed: 1,
        minesFlagged: 0,
        state: gameStates.STATE_PAUSED,
      };
      const boardLayoutData = [1, 1, 0, 0, 'mine', 'mine', 3, 2, 0, 0];
      const playerActionsData = [undefined, undefined, 'flagged', 'clicked'];
      const uiStateData = {
        topbarActive: true,
        showNewGameDialog: false,
      };
      const data = {
        boardConfig: boardConfigData,
        status: statusData,
        boardLayout: boardLayoutData,
        playerActions: playerActionsData,
        uiState: uiStateData,
      };
      const result = new State(data);

      expect(result.toJS()).toEqual(data);
      expect(result.boardConfig instanceof BoardConfig).toBe(true);
      expect(result.boardConfig).toEqual(new BoardConfig(boardConfigData));
      expect(result.status instanceof Status).toBe(true);
      expect(result.status).toEqual(new Status(statusData));
      expect(Immutable.List.isList(result.boardLayout)).toBe(true);
      expect(Immutable.List.isList(result.playerActions)).toBe(true);
      expect(result.uiState instanceof UiState).toBe(true);
      expect(result.uiState).toEqual(new UiState(uiStateData));
    });

    it('should, if no values are provided as an argument try to get the saved game state from storage', () => {
      const data = {
        boardConfig: {
          rows: 2,
          columns: 10,
          mines: 6,
        },
        status: {
          time: 21,
          flagsDeployed: 7,
          minesFlagged: 3,
          state: gameStates.STATE_GOING,
        },
        boardLayout: [1, 1, 0, 0, 'mine', 'mine', 3, 2, 0, 0],
        playerActions: [undefined, undefined, 'flagged', 'clicked'],
        uiState: defaultValues.uiState.toJS(),
      };

      window.localStorage.getItem = jest.fn(() => JSON.stringify(data));

      expect(new State().toJS()).toEqual(data);
    });

    it('should ignore the `uiState` property when getting state from storage', () => {
      window.localStorage.getItem = jest.fn(() => JSON.stringify({
        uiState: {
          topbarActive: true,
        },
      }));

      expect(new State().toObject()).toEqual(defaultValues);
    });

    it('should, except for `boardConfig`, ignore the data from storage if its `status.state` property is "STATE_WON" or "STATE_LOST"', () => {
      window.localStorage.getItem = jest.fn(() => JSON.stringify({
        status: {
          state: gameStates.STATE_WON,
        },
        boardConfig: {
          rows: 6,
        },
      }));

      const expectedResult = Object.assign({}, defaultValues, {
        boardConfig: new BoardConfig({
          rows: 6,
        }),
      });

      expect(new State().toObject()).toEqual(expectedResult);
    });
  });

});
