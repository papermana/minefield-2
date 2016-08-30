jest.unmock('redux-mock-store');
jest.unmock('@js/utils/middlewareSaveGame');
jest.unmock('@js/dataTypes');

import configureStore from 'redux-mock-store';
import saveGame from '@js/utils/middlewareSaveGame';
import {
  State,
} from '@js/dataTypes';


const mockStore = configureStore([saveGame]);

describe('`saveGame()` - Redux middleware for saving the state of the game', () => {
  it('should save the store state when the page is being unloaded', () => {
    const store = mockStore(new State());
    const unload = new CustomEvent('unload');

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

    window.dispatchEvent(unload);
    expect(window.localStorage.setItem).toBeCalledWith(
      'savedGame',
      JSON.stringify(store.getState())
    );
  });
});
