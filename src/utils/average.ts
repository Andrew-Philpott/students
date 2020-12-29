const average = (array: number[]) =>
  array.reduce((a: number, b: number) => a + b) / array.length;

export default average;