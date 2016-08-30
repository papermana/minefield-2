jest.unmock('@utils/createBoardLayout');
jest.unmock('@utils/findNeighbors');
jest.unmock('@js/dataTypes');

import createBoardLayout, {
  populate,
} from '@utils/createBoardLayout';
import {
  BoardConfig,
} from '@js/dataTypes';
import Immutable from 'immutable';


describe('`populate()` -- function which fills the board with mines in random places and then calculates values on remaining fields', () => {
  //  `populate()` uses an Immutable.js List object on which `withMutations()` was called. Therefore, we create a pseudo-`Immutable.List`, mutable object by extending a vanilla Array class.
  class Board extends Array {
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
