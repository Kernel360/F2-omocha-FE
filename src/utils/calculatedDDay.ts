function calculatedDDay(endTime: string) {
  const dDay = Math.floor(
    (new Date(endTime).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  );
  return dDay;
}

export default calculatedDDay;
