jest.unmock('@js/reducers/dataTypes');

import Immutable from 'immutable';
import {
  BoardConfig,
  Status,
  UiState,
  State,
} from '@js/reducers/dataTypes';
import createBoardLayout from '@utils/createBoardLayout';


describe('`dataTypes` - A collection of `Immutable.Record` classes for use as application state', () => {

  describe('`BoardConfig` - A class holding configuration data relating to the gameboard', () => {
    const defaultValues = {
      rows: 10,
      columns: 10,
      mines: 12,
    };

    it('should return a proper instance', () => {
      expect((new BoardConfig()) instanceof BoardConfig).toBe(true);
    });

    it('should have default values', () => {
      expect((new BoardConfig()).toJS()).toEqual(defaultValues);
    });

    it('should use the values it receives as an argument', () => {
      const result = new BoardConfig({
        rows: 5,
        columns: 5,
      });

      expect(result.rows).toBe(5);
      expect(result.columns).toBe(5);
      expect(result.mines).toBe(defaultValues.mines);
    });
  });

  describe('`Status` - A class holding current state of the game, e.g. time elapsed etc.', () => {
    const defaultValues = {
      time: 0,
      flagsDeployed: 0,
      minesFlagged: 0,
      state: 'STATE_GOING',
    };

    it('should return a proper instance', () => {
      expect((new Status()) instanceof Status).toBe(true);
    });

    it('should have default values', () => {
      expect((new Status()).toJS()).toEqual(defaultValues);
    });

    it('should use the values it receives as an argument', () => {
      const result = new Status({
        time: 50,
        minesFlagged: 2,
      });

      expect(result.time).toBe(50);
      expect(result.flagsDeployed).toBe(defaultValues.flagsDeployed);
      expect(result.minesFlagged).toBe(2);
    });

    it('should have getters returning constants allowed on the property `state`', () => {
      const result = new Status();

      expect(result.STATE_GOING).toBe('STATE_GOING');
      expect(result.STATE_PAUSED).toBe('STATE_PAUSED');
      expect(result.STATE_WON).toBe('STATE_WON');
      expect(result.STATE_LOST).toBe('STATE_LOST');
    });
  });

  describe('`UiState` - A class holding the state of UI', () => {
    const defaultValues = {
      topbarActive: false,
    };

    it('should return a proper instance', () => {
      expect((new UiState()) instanceof UiState).toBe(true);
    });

    it('should have default values', () => {
      expect((new UiState()).toJS()).toEqual(defaultValues);
    });

    it('should use the values it receives as an argument', () => {
      const result = new UiState({
        topbarActive: true,
      });

      expect(result.topbarActive).toBe(true);
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
      expect((new State()) instanceof State).toBe(true);
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
        state: 'STATE_PAUSED',
      };
      const boardLayoutData = [1, 1, 0, 0, 'mine', 'mine', 3, 2, 0, 0];
      const playerActionsData = [undefined, undefined, 'flagged', 'clicked'];
      const uiStateData = {
        topbarActive: true,
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
  });

});
