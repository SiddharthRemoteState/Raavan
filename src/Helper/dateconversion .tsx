export default function dateconversion(date: string) {
  const newDate = new Date(date);
  const dateString = newDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const timeString = newDate.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, 
  });

  return (
    <>
      {dateString} {timeString}
    </>
  );
}
