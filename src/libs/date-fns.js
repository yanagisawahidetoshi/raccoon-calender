import {
  startOfMonth,
  lastDayOfMonth,
  eachDayOfInterval,
  addMonths as dateFnsAddMonths,
  format as dateFnsFormat,
  parse as dateFnsParse,
} from "date-fns";
import ja from "date-fns/locale/ja";

export const getStartOfMonth = (now) => {
  return startOfMonth(now);
};
export const getLastDayOfMonth = (now) => {
  return lastDayOfMonth(now);
};
export const getEachDayOfInterval = ({ start, end }) => {
  return eachDayOfInterval({ start, end });
};
export const addMonths = (date, number) => {
  return dateFnsAddMonths(date, number);
};
export const format = (date, dateFormat) => {
  return dateFnsFormat(date, dateFormat, { locale: ja });
};
export const parse = (dateString, dateFormat) => {
  return dateFnsParse(dateString, dateFormat, new Date());
};
