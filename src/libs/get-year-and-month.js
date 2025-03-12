export const getYearAndMonth = (pathName, parse) => {
  let currentDate = null;
  const match = pathName.match(/\/(\d{4})\/(0?[1-9]|1[0-2])\/?$/);
  if (match === null) {
    currentDate = new Date();
    return currentDate;
  }
  currentDate = parse(`${match[1]}/${match[2]}/1`, "yyyy/MM/dd");
  return currentDate;
};
