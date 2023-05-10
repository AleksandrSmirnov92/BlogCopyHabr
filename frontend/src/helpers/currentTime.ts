const currentTime = (date: Date) => {
  let formatterHour = new Intl.NumberFormat("ru", {
    style: "unit",
    unit: "hour",
    unitDisplay: "long",
  });
  let formatterMinutes = new Intl.NumberFormat("ru", {
    style: "unit",
    unit: "minute",
    unitDisplay: "long",
  });
  let currentTime = new Date();
  if (
    date.getDate() !== currentTime.getDate() ||
    date.getMonth() !== currentTime.getMonth() ||
    date.getFullYear() !== currentTime.getFullYear()
  ) {
    return `Опубликован ${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()} в  ${formatterHour.format(
      date.getHours()
    )} ${formatterMinutes.format(date.getMinutes())}`;
  }
  let currentHours = currentTime.getHours() - date.getHours();
  let currentMinutes = currentTime.getMinutes() - date.getMinutes();

  return `Опубликован ${formatterHour.format(
    currentHours
  )} ${formatterMinutes.format(currentMinutes)} назад`;
};
export default currentTime;
