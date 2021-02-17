module.exports = {
  clearMocks: true,
  preset: '@shelf/jest-mongodb',
  projects: ['<rootDir>/projects/*/jest.config.js'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  testMatch: ['*.spec.ts', '*.spec.tsx'],
};
