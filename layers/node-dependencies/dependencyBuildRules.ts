// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dependencies } = require('./nodejs/package.json');

// build a regular expression that matches dependencies that aren't in the
const dependenciesFromOtherLayers = [
  '@aws-lambda-powertools/commons',
  '@aws-lambda-powertools/logger',
  '@aws-lambda-powertools/metrics',
  '@aws-lambda-powertools/tracer',
  'aws-xray-sdk-core',
];
const dependencyNames = [
  ...dependenciesFromOtherLayers,
  ...Object.keys(dependencies),
].join('|');

export default {
  external: [new RegExp(`^(${dependencyNames})`)],
  noExternal: [new RegExp(`^(?!(${dependencyNames}))`)],
};
