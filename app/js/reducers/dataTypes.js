import Immutable from 'immutable';
import createBoardLayout from '@utils/createBoardLayout';


class BoardConfig extends Immutable.Record({
  rows: 10,
  columns: 10,
  mines: 12,
}) {
  constructor(data) {
    super(data);
  }
}

class Status extends Immutable.Record({
  time: 0,
  flagsDeployed: 0,
  minesFlagged: 0,
}) {
  constructor(data) {
    super(data);
  }
}

class State extends Immutable.Record({
  boardConfig: new BoardConfig(),
  status: new Status(),
  boardLayout: createBoardLayout(new BoardConfig()),
  playerActions: Immutable.List(),
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
        dataToPass.boardLayout = Immutable.List(data.boardLayout);
      }
      else {
        dataToPass.boardLayout = createBoardLayout(data.boardConfig || new BoardConfig());
      }

      if (data.playerActions) {
        dataToPass.playerActions = Immutable.List(data.playerActions);
      }
    }

    super(dataToPass);
  }
}


export {
  State,
  BoardConfig,
  Status,
};
