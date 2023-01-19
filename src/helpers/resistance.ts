export const calculateR = (c: number, w0: number) => {
  const rcproduct = 1 / w0;
  return roundResult(rcproduct / c);
};

export const calculateR3 = (q: number, r4: number) => {
  const divider = 2 - 1 / q;
  return roundResult(r4 / divider);
};
