import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src'],
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['mongodb'], // Exclude 'mongodb' from the bundle
});
