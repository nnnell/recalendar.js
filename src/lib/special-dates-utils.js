export const HOLIDAY_DAY_TYPE = 'holiday';
export const EVENT_DAY_TYPE = 'event';
export const SEASONAL_EVENT_TYPE = 'seasonal';

export function isHoliday( { type } ) {
	return type === HOLIDAY_DAY_TYPE;
}
export function isEvent( { type } ) {
	return type === EVENT_DAY_TYPE;
}
export function isSeasonalEvent( { type } ) {
	return type === SEASONAL_EVENT_TYPE;
}

export function findByDate( dateToSearchFor ) {
	return ( { date } ) => date === dateToSearchFor;
}

export const DATE_FORMAT = 'MM-DD';
