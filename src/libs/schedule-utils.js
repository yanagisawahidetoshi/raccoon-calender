import { format } from "../libs/date-fns";

export const registSchedule = (schedules ,newSchedule) => {
	// const id = schedules?.at(-1)?.id ?? 0;
	const id = schedules.length > 0 ? Math.max(...schedules.map(s => s.id)) : 0;
	schedules.push({ ...newSchedule, id: id + 1 });

	schedules.sort(
		(a,b) =>
			a.date.localeCompare(b.date) || 
			a.startTime.localeCompare(b.startTime)||
			a.endTime.localeCompare(b.endTime)
	);
	return schedules;
}

export const getSchedule = (schedules, date) => {
  const formatDate = format(date, "yyyy-MM-dd");
  return schedules.filter((item) => item.date === formatDate);
};

export const updatedSchedule = (schedules,scheduleData) => {
	
	if(schedules.find((i) => scheduleData.id === i.id) === undefined) {
		throw new Error("スケジュールが存在しません")
	}
	return schedules = schedules.map((schedule) => {
		if (schedule.id === scheduleData.id) {
			return { ...scheduleData };
		} else {
			return schedule;
		}
	});
};

export const deleteSchedule = (schedules,scheduleId) => {
	
	if(schedules.find((i) => scheduleId === i.id) === undefined) {
		throw new Error("スケジュールが存在しません")
	}
	return schedules = schedules.filter(
		(schedule) => schedule.id !== scheduleId
	);
};

