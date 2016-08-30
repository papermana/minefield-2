//  Place this at the bottom of the 'middleware chain' in `main.jsx`, so that only actual actions that are going to reach the reducer are going to get here.
const saveGame = store => next => action => {
  //  Only do this *after* the reducer returns new state:
  setTimeout(() => {
    localStorage.setItem('savedGame', JSON.stringify(store.getState()));
  }, 0);

  next(action);
};


export default saveGame;
