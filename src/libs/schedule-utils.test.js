import {registSchedule,getSchedule,updatedSchedule,deleteSchedule} from "./schedule-utils.js"
import * as dateFns from "../libs/date-fns";

jest.mock("../libs/date-fns",()=>({
    ...jest.requireActual("../libs/date-fns"),
    format: jest.fn(),
}));
const mockSchedules = [
    {
      id: 1,
      date: "2025-01-02",
      startTime: "00:00",
      endTime: "23:59",
      content: "元旦",
    },
  ];
describe("getSchedule",()=>{
    beforeEach(()=>{dateFns.format.mockClear();});
    test("スケジュールあった場合",()=>{
        dateFns.format.mockReturnValue("2025-01-02");
        const testDate = new Date("2025-01-10");
        const result = getSchedule(mockSchedules,testDate);
        expect(result).toEqual(mockSchedules);
    });
    test("スケジュールない場合",()=>{
        dateFns.format.mockReturnValue("2025-01-03");
        const testDate = new Date("2025-01-10");
        const result = getSchedule(mockSchedules,testDate);
        expect(result).toEqual([]);
    });
});

describe("registerSchedule",()=>{
  test("schedulesが空の時に、新しいscheduleが登録され、IDが1になること",()=>{
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
  test("schedulesに1つ値が入ってる時に、新しいscheduleが登録され、IDが1つ増えること",()=>{
    const schedules = [{
        date: "2025-01-01",
        startTime: "00:00",
        endTime: "23:59",
        content: "元旦",
        id:1,
    }];
    const newSchedule = {
        date: "2025-01-02",
        startTime: "00:00",
        endTime: "23:59",
        content: "2日",
    };
    const result = registSchedule(schedules,newSchedule);
    expect(result).toHaveLength(2);
    expect(result).toEqual([{
        date: "2025-01-01",
        startTime: "00:00",
        endTime: "23:59",
        content: "元旦",
        id:1,
    },{
        date: "2025-01-02",
        startTime: "00:00",
        endTime: "23:59",
        content: "2日",
        id:2,
    }]);
    expect(result[1].id).toBe(2);
  });
  test("schedulesに1つ値が入ってる時に、それより古いscheduleを登録されると、並び替えが起こること",()=>{
    const schedules = [{
        date: "2025-01-01",
        startTime: "00:00",
        endTime: "23:59",
        content: "元旦",
        id:1,
    }];
    const newSchedule = {
        date: "2024-12-31",
        startTime: "00:00",
        endTime: "23:59",
        content: "大晦日",
    };
    const result = registSchedule(schedules,newSchedule);
    expect(result).toHaveLength(2);
    expect(result).toEqual([{
        date: "2024-12-31",
        startTime: "00:00",
        endTime: "23:59",
        content: "大晦日",
        id:2,
    },{
        date: "2025-01-01",
        startTime: "00:00",
        endTime: "23:59",
        content: "元旦",
        id:1,
    }]);
    expect(result[0].id).toBe(2);
  });
  test("schedulesに1つ値が入ってる時に、同一日付で過去の時間のscheduleを登録されると、並び替えが起こること",()=>{
    const schedules = [{
        date: "2025-01-01",
        startTime: "00:00",
        endTime: "23:59",
        content: "元旦",
        id:1,
    }];
    const newSchedule = {
        date: "2025-01-01",
        startTime: "10:00",
        endTime: "10:59",
        content: "元旦10時",
    };
    const result = registSchedule(schedules,newSchedule);
    expect(result).toHaveLength(2);/* 
    expect(result).toEqual([{
        date: "2025-01-01",
        startTime: "10:00",
        endTime: "10:59",
        content: "元旦10時",
        id:2,
    },{
        date: "2025-01-01",
        startTime: "00:00",
        endTime: "23:59",
        content: "元旦",
        id:1,
    }]);
    expect(result[0].id).toBe(2); */
  });
  /* test("schedulesに1つ値が入ってる時に、同一日付で同一startTimeで過去の分数のscheduleを登録されると、並び替えが起こること",()=>{
    const schedules = [{
        date: "2025-01-01",
        startTime: "12:00",
        endTime: "12:59",
        content: "元旦12時",
        id:1,
    }];
    const newSchedule = {
        date: "2025-01-01",
        startTime: "10:00",
        endTime: "10:59",
        content: "元旦10時",
    };
    const result = registSchedule(schedules,newSchedule);
    expect(result).toHaveLength(2);
    expect(result).toEqual([{
        date: "2025-01-01",
        startTime: "10:00",
        endTime: "10:59",
        content: "元旦10時",
        id:2,
    },{
      date: "2025-01-01",
      startTime: "12:00",
      endTime: "12:59",
      content: "元旦12時",
      id:1,
    }]);
    expect(result[0].id).toBe(2);
  }); */
  
  test("scheduること",()=>{
    const schedules = [{
        date: "2025-01-01",
        startTime: "00:00",
        endTime: "23:59",
        content: "元旦",
        id:1,
    }];
    const newSchedule = {
        date: "2024-12-31",
        startTime: "00:00",
        endTime: "23:59",
        content: "大晦日",
    };
    const result = registSchedule(schedules,newSchedule);
    expect(result).toHaveLength(2);
    expect(result[1].id).toBe(1);
    const newSchedule2 = {
        date: "2024-12-31",
        startTime: "00:00",
        endTime: "23:59",
        content: "大晦日",
    };
    const result2 = registSchedule(result,newSchedule2);
    expect(result2).toHaveLength(3);
    expect(result2[2].id).toBe(1);
  });
});

describe("updatedSchedule",()=>{
    test("schedulesが1つの時に、編集された結果に変わること",()=>{
        const schedules = [{
            date: "2025-01-01",
            startTime: "00:00",
            endTime: "23:59",
            content: "元旦",
            id:1,
        }];
        const editSchedule = {
            date: "2025-01-02",
            startTime: "00:00",
            endTime: "23:59",
            content: "2日",
            id:1,
        };
        const result = updatedSchedule(schedules,editSchedule);
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(editSchedule);
    })
    test("一致するのがない",()=>{
        expect(()=> {
        updatedSchedule(mockSchedules,{id:999});}).toThrow("えらー");
    })
});

describe("deleteSchedule",()=>{
    test("指定のschedulesが消えること",()=>{
        const deleteScheduleId = 1;
        const result = deleteSchedule(mockSchedules,deleteScheduleId);
        expect(result).toHaveLength(mockSchedules.length-1);
        expect(result.find((v)=>v.id===deleteScheduleId)).toBeUndefined;
    })
    test("一致するのがない",()=>{
        expect(()=> {
        updatedSchedule(mockSchedules,{id:999});}).toThrow("えらー");
    })
});