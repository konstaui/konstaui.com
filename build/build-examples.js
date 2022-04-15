const buildVueExamples = require('./examples/build-vue-examples');
const buildReactExamples = require('./examples/build-react-examples');
const buildSvelteExamples = require('./examples/build-svelte-examples');

const buildExamples = async () => {
  buildVueExamples();
  buildReactExamples();
  buildSvelteExamples();
};

buildExamples();
