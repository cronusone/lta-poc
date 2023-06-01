import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  splitting: false,
  minify: true,
  sourcemap: true,
  entry: {
    app: 'bin/app.ts',
    pipeline: 'bin/pipeline.ts',
  },
  target: 'node16',
});
