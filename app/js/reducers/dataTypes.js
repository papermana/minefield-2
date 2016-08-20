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
    if (data) {
      if (data.boardConfig) {
        data.boardConfig = new BoardConfig(data.boardConfig);
      }

      if (data.status) {
        data.status = new Status(data.status);
      }

      if (data.boardLayout) {
        data.boardLayout = Immutable.List(data.boardLayout);
      }
      else {
        data.boardLayout = createBoardLayout(data.boardConfig || new BoardConfig());
      }

      if (data.playerActions) {
        data.playerActions = Immutable.List(data.playerActions);
      }
    }

    super(data);
  }
}


export {
  State,
  BoardConfig,
  Status,
};
