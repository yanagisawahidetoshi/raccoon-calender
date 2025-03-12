import { add , round } from "./mathUtils.js";

describe ("addのてすと", () => {
	test("1 + 1は2",()=> {
		expect(add(1,1)).toBe(2);
	})
	test("-1 + -1は-2",()=>{
		expect(add(-1,-1)).toBe(-2);
	})
	test("3 + -5は-2",()=>{
		expect(add(3,-5)).toBe(-2);
	})
});
describe ("roundのてすと", () => {
	test("0.5は1",()=>{
		expect(round(0.5)).toBe(1);
	})
	test("0.4は0",()=> {
		expect(round(0.4)).toBe(0);
	})
});
