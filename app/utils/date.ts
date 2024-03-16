export const dateIsYearAgo = (date: Date) => {
  const oneYearAgo = new Date().setFullYear(new Date().getFullYear() - 1);
  return date.getTime() <= oneYearAgo;
}

export const dateIsYearAway = (date: Date) => {
  const oneYearAway = new Date().setFullYear(new Date().getFullYear() + 1);
  return date.getDate() >= oneYearAway;
}