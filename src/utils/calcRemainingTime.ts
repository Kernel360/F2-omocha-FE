function calcRemainingTime(endTimeInCountRemainingTime: Date) {
  const nowTime = new Date();

  if (endTimeInCountRemainingTime.getTime() < nowTime.getTime()) {
    return 0;
  }

  return endTimeInCountRemainingTime.getTime() - nowTime.getTime();
}

export default calcRemainingTime;
