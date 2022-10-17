export const formatDate = (inputDate: string) => {
  let dayDiff;
  const date = new Date(inputDate);
  const time = date.toLocaleTimeString("ru", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
  const currentDate = new Date();
  const diff = Math.round((currentDate.valueOf() - date.valueOf()) / (24 * 60 * 60 * 1000));

  if (diff === 0) dayDiff = "Сегодня, ";
  else if (diff === 1) dayDiff = "Вчера, ";
  else if (diff === 2) dayDiff = "2 дня назад, ";
  else if (diff === 3) dayDiff = "3 дня назад, ";
  else if (diff === 4) dayDiff = "4 дня назад, ";
  else dayDiff = `${diff} дней назад `;

  return `${dayDiff}${time}`;
};
