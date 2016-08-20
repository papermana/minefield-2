const findNeighbors = (id, config) => {
  const numOfFields = config.rows * config.columns;
  const remainder = id % config.columns;
  const neighbors = [id - config.columns, id + config.columns];

  if (remainder !== 0) {
    neighbors.push(id - 1, id - config.columns - 1, id + config.columns - 1);
  }
  if (remainder !== config.columns - 1) {
    neighbors.push(id + 1, id - config.columns + 1, id + config.columns + 1);
  }

  return neighbors.filter(el => el >= 0 && el < numOfFields);
};


export default findNeighbors;
