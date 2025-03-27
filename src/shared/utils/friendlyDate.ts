import moment from "moment";

export function friendlyDate(date: string | Date) {
  const parsedDate = moment(date);
  const now = moment();
  const diffDays = now.diff(parsedDate, "days");

  let displayDate;

  if (parsedDate.isSame(now, "day")) {
    displayDate = `Hoje às ${parsedDate.format("HH:mm")}`;
  } else if (parsedDate.isSame(now.subtract(1, "day"), "day")) {
    displayDate = `Ontem às ${parsedDate.format("HH:mm")}`;
  } else if (diffDays < 7) {
    displayDate = `Há ${diffDays} dias às ${parsedDate.format("HH:mm")}`;
  } else if (diffDays === 7) {
    displayDate = `Há uma semana às ${parsedDate.format("HH:mm")}`;
  } else {
    displayDate = parsedDate.format("DD/MM/YYYY [às] HH:mm");
  }

  return displayDate;
}
