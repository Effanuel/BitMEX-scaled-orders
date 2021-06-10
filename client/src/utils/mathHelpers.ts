const generateGaussianPoint = (mean: number, x: number, delta: number): number => {
  const member1 = 1 / (delta * Math.sqrt(2 * Math.PI));
  const member2 = Math.pow(Math.E, -((x - mean) ** 2) / (2 * delta ** 2));
  return member1 * member2;
};

export function skewedProbabilityMap(n_tp: number, START_CFG: number, END_CFG: number, mean: number): number[] {
  const incrementQty = (END_CFG - START_CFG) / (n_tp - 1);
  return [...Array(n_tp).keys()].map((_, index) => generateGaussianPoint(mean, START_CFG + index * incrementQty, 1));
}

export function uniformProbabilityMap(n_tp: number): number[] {
  return Array(n_tp).fill(1);
}
