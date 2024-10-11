import dayjs from 'dayjs/esm';
import { ITINERARY_NEW_PAGE } from '~/lib/itinerary-utils';

export function splitItemsByPages( items ) {
	const pages = [ [] ];
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

export function showPrevArrow(date, dateType, config) {
	// Date type can be 'day', 'week', or 'month'
	const { year, month } = config
	let earliestDate = dayjs({
		year, month, day: 1,
		hours: 0, minutes: 0, seconds: 0,
	})

	if (dateType === 'day') {
		let earliestDay = date.startOf('week')
		console.log('earliest day:', earliestDay.format('MMM D'))
	}

	// let currentDay = date.startOf('month').startOf('week')
	// let currentWeek = date.startOf('month').startOf('week')
	// let currentMonth = date.startOf('month').startOf('week')

	// return extraFirstMonth !== prevMonth
	// 	&& extraFirstMonth !== currentMonth
	// 	&& this.props.showArrows
}

export function showNextArrow(date, dateType, config) {
	// Date type can be 'day', 'week', or 'month'
	const { year, month, monthCount } = this.props.config
	let currentDate = dayjs({
		year, month, day: 1,
		hours: 0, minutes: 0, seconds: 0,
	})

	return extraLastMonth !== nextMonth
		&& extraLastMonth !== currentMonth
		&& this.props.showArrows
}
