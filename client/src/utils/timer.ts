export function formatMilliseconds(ms?: number): string {
  if (!ms) {
    return '00:00:00';
  }
  const hours = Math.floor(ms / 3600000); // 1 hour = 3600000 ms
  const minutes = Math.floor((ms % 3600000) / 60000); // 1 minute = 60000 ms
  const seconds = Math.floor((ms % 60000) / 1000); // 1 second = 1000 ms

  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedHours = String(hours).padStart(2, '0');
  const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  return formattedTime;
}
