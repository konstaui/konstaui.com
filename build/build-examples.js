const buildVueExamples = require('./examples/build-vue-examples');
const buildReactExamples = require('./examples/build-react-examples');

const buildExamples = async () => {
  buildVueExamples();
  buildReactExamples();
};

buildExamples();
