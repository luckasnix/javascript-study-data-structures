// Given an array of integers, return the indices of two numbers that add up to a given target
// If there is no solution, it should return null
// Constraints:
// - There are no duplicate numbers
// - Only one pair of numbers will add up to the target
export const twoSum = (numbers: number[], target: number) => {
  if (numbers.length < 2) { // The array must have at least two items
    return null;
  }
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        return [i, j];
      }
    }
  }
  return null;
};
