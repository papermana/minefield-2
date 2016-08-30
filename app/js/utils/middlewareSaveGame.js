//  Place this at the bottom of the 'middleware chain' in `main.jsx`, so that only actual actions that are going to reach the reducer are going to get here.
let doOnce = false;

const saveGame = store => next => action => {
  if (!doOnce) {
    doOnce = true;

    window.addEventListener('unload', () => {
      localStorage.setItem('savedGame', JSON.stringify(store.getState()));
    });
  }

  next(action);
};


export default saveGame;
