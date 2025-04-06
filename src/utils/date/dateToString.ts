export const dateToString = (start: Date, finish: Date) => {
  const shiftHours = 7;

  const shiftDate = (date: Date) => {
    const shifted = new Date(date);
    shifted.setHours(shifted.getHours() - shiftHours);
    return shifted;
  };

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const shiftedStart = shiftDate(new Date(start));
  const shiftedFinish = shiftDate(new Date(finish));

  const startDateTime = shiftedStart.toLocaleString('ru-RU', options);
  const finishTime = shiftedFinish.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const [startDate, startTime] = startDateTime.split(', ');
  return `${startDate} ${startTime} - ${finishTime}`;
};