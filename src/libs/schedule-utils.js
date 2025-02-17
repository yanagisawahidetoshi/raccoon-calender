export const resgistSchedule = (schedules ,newSchedule) => {
	const id = schedules?.at(-1)?.id ?? 0;
	schedules.push({ ...newSchedule, id: id + 1 });

	return schedules;
}