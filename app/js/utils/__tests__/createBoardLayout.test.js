jest.unmock('@utils/createBoardLayout');
jest.unmock('@js/reducers/dataTypes');

import createBoardLayout from '@utils/createBoardLayout';
import {
  findNeighbors,
  populate,
} from '@utils/createBoardLayout';
import {
  BoardConfig,
} from '@js/reducers/dataTypes';
import Immutable from 'immutable';


describe('`findNeighbors()` -- function which finds id\'s of all the fields surrounding the selected field', () => {
  //  Our board looks like this:
  //  0 1 2
  //  3 4 5
  //  6 7 8

  const config = new BoardConfig({
    rows: 3,
    columns: 3,
  });

  it('should return an array of neighbors', () => {
    let result;

    result = findNeighbors(0, config);
    expect(result.sort()).toEqual([1, 3, 4]);

    result = findNeighbors(1, config);
    expect(result.sort()).toEqual([0, 2, 3, 4, 5]);

    result = findNeighbors(2, config);
    expect(result.sort()).toEqual([1, 4, 5]);

    result = findNeighbors(3, config);
    expect(result.sort()).toEqual([0, 1, 4, 6, 7]);

    result = findNeighbors(4, config);
    expect(result.sort()).toEqual([0, 1, 2, 3, 5, 6, 7, 8]);

    result = findNeighbors(5, config);
    expect(result.sort()).toEqual([1, 2, 4, 7, 8]);

    result = findNeighbors(6, config);
    expect(result.sort()).toEqual([3, 4, 7]);

    result = findNeighbors(7, config);
    expect(result.sort()).toEqual([3, 4, 5, 6, 8]);

    result = findNeighbors(8, config);
    expect(result.sort()).toEqual([4, 5, 7]);
  });
});

describe('`populate()` -- function which fills the board with mines in random places and then calculates values on remaining fields', () => {
  //  `populate()` uses an Immutable.js List object on which `withMutations()` was called. Therefore, we create a pseudo-`Immutable.List`, mutable object by extending a vanilla Array class.
  class Board extends Array {
    constructor(data) {
      super(data);
    }

    set(i, value) {
      this[i] = value;

      return this;
    }

    get(i) {
      return this[i];
    }
  }

  beforeEach(() => {
    window.Math._random = window.Math.random;
    window.Math.random = jest.fn();
  });

  afterEach(() => {
    window.Math.random = window.Math._random;
  });

  it('returns a populated board, with a correct number of mines and values of empty fields', () => {
    const config = new BoardConfig({
      rows: 3,
      columns: 3,
      mines: 3,
    });
    const board = new Board(9);

    //  Our desired board layout for this test is this (m = mine):
    //  - - m
    //  - - m
    //  m - -
    const randomReturnValues = [2 / 9, 5 / 9, 6 / 9];

    window.Math.random = jest.fn(() => {
      return randomReturnValues.shift();
    });

    populate(board, config);

    expect(board).toEqual([
      0, 2, 'mine',
      1, 3, 'mine',
      'mine', 2, 1,
    ]);
  });
});

describe('`createBoardLayout()` -- function which creates a starting layout for the Minefield board', () => {
  it('should take a `BoardConfig` object as an argument, and return a populated board in the form of an `Immutable.List` array', () => {
    const config = new BoardConfig({
      rows: 10,
      columns: 10,
      mines: 12,
    });
    const result = createBoardLayout(config);

    expect(result instanceof Immutable.List).toBe(true);
    expect(result.size).toBe(100);
    expect(result.filter(entry => entry === 'mine').size).toBe(12);
  });
});
