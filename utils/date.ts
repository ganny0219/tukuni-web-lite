export function getToday() {
  const today = new Date();
  return {
    start: new Date(today.setHours(0, 0, 0, 0)),
    end: new Date(today.setHours(23, 59, 59, 999)),
  };
}

export function getYesterday() {
  const today = new Date();
  return {
    start: new Date(today.setHours(0, 0, 0, 0)),
    end: new Date(today.setHours(23, 59, 59, 999)),
  };
}

export function getLastWeek() {
  const today = new Date();
  const lastWeekStart = new Date(today);
  lastWeekStart.setDate(today.getDate() - 7);
  const lastWeekEnd = new Date(today);
  lastWeekEnd.setDate(today.getDate() - 1);

  return {
    start: new Date(lastWeekStart.setHours(0, 0, 0, 0)),
    end: new Date(lastWeekEnd.setHours(23, 59, 59, 999)),
  };
}

export function getThisWeek() {
  const today = new Date();
  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - today.getDay());
  const lastDayOfWeek = new Date(today);
  lastDayOfWeek.setDate(today.getDate() + (6 - today.getDay()));

  return {
    start: new Date(firstDayOfWeek.setHours(0, 0, 0, 0)),
    end: new Date(lastDayOfWeek.setHours(23, 59, 59, 999)),
  };
}

export function getLastMonth() {
  const today = new Date();
  const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

  return {
    start: new Date(lastMonthStart.setHours(0, 0, 0, 0)),
    end: new Date(lastMonthEnd.setHours(23, 59, 59, 999)),
  };
}

export function getThisMonth() {
  const today = new Date();
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return {
    start: new Date(thisMonthStart.setHours(0, 0, 0, 0)),
    end: new Date(thisMonthEnd.setHours(23, 59, 59, 999)),
  };
}
