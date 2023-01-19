import { calculateR, calculateR3 } from '~/helpers/resistance';

describe('resistance helpers', () => {
  describe('calculateR', () => {
    it('C = 10nF | w0 = 5k => R = 20k', () => {
      expect(calculateR(10 / 10 ** 9, 5000)).toBe(20_000);
    });
  });

  describe('calculateR3', () => {
    it('Q = 0.9 | R4 = 22k => R3 = 24750', () => {
      expect(calculateR3(0.9, 22_000)).toBe(24_750);
    });
  });
});
