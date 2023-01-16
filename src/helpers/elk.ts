export const calculateLowPassFilterCutoffFrequency = (c: number, r2: number) =>
  roundResult(1 / (Math.PI * 2 * c * r2));

export const calculateHighPassFilterCutoffFrequency = (c: number, r1: number) =>
  roundResult(1 / (Math.PI * 2 * c * r1));

export const calculatePassbandSystemAmplification = (r1: number, r2: number) =>
  roundResult((r2 / r1) * -1);
