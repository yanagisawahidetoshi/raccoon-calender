import {
  eachDayOfInterval as dateFnsEachDayOfInterval,
  startOfMonth as dateFnsStartOfMonth,
  endOfMonth as dateFnsEndOfMonth,
  format as dateFnsFormat,
  addMonths as dateFnsAddMonths,
  parse as dateFnsParse,
  isSameYear as dateFnsIsSameYear,
  isSameMonth as dateFnsIsSameMonth,
  isSameDay as dateFnsIsSameDay,
} from "date-fns";
import { ja } from "date-fns/locale";

export const eachDayOfInterval = (startDate, endDate) => {
  return dateFnsEachDayOfInterval(startDate, endDate);
};
export const startOfMonth = (date) => {
  return dateFnsStartOfMonth(date);
};
export const endOfMonth = (date) => {
  return dateFnsEndOfMonth(date);
};
export const format = (date, type) => {
  return dateFnsFormat(date, type, { locale: ja });
};
export const addMonths = (date, monthsToSubtract) => {
  return dateFnsAddMonths(date, monthsToSubtract);
};
export const parse = (date, format, newDate) => {
  return dateFnsParse(date, format, newDate);
};
export const isSameYear = (date1, date2) => {
  return dateFnsIsSameYear(date1, date2);
};
export const isSameMonth = (date1, date2) => {
  return dateFnsIsSameMonth(date1, date2);
};
export const isSameDay = (date1, date2) => {
  return dateFnsIsSameDay(date1, date2);
};
