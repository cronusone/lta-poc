module.exports = {
  clearMocks: true,
  transform: {
    '.(js|ts)$': ['esbuild-jest', { sourcemap: true }],
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  collectCoverage: true,
};
