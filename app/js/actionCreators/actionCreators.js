const types = {
  //  data: any string
  TEST: 'TEST',
};

const actionCreators = {};

for (let type in types) {
  type = type.toLowerCase().replace(/_(\w)/, (match, s1) => s1.toUpperCase());

  actionCreators[type] = data => ({
    type,
    data,
  });
}


export default actionCreators;
export {
  types,
};
