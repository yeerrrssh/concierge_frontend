export const dateToString = (start: Date, finish: Date) => {
  const isoStartDate = new Date(start);
  const isoFinishDate = new Date(finish);
  const startDate = isoStartDate.toLocaleDateString('ru-RU');
  const startTime = isoStartDate.toISOString().split('T')[1].split('.')[0];
  const finishTime = isoFinishDate.toISOString().split('T')[1].split('.')[0];
  return `${startDate} ${startTime} - ${finishTime}`;
};
