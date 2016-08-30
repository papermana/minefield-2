jest.unmock('redux-mock-store');
jest.unmock('@js/utils/middlewareSaveGame');
jest.unmock('@js/dataTypes');

import configureStore from 'redux-mock-store';
import saveGame from '@js/utils/middlewareSaveGame';
import {
  State,
} from '@js/dataTypes';


const mockStore = configureStore([saveGame]);

describe('`saveGame()` - Redux middleware for saving the state of the game on every action', () => {
  it('should save the store state in storage *after* the reducer returns', () => {
    const store = mockStore(new State());

    store.dispatch({
      type: 'FAKE',
      data: undefined,
    });

    expect(store.getActions().length).toBe(1);
    expect(store.getActions()[0]).toEqual({
      type: 'FAKE',
      data: undefined,
    });
    expect(window.localStorage.setItem).not.toBeCalled();

    jest.runOnlyPendingTimers();
    expect(window.localStorage.setItem).toBeCalledWith(
      'savedGame',
      JSON.stringify(store.getState())
    );
  });
});
