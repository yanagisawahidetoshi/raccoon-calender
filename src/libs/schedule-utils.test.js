import {registSchedule, getSchedule, updatedSchedule,deleteSchedule,fetchSchedules } from "./schedule-utils";
import * as dateFns from "../libs/date-fns";
import axios from 'axios';

jest.mock("../libs/date-fns", () => ({
	...jest.requireActual("../libs/date-fns"),
	format: jest.fn(),
}));

// axiosMock
jest.mock("axios");

describe("src/libs/schedule-utils.js", () => {
	const mockSchedules = [
		{
			id: 1,
			date: "2025-01-02",
			startTime: "00:00",
			endTime: "23:59",
			content: "元旦",
		},
		{
			id: 2,
			date: "2025-01-02",
			startTime: "00:00",
			endTime: "23:59",
			content: "元旦",
		},
	];

	describe("fetchSchedules", () => {
		beforeEach(() => {
				jest.clearAllMocks();
		});
	
		it("call API and return data", async () => {
				const fakeData = [{ id: 1, title: "test" }];
				axios.get.mockResolvedValue({ data: fakeData }); 
	
				const result = await fetchSchedules();
	
				expect(axios.get).toHaveBeenCalledWith(
						"https://jsonplaceholder.typicode.com/todos/1"
				);
				expect(result).toEqual(fakeData);
		});
	});

	describe("deleteSchedule", () => {
		test("指定したスケジュールIDの削除を実行", () => {
			const scheduleId = 1;
			const result = deleteSchedule(mockSchedules,scheduleId);
			console.log("結果：" , result);
		});
		test("更新対象のIDがない場合に、エラーが発生する", () => {
			expect(() => {
				deleteSchedule(mockSchedules,999);
			}).toThrow("スケジュールが存在しません");
		})
	});

	describe("updatedSchedule", () => {
		test("スケジュールのアップデートを行う", () => {
			const scheduleData={
				id: 1,
				date: "2025-01-02",
				startTime: "00:00",
				endTime: "23:59",
				content: "休み",
			};
			const result = updatedSchedule(mockSchedules,scheduleData);
			expect(result[0].id).toBe(1);
			// console.log("結果：" , result);
		});
		test("更新対象のIDがない場合に、エラーが発生する", () => {
			expect(() => {
				updatedSchedule(mockSchedules,999);
			}).toThrow("スケジュールが存在しません");
		})
	});

	describe("getSchedule", () => {
		beforeEach(() => {
			dateFns.format.mockClear();
		});
		// test = it 同じ意味
		test("指定した日時に一致するスケジュールを返す", () => {
			dateFns.format.mockReturnValue("2025-01-02");

			const testDate = new Date("2025-01-02");
			const result = getSchedule(mockSchedules, testDate)

			expect(result).toEqual(mockSchedules);
		});
		test("一致するスケジュールがない場合空を返す", () => {
			dateFns.format.mockReturnValue("2025-01-03");

			const testDate = new Date("2025-01-00");
			const result = getSchedule(mockSchedules, testDate)

			expect(result).toEqual([]);
			//console.log("結果：" , result);
		});

	})
	
	describe("registSchedule", () => {
		test("スケジュールが空のとき、新しいスケジュールを登録。IDが1になること", () => {
			const schedules = [];
			const newSchedule = {
				date: "2025-01-01",
				startTime: "00:00",
				endTime: "23:59",
				content: "元旦",
			};
			const result = registSchedule(schedules,newSchedule);
	
			expect(result).toHaveLength(1);
			expect(result[0].id).toBe(1);
		});
	
		test("スケジュールが1つある場合に、新しいスケジュールを登録。IDが元あるスケジュールIDに1増加すること", () => {
			const schedules = [
				{
					id: 1,
					date: "2025-02-01",
					startTime: "08:00",
					endTime: "09:59",
					content: "散歩",
				}
			];
			const newSchedule = {
				date: "2025-02-14",
				startTime: "00:00",
				endTime: "23:59",
				content: "バレンタイン",
			};
			const result = registSchedule(schedules,newSchedule);
	
			expect(result).toHaveLength(2);
			expect(result[1].id).toBe(2);
		});

		test("スケジュールが1つある場合に、日付の古いスケジュールを登録。schedulesの中身がソートされること", () => {
			const schedules = [
				{
					id: 10,
					date: "2025-02-01",
					startTime: "08:00",
					endTime: "09:59",
					content: "散歩",
				}
			];
			const newSchedule = {
				date: "2025-01-1",
				startTime: "00:00",
				endTime: "23:59",
				content: "元旦",
			};
			const result = registSchedule(schedules,newSchedule);
	
			expect(result).toHaveLength(2);
			expect(result[0].id).toBe(11);

		});

		test("IDが重複", () => {
			const schedules = [
				{
					id: 1,
					date: "2025-02-01",
					startTime: "00:00",
					endTime: "23:59",
					content: "hoge",
				}
			];
			const newSchedule = {
				date: "2025-01-01",
				startTime: "00:00",
				endTime: "23:59",
				content: "元旦",
			};

			const result = registSchedule(schedules,newSchedule);
	
			expect(result).toHaveLength(2);
			expect(result[1].id).toBe(1);
	
			const newSchedule2 = {
				date: "2025-01-03",
				startTime: "00:00",
				endTime: "23:59",
				content: "元旦",
			};

			const result2 = registSchedule(schedules,newSchedule2);

			expect(result2).toHaveLength(3);
			expect(result2[2].id).toBe(1);
			
			// console.log("結果：" , result);
		});

	})	
});

