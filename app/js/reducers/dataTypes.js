import Immutable from 'immutable';
import createBoardLayout from '@utils/createBoardLayout';


class BoardConfig extends new Immutable.Record({
  rows: 10,
  columns: 10,
  mines: 12,
}) {}

class Status extends new Immutable.Record({
  time: 0,
  flagsDeployed: 0,
  minesFlagged: 0,
  state: 'STATE_GOING',
}) {
  get STATE_GOING() {
    return 'STATE_GOING';
  }

  get STATE_PAUSED() {
    return 'STATE_PAUSED';
  }

  get STATE_WON() {
    return 'STATE_WON';
  }

  get STATE_LOST() {
    return 'STATE_LOST';
  }
}

class UiState extends new Immutable.Record({
  topbarActive: false,
}) {}

class State extends new Immutable.Record({
  boardConfig: new BoardConfig(),
  status: new Status(),
  boardLayout: createBoardLayout(new BoardConfig()),
  playerActions: new Immutable.List(),
  uiState: new UiState(),
}) {
  constructor(data) {
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
        dataToPass.playerActions = new Immutable.List(data.playerActions);
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
};
