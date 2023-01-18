const PRECISION = 4;

const multiplier = 10 ** PRECISION;

export const roundResult = (v: number) =>
  Math.round(v * multiplier) / multiplier;
