import path from 'path';

export const REPO_ROOT = path.resolve('__dirname', '..', '..');
export const LAYERS_NODE_DEPENDENCIES_ROOT = path.resolve(
  REPO_ROOT,
  'layers',
  'node-dependencies'
);
export const LAMBDAS_ROOT = path.resolve(REPO_ROOT, 'lambdas');
export const PACKAGES_ROOT = path.resolve(REPO_ROOT, 'packages');
