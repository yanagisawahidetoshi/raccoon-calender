import {
  startOfMonth,
  lastDayOfMonth,
  eachDayOfInterval,
  format as dateFnsFormat,
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
export const format = (date, dateFormat) => {
  return dateFnsFormat(date, dateFormat, { locale: ja });
};
