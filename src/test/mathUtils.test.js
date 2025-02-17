import { add, round } from "./mathUtils";

describe("add 関数のテスト", () => {
	test("説明分: 1 + 1 は2になる",() => {
		expect(add(1,1)).toBe(2);
	})
	test("-3 + 1 は-2になる",() => {
		expect(add(-3,1)).toBe(-2);
	})
	test("-3 + -2 は-5になる",() => {
		expect(add(-3,-2)).toBe(-5);
	})
});

describe("rund 関数のテスト", () => {
	test("1.5の四捨五入は2になる",() => {
		expect(round(1.5)).toBe(2);
	})
	test("1.4の四捨五入は1になる",() => {
		expect(round(1.4)).toBe(1);
	})
})