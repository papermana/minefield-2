jest.unmock('@js/actions/clickField');
jest.unmock('@js/actions/actionTypes');
jest.unmock('@utils/findNeighbors');
jest.unmock('@js/dataTypes');
jest.unmock('redux-mock-store');
jest.unmock('redux-thunk');

import clickField, {
  CLICK_FIELD,
} from '@js/actions/clickField';
import {
  State,
} from '@js/dataTypes';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';


const mockStore = configureStore([thunk]);

describe('`clickField()` - An async action creators which decides which fields to uncover after a click on one of them', () => {
  it('should pass an ES6 Set object as data', () => {
    const store = mockStore(new State({
      boardLayout: [],
    }));

    store.dispatch(clickField());

    expect(store.getActions()).toEqual([
      {
        type: CLICK_FIELD,
        data: new Set([undefined]),
      },
    ]);
  });

  it('should uncover only the clicked field if it has a value different than `0`', () => {
    const store = mockStore(new State({
      boardLayout: [0, 1, 0, 'mine'],
    }));

    store.dispatch(clickField(1));

    expect(store.getActions()).toEqual([
      {
        type: CLICK_FIELD,
        data: new Set([1]),
      },
    ]);
  });

  it('should uncover all the (un-unconvered and un-flagged) neighboring fields if the value of the clicked field is `0`, and it should repeat that recursively for all neighboring fields with value `0`', () => {
    const boardConfig = {
      rows: 5,
      columns: 5,
      mines: 4,
    };
    const m = 'mine';
    const boardLayout = [
      m, 1, 1, m, 1,
      2, 2, 1, 1, 1,
      m, 1, 0, 0, 0,
      2, 2, 0, 0, 0,
      m, 1, 0, 0, 0,
    ];
    const playerActions = [
      undefined, undefined, undefined, undefined, undefined,
      undefined, 'clicked', 'flagged',
    ];
    const store = mockStore(new State({
      boardConfig,
      boardLayout,
      playerActions,
    }));
    const expectedData = new Set([
      8, 9,
      11, 12, 13, 14,
      16, 17, 18, 19,
      21, 22, 23, 24,
    ]);

    store.dispatch(clickField(12));

    const result = store.getActions();

    expect(result[0].type).toBe(CLICK_FIELD);
    expect([...result[0].data].sort()).toEqual([...expectedData].sort());
  });
});
