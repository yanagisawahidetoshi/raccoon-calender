export const registSchedule = (schedules, newSchedule) => {
  const id = schedules?.at(-1)?.id ?? 0;
  schedules.push({ ...newSchedule, id: id + 1 });

  schedules.sort((a, b) => 
  a.date.localeCompare(b.date) || 
  a.startTime.localeCompare(b.startTime)||
  a.endTime.localeCompare(b.endTime));

  return schedules;
};

import { format } from "../libs/date-fns";
export const getSchedule = (schedules, date) => {
  const formatDate = format(date, "yyyy-MM-dd");
  return schedules.filter((item) => item.date === formatDate);
};


export const updatedSchedule = (schedules,editSchedule) => {
  if(schedules.find((i) => editSchedule.id === i.id) === undefined){
    throw new Error("えらー");
  }
  return schedules.map((schedule) => {
    if (schedule.id === editSchedule.id) {
      return { ...editSchedule };
    } else {
      return schedule;
    }
  });
};

export const deleteSchedule = (schedules, scheduleId) => {
  if(schedules.find((i) => scheduleId === i.id) === undefined){
    throw new Error("えらー");
  }
  return schedules.filter(
    (schedule) => schedule.id !== scheduleId
  );
};
