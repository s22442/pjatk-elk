import { calculateR, calculateR3 } from '~/helpers/resistance';

describe('resistance helpers', () => {
  describe('calculateR', () => {
    it('C = 10nF | w0 = 5k => R = 20k', () => {
      expect(calculateR(10 / 10 ** 9, 5000)).toBe(3183.0989);
      expect(calculateR(10 / 10 ** 8, 3000)).toBe(530.5165);
      expect(calculateR(10 / 10 ** 7, 8000)).toBe(19.8944);
    });
  });

  describe('calculateR3', () => {
    it('Q = 0.9 | R4 = 22k => R3 = 24750', () => {
      expect(calculateR3(0.9, 22_000)).toBe(24_750);
      expect(calculateR3(0.707, 20_000)).toBe(34_154.5894);
      expect(calculateR3(0.8, 10_000)).toBe(13_333.3333);
    });
  });
});
