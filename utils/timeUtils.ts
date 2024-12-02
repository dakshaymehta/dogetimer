export const calculateTimeLeft = () => {
  const targetDate = new Date('2026-07-04T00:00:00Z');
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days: days < 10 ? `0${days}` : days.toString(),
    hours: hours < 10 ? `0${hours}` : hours.toString(),
    minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
    seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
  };
};
