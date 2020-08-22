module.exports = function () {
  return {
    env: {
      type: 'node',
      runner: 'node',
    },

    testFramework: 'jest',

    files: ['./package.json', 'src/**/*.ts', '!src/**/*.*.ts', 'src/**/*.tsx', '!src/**/*.*.tsx'],

    tests: ['src/**/*.spec.ts', 'src/*/*.*.tsx', 'src/**/*.spec.ts'],
    setup: (w) => {
      w.testFramework.configure(require('./package.json').jest);
    },
  };
};
