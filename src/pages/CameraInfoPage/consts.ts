export enum tabs {
  todayTab = 'today',
  weekTab = 'week',
  monthTab = 'month',
}

// Границы текущего дня
const startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0);
const endOfDay = new Date();
endOfDay.setHours(23, 59, 59, 999);

export const LOCAL_TODAY_START = startOfDay.toISOString();
export const LOCAL_TODAY_END = endOfDay.toISOString();

// Границы недели
const now = new Date();

const startOfWeek = new Date(now);
startOfWeek.setDate(now.getDate() - 7);
startOfWeek.setHours(0, 0, 0, 0);

const endOfWeek = new Date(now);
endOfWeek.setHours(23, 59, 59, 999);

export const LOCAL_WEEK_START = startOfWeek.toISOString();
export const LOCAL_WEEK_END = endOfWeek.toISOString();

// Границы месяца
const startOfMonth = new Date(now);
startOfMonth.setDate(now.getDate() - 30);
startOfMonth.setHours(0, 0, 0, 0);

const endOfMonth = new Date(now);
endOfMonth.setHours(23, 59, 59, 999);

export const LOCAL_MONTH_START = startOfMonth.toISOString();
export const LOCAL_MONTH_END = endOfMonth.toISOString();
