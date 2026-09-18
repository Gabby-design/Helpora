import { WeeklyHours, DayHours } from '../types';

export const DAYS_OF_WEEK: (keyof WeeklyHours)[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
];

export interface BusinessStatus {
  isOpen: boolean;
  statusText: string;
  todayHoursText: string;
  currentDayName: string;
}

function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

function formatTime12h(timeStr: string): string {
  if (!timeStr) return '';
  const [hoursStr, minutesStr] = timeStr.split(':');
  let h = parseInt(hoursStr, 10);
  const m = minutesStr || '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ampm}`;
}

export function getBusinessStatus(hours: WeeklyHours, customDate?: Date): BusinessStatus {
  const now = customDate || new Date();
  const dayIndex = now.getDay(); // 0 = Sunday, 1 = Monday, ...
  const currentDayKey = DAYS_OF_WEEK[dayIndex];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const todayHours: DayHours | undefined = hours ? hours[currentDayKey] : undefined;

  const dayCapitalized = currentDayKey.charAt(0).toUpperCase() + currentDayKey.slice(1);

  if (!todayHours || todayHours.closed || !todayHours.open || !todayHours.close) {
    // Look for next open day
    let nextOpenMsg = 'Closed today';
    for (let offset = 1; offset <= 7; offset++) {
      const nextDayIndex = (dayIndex + offset) % 7;
      const nextDayKey = DAYS_OF_WEEK[nextDayIndex];
      const nextHours = hours ? hours[nextDayKey] : undefined;
      if (nextHours && !nextHours.closed && nextHours.open) {
        const nextDayName = offset === 1 ? 'tomorrow' : nextDayKey.charAt(0).toUpperCase() + nextDayKey.slice(1);
        nextOpenMsg = `Closed • Opens ${nextDayName} at ${formatTime12h(nextHours.open)}`;
        break;
      }
    }

    return {
      isOpen: false,
      statusText: nextOpenMsg,
      todayHoursText: 'Closed',
      currentDayName: dayCapitalized
    };
  }

  const openMins = parseTimeToMinutes(todayHours.open);
  const closeMins = parseTimeToMinutes(todayHours.close);

  const formattedRange = `${formatTime12h(todayHours.open)} - ${formatTime12h(todayHours.close)}`;

  if (currentMinutes >= openMins && currentMinutes < closeMins) {
    return {
      isOpen: true,
      statusText: `Open now until ${formatTime12h(todayHours.close)}`,
      todayHoursText: formattedRange,
      currentDayName: dayCapitalized
    };
  } else if (currentMinutes < openMins) {
    return {
      isOpen: false,
      statusText: `Closed • Opens today at ${formatTime12h(todayHours.open)}`,
      todayHoursText: formattedRange,
      currentDayName: dayCapitalized
    };
  } else {
    // Closed for today, find when opens next
    const nextDayIndex = (dayIndex + 1) % 7;
    const nextDayKey = DAYS_OF_WEEK[nextDayIndex];
    const nextHours = hours ? hours[nextDayKey] : undefined;
    const nextMsg =
      nextHours && !nextHours.closed && nextHours.open
        ? `Closed • Opens tomorrow at ${formatTime12h(nextHours.open)}`
        : 'Closed for the day';

    return {
      isOpen: false,
      statusText: nextMsg,
      todayHoursText: formattedRange,
      currentDayName: dayCapitalized
    };
  }
}
