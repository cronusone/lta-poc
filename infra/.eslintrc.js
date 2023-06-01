module.exports = {
  extends: ['./.eslintrc.base.js'],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        // adds default custom grouping for @nutrien  and local packages
        // see https://github.com/lydell/eslint-plugin-simple-import-sort#custom-grouping
        groups: [
          ['^\\u0000', '^@?\\w'],
          ['^@nutrien', '^graphql-schema'],
          ['^', '^\\.'],
        ],
      },
    ],
    'jest/expect-expect': [
      'warn',
      {
        assertFunctionNames: [
          'expect',
          '*.resourceCountIs',
          '*.hasResourceProperties',
          '*.hasResource',
          '*.hasOutput',
          '*.hasParameter',
          '*.hasMapping',
          '*.hasCondition',
          '*.templateMatches',
        ],
      },
    ],
  },
};
