import dayjs from 'dayjs/esm';

export const HOLIDAY_DAY_TYPE = 'holiday';
export const EVENT_DAY_TYPE = 'event';

export const MOON_PHASE_TYPE = 'moon phase';
export const FULL_MOON_TYPE = 'full';
export const NEW_MOON_TYPE = 'new';
export const FIRST_QUARTER_TYPE = 'firstquarter';
export const LAST_QUARTER_TYPE = 'thirdquarter' || 'lastquarter';

export function isHoliday({ type }) {
  return type === HOLIDAY_DAY_TYPE;
}
export function isEvent({ type }) {
  return type === EVENT_DAY_TYPE;
}

export function findByDate(dateToSearchFor) {
  return ({ date }) => date === dateToSearchFor;
}

export const DATE_FORMAT = 'MM-DD';

export function getDedupeKey({ date, holidayName, value }) {
  const name = (holidayName ?? value ?? '').trim().toLowerCase();
  return `${date}|${name}`;
}

export function getSpannedYears({ year, month, monthCount }) {
  const firstDay = dayjs({ year, month, day: 1 }).startOf('week');
  const lastDay = dayjs({ year, month, day: 1 }).add(monthCount, 'months').subtract(1, 'day');
  const years = [];
  for (let current = firstDay.year(); current <= lastDay.year(); current++) {
    years.push(current);
  }
  return years;
}

export function formatYearRange(years) {
  if (years.length === 0) {
    return '';
  }

  return years.length === 1 ? String(years[0]) : `${years[0]}-${years[years.length - 1]}`;
}

export function isMoonPhase( { type } ) {
	return type === MOON_PHASE_TYPE;
}

const stripExp = /(moon|\W|[\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/gi

export function isFullMoon(type) {
  let formattedType = type.replace(stripExp, '');
  return formattedType.toLowerCase() === FULL_MOON_TYPE;
}
export function isNewMoon( type ) {
  let formattedType = type.replace(stripExp, '');
  return formattedType.toLowerCase() === NEW_MOON_TYPE;
}
export function isFirstQuarterMoon( type ) {
  let formattedType = type.replace(stripExp, '');
  return formattedType.toLowerCase() === FIRST_QUARTER_TYPE;
}
export function isLastQuarterMoon( type ) {
  let formattedType = type.replace(stripExp, '');
  return formattedType.toLowerCase() === LAST_QUARTER_TYPE;
}
export function getMoonPhase( str ) {
  let formattedStr = str.replace(stripExp, '');
  return formattedStr.toLowerCase()
}
