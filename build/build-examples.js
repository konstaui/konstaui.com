import buildVueExamples from './examples/build-vue-examples.js';
import buildReactExamples from './examples/build-react-examples.js';
import buildSvelteExamples from './examples/build-svelte-examples.js';

const buildExamples = async () => {
  buildVueExamples();
  buildReactExamples();
  buildSvelteExamples();
};

buildExamples();
