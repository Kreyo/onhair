const alpha =
  Array.from(Array(26)).map((e, i) => i + 65);
export const generateAlphabet = () =>
  alpha.map((x) => String.fromCharCode(x).toUpperCase());
