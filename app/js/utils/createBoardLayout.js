import Immutable from 'immutable';


const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const findNeighbors = (id, config) => {
  const numOfFields = config.rows * config.columns;
  const remainder = id % config.columns;
  const neighbors = [id - config.columns, id + config.columns];

  if (remainder !== 0) {
    neighbors.push(id - 1, id - config.columns - 1, id + config.columns - 1);
  }
  if (remainder !== config.columns - 1) {
    neighbors.push(id + 1, id - config.columns + 1, id + config.columns + 1);
  }

  return neighbors.filter(el => el >= 0 && el < numOfFields);
};

const populate = (board, config) => {
  const numOfFields = config.rows * config.columns;
  let numOfMines = config.mines;
  let random;

  while (numOfMines > 0) {
    random = randomInt(0, numOfFields - 1);

    if (board.get(random) === undefined) {
      board.set(random, 'mine');
      numOfMines--;
    }
    else {
      continue;
    }
  }

  for (let id = 0; id < numOfFields; id++) {
    if (board.get(id) !== 'mine') {
      let minesAround = 0;
      const neighbors = findNeighbors(id, config);

      neighbors.forEach(el => {
        if (board.get(el) === 'mine') {
          minesAround++;
        }
      });

      board.set(id, minesAround);
    }
  }
};

const createBoardLayout = config => {
  const numOfFields = config.rows * config.columns;
  let result = Immutable.List().setSize(numOfFields);

  result = result.withMutations(result => populate(result, config));

  return result;
};


export default createBoardLayout;
//  Only for testing purposes:
export {
  findNeighbors,
  populate,
};
