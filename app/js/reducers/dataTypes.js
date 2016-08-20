import Immutable from 'immutable';


class State extends Immutable.Record({
  foo: 'bar',
}) {
  constructor(data) {
    super(data);
  }
}


export {
  State,
};
