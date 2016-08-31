import Immutable from 'immutable';
import createBoardLayout from '@utils/createBoardLayout';


class BoardConfig extends new Immutable.Record({
  rows: 10,
  columns: 10,
  mines: 12,
}) {}

const gameStates = {
  STATE_GOING: 'STATE_GOING',
  STATE_PAUSED: 'STATE_PAUSED',
  STATE_WON: 'STATE_WON',
  STATE_LOST: 'STATE_LOST',
};

class Status extends new Immutable.Record({
  time: 0,
  flagsDeployed: 0,
  minesFlagged: 0,
  state: gameStates.STATE_GOING,
}) {}

class UiState extends new Immutable.Record({
  topbarActive: false,
  showNewGameDialog: false,
}) {}

class State extends new Immutable.Record({
  boardConfig: new BoardConfig(),
  status: new Status(),
  boardLayout: createBoardLayout(new BoardConfig()),
  playerActions: new Immutable.List(),
  uiState: new UiState(),
}) {
  constructor(data) {
    if (!data) {
      data = JSON.parse(localStorage.getItem('savedGame'));
      data.uiState = {};

      if (
        data.status &&
        (
          data.status.state === gameStates.STATE_LOST ||
          data.status.state === gameStates.STATE_WON
        )
      ) {
        data = undefined;
      }
    }

    const dataToPass = Object.assign({}, data);

    if (data) {
      if (data.boardConfig) {
        dataToPass.boardConfig = new BoardConfig(data.boardConfig);
      }

      if (data.status) {
        dataToPass.status = new Status(data.status);
      }

      if (data.boardLayout) {
        dataToPass.boardLayout = new Immutable.List(data.boardLayout);
      }
      else {
        dataToPass.boardLayout = createBoardLayout(data.boardConfig || new BoardConfig());
      }

      if (data.playerActions) {
        dataToPass.playerActions = new Immutable.List(data.playerActions)
        .map(value => value === null ? undefined : value);
      }

      if (data.uiState) {
        dataToPass.uiState = new UiState(data.uiState);
      }
    }

    super(dataToPass);
  }
}


export {
  State,
  BoardConfig,
  UiState,
  Status,
  gameStates,
};
