import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { twoSum } from "./exercises.ts";

describe("twoSum()", () => {
  it('should work correctly', () => {
    const result1 = twoSum([], 5);
    const result2 = twoSum([3], 8);
    const result3 = twoSum([1, 3, 7, 9, 2], 11);
    const result4 = twoSum([8, 35, 4, 6, 15, 1, 12, 20, 17], 29);
    const result5 = twoSum([4, 10, 2, 28], 17);
    const result6 = twoSum([-1,-2,-3,-4,-5], -8);

    assert.strictEqual(result1, null);
    assert.strictEqual(result2, null);
    assert.deepEqual(result3, [3, 4]);
    assert.deepEqual(result4, [6, 8]);
    assert.strictEqual(result5, null);
    assert.deepEqual(result6, [2, 4]);
  });
});
