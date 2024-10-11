import dayjs from 'dayjs/esm';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { ITINERARY_NEW_PAGE } from '~/lib/itinerary-utils';

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

export function splitItemsByPages( items ) {
	const pages = [[]];
	let currentPageNumber = 0;
	for ( let i = 0; i < items.length; i++ ) {
		const { type } = items[ i ];
		if ( type === ITINERARY_NEW_PAGE ) {
			currentPageNumber++;
			continue;
		}

		if ( ! pages[ currentPageNumber ] ) {
			pages[ currentPageNumber ] = [];
		}

		pages[ currentPageNumber ].push( items[ i ] );
	}

	return pages;
}

export function getNameOfWeek(date) {
	const beginningOfWeek = date.startOf('week')
	const endOfWeek = date.endOf('week')

	const beginningMonth = beginningOfWeek.month()
	const endMonth = endOfWeek.month()

	return beginningMonth === endMonth
		? `${beginningOfWeek.format('MMMM D')}–${endOfWeek.format('D')}`
		: `${beginningOfWeek.format('MMM D')} – ${endOfWeek.format('MMM D')}`
}

export function calendarPageExists(date, config) {
	// Pages exist for days before and after the calendar's defined
	// start and end dates, so long as those days are within the
	// calendar's first and last weeks.
	
	const { year, month, monthCount } = config
	const firstCalendarDate = dayjs.utc({
		year, month, day: 1,
		hours: 0, minutes: 0, seconds: 0,
	})
	const lastCalendarDate = firstCalendarDate.add(monthCount - 1, 'months').endOf('month')
	const firstDisplayedDate = firstCalendarDate.startOf('week')
	const lastDisplayedDate = lastCalendarDate.endOf('week')

	return date.isSameOrAfter(firstDisplayedDate)
		&& date.isSameOrBefore(lastDisplayedDate)
}
