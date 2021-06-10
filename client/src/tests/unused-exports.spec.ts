import analyzeTsConfig from 'ts-unused-exports';

const ignorePaths: string[] = [
  'redux/api/bybit',
  'redux/api/binance',
  'redux/api/bitmex',
  'components',
  'tests/mockData',
  'redux/selectors',
];

describe('unused exports', () => {
  it('should check for unused exports', () => {
    const results = analyzeTsConfig('./tsconfig.json', [
      `--excludePathsFromReport=${ignorePaths.join(';')}`,
      '--allowUnusedTypes',
      '--excludeDeclarationFiles',
    ]);
    expect(results).toEqual({});
  });
});
