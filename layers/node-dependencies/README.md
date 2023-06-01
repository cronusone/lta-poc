# Shared lambda Node.js dependencies

The dependencies in `nodejs/package.json` will be included in a shared lambda
layer that is available to all lambdas in the project. This allows larger
dependencies to be bundled once, and also is needed for any packages that have
native code and can't be bundled directly into a distribution JS file.

The strategy for each lambda is to bundle/inline any additional dependencies
so the resulting compiled JS file works standalone without any `node_modules`
short of the shared dependencies listed here. This means the `dist/` folder
can be bundled directly as the lambda zipped asset.
