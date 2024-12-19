import {
	startOfMonth as dateFnsStartOfMonth,
	endOfMonth as dateFnsEndOfMonth,
	eachDayOfInterval as dateFnsGetEachDayOfInterval,
	format as dateFnsFormat,
	getDay as dateFnsGetDay,
	addMonths as dateFnsAddMonths,
	eachWeekOfInterval as dateFnsEachWeekOfInterval,
	eachDayOfInterval as dateFnsEachDayOfInterval,
	addDays as dateFnsAddDays,
} from "date-fns";
// import * as dateFns from "date-fns";
/*-----*/

export const startOfMonth = (currentDate) => {
	return dateFnsStartOfMonth(currentDate);
}
export const endOfMonth = (currentDate) => {
	return dateFnsEndOfMonth(currentDate);
}
export const getDay = (currentDate) => {
	return dateFnsGetDay(currentDate);
}
export const dateInterval = (startDate, endDate) => {
	return dateFnsGetEachDayOfInterval({
		start: new Date(startDate),
		end: new Date(endDate),
	})
}
export const addMonths = (currentDate, monthToAdd) => {
	return dateFnsAddMonths(currentDate, monthToAdd);
}
export const addDays = (endDate, dateToAdd) => {
	return dateFnsAddDays(endDate, dateToAdd);
}
export const format = (currentDate, dateFormat) => {
	return dateFnsFormat(currentDate, dateFormat);
}
export const eachWeekOfInterval = (startDate, endDate) => {
	return dateFnsEachWeekOfInterval({
		start: startDate,
		end: endDate
	});
}
export const eachDayOfInterval = (startDate, endDate) => {
	return dateFnsEachDayOfInterval({
		start: startDate,
		end: endDate
	});
}

