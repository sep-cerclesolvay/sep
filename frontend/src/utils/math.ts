export const removeDecimalZeros = (number: string): string => {
  if (number.split('.').length < 2) return number;
  let lastValidChar = number.length - 1;
  while (number[lastValidChar] === '0' || number[lastValidChar] === '.') {
    lastValidChar--;
  }
  return number.substring(0, lastValidChar + 1);
};
