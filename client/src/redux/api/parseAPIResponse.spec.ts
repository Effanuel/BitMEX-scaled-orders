import {parseData} from './parseAPIResponse';

describe('parseData()', () => {
  const testConfig = {
    sampleMethod1: {
      keys: ['sss'],
    },
    allArray: {
      keys: '_ALL_FIELDS_' as const,
      isArray: true,
    },
    array: {
      keys: ['aaa'],
    },
  };

  it('should only return text key if no other keys are provided', () => {
    const data = JSON.stringify({text: '123', sample1: 'sample1', sample2: 'sample2'});
    expect(parseData(testConfig)('sampleMethod2' as any)({data})).toEqual({text: '123'});
  });

  it('should return keys based on config', () => {
    const data = JSON.stringify({text: '123', sss: 'sss', sss2: 'sss2'});
    expect(parseData(testConfig)('sampleMethod1')({data})).toEqual({text: '123', sss: 'sss'});
  });

  it('should return all array data', () => {
    const data = JSON.stringify([
      {text: '111', aaa: 'aaa', bbb: 'bbb'},
      {text: '222', ccc: 'ccc', ddd: 'ddd'},
    ]);
    expect(parseData(testConfig)('allArray')({data})).toEqual([
      {text: '111', aaa: 'aaa', bbb: 'bbb'},
      {text: '222', ccc: 'ccc', ddd: 'ddd'},
    ]);
  });

  it('should return first array element if type is array but config doesnt explicitly says so', () => {
    const data = JSON.stringify([
      {text: '111', aaa: 'aaa', bbb: 'bbb'},
      {text: '222', sss: 'sss', sss2: 'sss2'},
    ]);
    expect(parseData(testConfig)('array')({data})).toEqual({text: '111', aaa: 'aaa'});
  });
});
