import Immutable from 'immutable';
import findNeighbors from '@utils/findNeighbors';


const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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
  let result = new Immutable.List().setSize(numOfFields);

  result = result.withMutations(resultMut => populate(resultMut, config));

  return result;
};


export default createBoardLayout;
//  Only for testing purposes:
export {
  populate,
};
