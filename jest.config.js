export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['babel-jest', { configFile: './babel.config.js' }]
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '^(.*)\\.js$': '$1',
  },
  testPathIgnorePatterns: ['/dist/'],
};
