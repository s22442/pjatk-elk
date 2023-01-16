import {
  calculateHighPassFilterCutoffFrequency,
  calculateLowPassFilterCutoffFrequency,
  calculatePassbandSystemAmplification,
} from '~/helpers/elk';

describe('ELK', () => {
  it('Częstotliwość odcięcia filtru dolnoprzepustowego', () => {
    expect(calculateLowPassFilterCutoffFrequency(1, 1)).toBe(1);
  });

  it('Częstotliwość odcięcia filtru górnoprzepustowego', () => {
    expect(calculateHighPassFilterCutoffFrequency(1, 1)).toBe(1);
  });

  it('Wzmocnienie układu dla pasma przepustowego', () => {
    expect(calculatePassbandSystemAmplification(1, 1)).toBe(1);
  });
});
