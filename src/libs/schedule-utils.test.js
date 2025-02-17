import {resgistSchedule} from "./schedule-utils";

describe("スケジュール登録", () => {
	test("スケジュールが空のとき", () => {
		const schedules = [];
		const newSchedule = {
			id: 1,
			date: "2025-01-01",
			startTime: "00:00",
			endTime: "23:59",
			content: "元旦",
		};
		const result = resgistSchedule(schedules,newSchedule);

		expect(result).toHaveLength(1);
		expect(result[0]).toEqual({...newSchedule,id:1});
	});
});