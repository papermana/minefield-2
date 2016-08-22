jest.unmock('@js/reducers');
jest.unmock('@js/reducers/dataTypes');
jest.unmock('@js/actionCreators');

import Immutable from 'immutable';
import reducers from '@js/reducers';
import {
  State,
} from '@js/reducers/dataTypes';
import {
  types,
} from '@js/actionCreators';


const {
  CLICK_FIELD,
  FLAG_FIELD,
} = types;

describe('`reducers.js` - The main reducer in the app', () => {
  it('should use a new State instance if no state was passed in', () => {
    const result = reducers(undefined, {});

    expect(result).toEqual(new State());
  });

  it('should return state unchanged if it doesn\'t recognize the action', () => {
    const state = new Immutable.Map();
    const action = {
      type: 'TEST',
      data: undefined,
    };
    const result = reducers(state, action);

    expect(result).toBe(state);
  });

  it('should, in case of a `CLICK_FIELD` action, take the array passed in as action data, and for each value in that array set "clicked" in the `playerActions` property at an index equal to the value', () => {
    const action = {
      type: CLICK_FIELD,
      data: [0, 5, 8],
    };
    const result = reducers(undefined, action);

    expect(result.playerActions.toJS()).toEqual([
      'clicked',
      undefined, undefined, undefined, undefined,
      'clicked',
      undefined, undefined,
      'clicked',
    ]);
  });

  it('should, in case of a `FLAG_FIELD` action, set "flagged" in the `playerActions` property at an index equal to the value in action data', () => {
    const action = {
      type: FLAG_FIELD,
      data: 2,
    };
    const result = reducers(undefined, action);

    expect(result.playerActions.toJS()).toEqual([
      undefined, undefined,
      'flagged',
    ]);
  });
});
