export const areArraysEqual = (a: (string | null)[], b: (string | null)[]) =>
  a.length === b.length && a.every((val, index) => val === b[index]);
