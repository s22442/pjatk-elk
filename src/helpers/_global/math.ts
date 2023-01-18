const PRECISION = 8;

const multiplier = 10 ** PRECISION;

export const roundResult = (v: number) =>
  Math.round(v * multiplier) / multiplier;
