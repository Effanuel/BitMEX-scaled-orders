/**
 * Probability density function
 * @param {number} mean of the distribution
 * @param {number} x is a point in that distribution
 * @param {number} delta is a variance parameter
 * @returns {number} location probability of that x
 */
export const gaussian = (mean: number, x: number, delta: number): number => {
  const member1 = 1 / (delta * Math.sqrt(2 * Math.PI));
  const member2 = Math.pow(Math.E, -((x - mean) ** 2) / (2 * delta ** 2));
  return member1 * member2; // this number can be normalized (ex. dividing by 100)
};
