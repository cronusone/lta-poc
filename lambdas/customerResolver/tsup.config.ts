import { defineConfig } from 'tsup';

import dependencyBuildRules from '../../layers/node-dependencies/dependencyBuildRules';

export default defineConfig({
  clean: true,
  splitting: false,
  minify: true,
  sourcemap: true,
  entry: {
    index: 'src/handler.ts',
  },
  target: 'node16',
  ...dependencyBuildRules,
});
