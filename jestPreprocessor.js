const config = require('./webpack.config.js');
const aliasPreprocessor = require('jest-alias-preprocessor')(config);
const babel = require('babel-jest').createTransformer({
  plugins: 'transform-es2015-modules-commonjs',
});

module.exports = {
  process: (src, path) => {
    src = babel.process(src, path);
    src = aliasPreprocessor.process(src, path);

    return src;
  },
};
