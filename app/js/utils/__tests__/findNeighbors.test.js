jest.unmock('@utils/findNeighbors');
jest.unmock('@js/reducers/dataTypes');

import findNeighbors from '@utils/findNeighbors';
import {
  BoardConfig,
} from '@js/reducers/dataTypes';


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
