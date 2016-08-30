jest.unmock('@js/actionCreators/startTimer');
jest.unmock('@js/actionCreators/types');
jest.unmock('@js/reducers/dataTypes');
jest.unmock('redux-mock-store');
jest.unmock('redux-thunk');

import startTimer from '@js/actionCreators/startTimer';
import {
  INCREMENT_TIMER,
} from '@js/actionCreators/types';
import {
  gameStates,
  State,
} from '@js/reducers/dataTypes';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';


const mockStore = configureStore([thunk]);

describe('`startTimer() - Action creator which dispatches an `INCREMENT_TIMER` action regularly', () => {
  it('should start an interval, and dispatch every second', () => {
    const store = mockStore(new State());

    store.dispatch(startTimer());
    expect(store.getActions().length).toBe(0);

    jest.runOnlyPendingTimers();
    expect(store.getActions().length).toBe(1);
    expect(store.getActions()[0]).toEqual({
      type: INCREMENT_TIMER,
      data: undefined,
    });

    jest.runOnlyPendingTimers();
    expect(store.getActions().length).toBe(2);
    expect(store.getActions()[1]).toEqual({
      type: INCREMENT_TIMER,
      data: undefined,
    });
  });

  it('should not increment timer if `status.state` is not `STATE_GOING`', () => {
    let store;

    store = mockStore(new State({
      status: {
        state: gameStates.STATE_PAUSED,
      },
    }));
    store.dispatch(startTimer());
    jest.runOnlyPendingTimers();
    expect(store.getActions().length).toBe(0);

    store = mockStore(new State({
      status: {
        state: gameStates.STATE_WON,
      },
    }));
    store.dispatch(startTimer());
    jest.runOnlyPendingTimers();
    expect(store.getActions().length).toBe(0);

    store = mockStore(new State({
      status: {
        state: gameStates.STATE_LOST,
      },
    }));
    store.dispatch(startTimer());
    jest.runOnlyPendingTimers();
    expect(store.getActions().length).toBe(0);
  });
});
