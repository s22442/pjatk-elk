export const calculateR = (c: number, f0: number) =>
  roundResult(1 / (c * f0 * Math.PI * 2));

export const calculateR3 = (q: number, r4: number) => {
  const divider = 2 - 1 / q;
  return roundResult(r4 / divider);
};
