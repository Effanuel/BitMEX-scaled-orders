module.exports = {
  verbose: true,
  clearMocks: true,
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/src/setupTests.ts'],
  transform: {'^.+\\.tsx?$': 'ts-jest'},
  testPathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/?(*.)(spec|test|it).(ts|tsx|js|jsx)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
