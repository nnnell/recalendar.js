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


export function getNameOfWeek(props) {
	const { date } = props;
	const beginningOfWeek = date.startOf( 'week' )
	const endOfWeek = date.endOf( 'week' )

	const beginningStr = beginningOfWeek.format('MMMM D')
	const endStr = endOfWeek.format('MMMM D')

	return `${beginningStr} – ${endStr}`;
}
