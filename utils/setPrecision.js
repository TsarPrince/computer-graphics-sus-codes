// write js doc here
/**
 * Returns number with precision set, without rounding
 * @param {number} x - input number
 * @param {number} precision - no of digits after decimal point
 * @return {number} number with precision set
 * @example
 * setPrecision(1.2345, 2) // 1.23
 * setPrecision(1.2355, 2) // 1.23
 * setPrecision(1.2365, 2) // 1.23
 */
const setPrecision = (x, precision) => {
  if (!x) return 0;
  const [boxOfX, fractionalPartOfX] = x.toString().split(".");
  if (!fractionalPartOfX) return x;
  return Number(boxOfX + "." + fractionalPartOfX.slice(0, precision));
};

export default setPrecision;
