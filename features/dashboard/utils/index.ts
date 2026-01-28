export const calculateDDay = (deadlineStr: string): number => {
  const targetDate = new Date(deadlineStr);
  const today = new Date();

  // 날짜만 비교하기 위해 시/분/초를 0으로 맞춤
  const targetDateOnly = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
  );
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const diffTime = targetDateOnly.getTime() - todayOnly.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};
