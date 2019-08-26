import { isValidEmail, isValidString } from "App/utils";

describe('Validation util spec', () => {
  describe('isValidString', () => {
    const testCases = [
      {input: 90, expected: true},
      {input: 'some', expected: true},
      {input: '', expected: false},
      {input: '   ', expected: false},
      {input: {}, expected: false},
      {input: [], expected: false},
      {input: null, expected: false},
      {input: undefined, expected: false}
    ];

    testCases.forEach(({input, expected}) => {
      it(`should return "${expected}" when invoked with "${input}"`, () => {
        expect(isValidString(input)).toBe(expected);
      });
    });
  });

  describe('isValidEmail', () => {
    const testCases = [
      {input: undefined, expected: false},
      {input: null, expected: false},
      {input: 'john@email', expected: false},
      {input: 'john@email.com', expected: true}
    ];

    testCases.forEach(({input, expected}) => {
      it(`should return "${expected}" invoked with "${input}"`, () => {
        expect(isValidEmail(input)).toBe(expected);
      });
    });
  })
});