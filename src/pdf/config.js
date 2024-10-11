import dayjs from 'dayjs/esm';
import i18n, { t } from 'i18next';

import { wrapWithId } from '~/lib/id-utils';
import { ITINERARY_ITEM, ITINERARY_LINES } from '~/lib/itinerary-utils';
import {
	HOLIDAY_DAY_TYPE,
	EVENT_DAY_TYPE,
	SEASONAL_EVENT_TYPE,
} from '~/lib/special-dates-utils';
import { LATO, SOURCE_SERIF_PRO, ALEGREYA_SANS } from '~/pdf/lib/fonts';

const CONFIG_FIELDS = [
	'fontFamily',
	'year',
	'month',
	'firstDayOfWeek',
	'monthCount',
	'showMoonPhases',
	'weekendDays',
	'isLeftHanded',
	'alwaysOnSidebar',
	'isMonthOverviewEnabled',
	'habits',
	'monthItinerary',
	'isWeekOverviewEnabled',
	'todos',
	'dayItineraries',
	'isWeekRetrospectiveEnabled',
	'weekRetrospectiveItinerary',
	'specialDates',
];

export const CONFIG_FILE = 'config.json';
export const CONFIG_VERSION_1 = 'v1';
export const CONFIG_VERSION_2 = 'v2';
export const CONFIG_VERSION_3 = 'v3';
export const CONFIG_CURRENT_VERSION = CONFIG_VERSION_3;

export function hydrateFromObject( object ) {
	return CONFIG_FIELDS.reduce(
		( fields, field ) => ( {
			...fields,
			[ field ]: object[ field ],
		} ),
		{},
	);
}

class PdfConfig {
	constructor( configOverrides = {} ) {
		dayjs.updateLocale( i18n.language, { weekStart: 0, });

		this.borderWidth = '0.5'

		this.year = dayjs().year();
		this.month = 0;
		this.firstDayOfWeek = dayjs.localeData().firstDayOfWeek();
		this.weekendDays = [ 0, 6 ];
		this.isLeftHanded = true;
		this.alwaysOnSidebar = true;
		this.monthCount = 12;
		this.showMoonPhases = true;
		this.fontFamily = ALEGREYA_SANS;
		this.isMonthOverviewEnabled = true;
		this.habits = [
			t( 'habits.example1', { ns: 'config' } ),
			t( 'habits.example2', { ns: 'config' } ),
			t( 'habits.example3', { ns: 'config' } ),
			t( 'habits.example4', { ns: 'config' } ),
		];
		this.monthItinerary = [
			{
				type: ITINERARY_ITEM,
				value: t( 'month.goal', { ns: 'config' } ),
			},
			{
				type: ITINERARY_LINES,
				value: 2,
			},
			{
				type: ITINERARY_ITEM,
				value: t( 'month.notes', { ns: 'config' } ),
			},
			{
				type: ITINERARY_LINES,
				value: 50,
			},
		];
		this.isWeekOverviewEnabled = true;
		this.todos = [];
		let dayOfWeek = this.firstDayOfWeek;
		this.dayItineraries = [ ...Array( 7 ).keys() ].map( () => {
			const itinerary = {
				dayOfWeek,
				items: [],
				isEnabled: true,
			};
			dayOfWeek = ++dayOfWeek % 7;
			return itinerary;
		} );

		this.isWeekRetrospectiveEnabled = true;
		this.weekRetrospectiveItinerary = [];
		// See https://github.com/diegomura/react-pdf/issues/2006
		this.pageSize = [ 336.96, 449.28 ]; // 4.68 x 6.24 inches at 300 ppi
		this.specialDates = [
			{
				date: '01-01',
				value: 'New Year’s Day',
				type: HOLIDAY_DAY_TYPE,
			},
			{
				date: '02-17',
				value: 'Louis Riel Day',
				type: HOLIDAY_DAY_TYPE,
			},
			{
				date: '04-18',
				value: 'Good Friday',
				type: HOLIDAY_DAY_TYPE,
			},
			{
				date: '04-20',
				value: 'Easter Sunday',
				type: HOLIDAY_DAY_TYPE,
			},
			{
				date: '04-21',
				value: 'Easter Monday',
				type: HOLIDAY_DAY_TYPE,
			},
			{
				date: '05-11',
				value: 'Mother’s Day',
				type: HOLIDAY_DAY_TYPE,
			},
			{
				date: '05-19',
				value: 'Victoria Day',
				type: HOLIDAY_DAY_TYPE,
			},
			{
				date: '06-15',
				value: 'Father’s Day',
				type: HOLIDAY_DAY_TYPE,
			},
			{
				date: '07-01',
				value: 'Canada Day',
				type: HOLIDAY_DAY_TYPE,
			},
			{
				date: '09-01',
				value: 'Labour Day',
				type: HOLIDAY_DAY_TYPE,
			},
			{
				date: '09-30',
				value: 'Orange Shirt Day',
				type: HOLIDAY_DAY_TYPE,
			},
			{
				date: '10-13',
				value: 'Thanksgiving',
				type: HOLIDAY_DAY_TYPE,
			},
			{
				date: '11-11',
				value: 'Remembrance Day',
				type: HOLIDAY_DAY_TYPE,
			},
			{
				date: '12-25',
				value: 'Christmas',
				type: HOLIDAY_DAY_TYPE,
			},

			{
				date: '03-20',
				value: 'Vernal equinox',
				type: SEASONAL_EVENT_TYPE,
			},
			{
				date: '06-21',
				value: 'Summer solstice',
				type: SEASONAL_EVENT_TYPE,
			},
			{
				date: '09-22',
				value: 'Autumnal equinox',
				type: SEASONAL_EVENT_TYPE,
			},
			{
				date: '12-21',
				value: 'Winter solstice',
				type: SEASONAL_EVENT_TYPE,
			},

			// {
			// 	date: '01-01',
			// 	value: t( 'special-dates.example1', { ns: 'config' } ),
			// 	type: HOLIDAY_DAY_TYPE,
			// },
		];
		this.moonPhases = {
			new: [
				'01-29',
				'02-27',
				'03-29',
				'04-27',
				'05-25',
				'07-24',
				'08-23',
				'09-21',
				'10-21',
				'11-20',
				'12-19',
			],
			firstQuarter: [
				'01-06',
				'02-05',
				'03-06',
				'04-04',
				'05-04',
				'06-02',
				'07-02',
				'08-01',
				'08-31',
				'09-29',
				'10-29',
				'11-28',
				'12-27',
			],
			full: [
				'01-13',
				'02-12',
				'03-14',
				'04-12',
				'05-12',
				'06-11',
				'07-10',
				'08-09',
				'09-07',
				'10-06',
				'11-05',
				'12-04',
			],
			lastQuarter: [
				'01-21',
				'02-20',
				'03-22',
				'04-20',
				'05-20',
				'06-18',
				'07-17',
				'08-16',
				'09-14',
				'10-13',
				'11-11',
				'12-11',
			],
		};

		if ( Object.keys( configOverrides ).length !== 0 ) {
			Object.assign( this, configOverrides );
		}

		this.ensureUniqueIds();

		// this.year = dayjs().year();
		// this.month = 0;
		// this.firstDayOfWeek = dayjs.localeData().firstDayOfWeek();
		// this.weekendDays = [ 0, 6 ];
		// this.isLeftHanded = false;
		// this.alwaysOnSidebar = false;
		// this.monthCount = 12;
		// this.fontFamily = LATO;
		// this.isMonthOverviewEnabled = true;
		// this.habits = [
		// 	t( 'habits.example1', { ns: 'config' } ),
		// 	t( 'habits.example2', { ns: 'config' } ),
		// 	t( 'habits.example3', { ns: 'config' } ),
		// 	t( 'habits.example4', { ns: 'config' } ),
		// ];
		// this.monthItinerary = [
		// 	{
		// 		type: ITINERARY_ITEM,
		// 		value: t( 'month.goal', { ns: 'config' } ),
		// 	},
		// 	{
		// 		type: ITINERARY_LINES,
		// 		value: 2,
		// 	},
		// 	{
		// 		type: ITINERARY_ITEM,
		// 		value: t( 'month.notes', { ns: 'config' } ),
		// 	},
		// 	{
		// 		type: ITINERARY_LINES,
		// 		value: 50,
		// 	},
		// ];
		// this.isWeekOverviewEnabled = true;
		// this.todos = [
		// 	t( 'todos.example1', { ns: 'config' } ),
		// 	t( 'todos.example2', { ns: 'config' } ),
		// ];
		// let dayOfWeek = this.firstDayOfWeek;
		// this.dayItineraries = [ ...Array( 7 ).keys() ].map( () => {
		// 	const itinerary = {
		// 		dayOfWeek,
		// 		items: [ { type: ITINERARY_LINES, value: 50 } ],
		// 		isEnabled: true,
		// 	};
		// 	dayOfWeek = ++dayOfWeek % 7;
		// 	return itinerary;
		// } );
		//
		// this.isWeekRetrospectiveEnabled = true;
		// this.weekRetrospectiveItinerary = [
		// 	{
		// 		type: ITINERARY_LINES,
		// 		value: 50,
		// 	},
		// ];
		// // See https://github.com/diegomura/react-pdf/issues/2006
		// // this.pageSize = [ 445, 592 ]; // [ '157mm', '209mm' ];
		// this.specialDates = [
		// 	{
		// 		date: '01-01',
		// 		value: t( 'special-dates.example1', { ns: 'config' } ),
		// 		type: HOLIDAY_DAY_TYPE,
		// 	},
		// 	{
		// 		date: '01-01',
		// 		value: t( 'special-dates.example2', { ns: 'config' } ),
		// 		type: HOLIDAY_DAY_TYPE,
		// 	},
		// 	{
		// 		date: '01-03',
		// 		value: t( 'special-dates.example3', { ns: 'config' } ),
		// 		type: HOLIDAY_DAY_TYPE,
		// 	},
		// 	{
		// 		date: '01-13',
		// 		value: t( 'special-dates.example4', { ns: 'config' } ),
		// 		type: EVENT_DAY_TYPE,
		// 	},
		// 	{
		// 		date: '01-13',
		// 		value: t( 'special-dates.example5', { ns: 'config' } ),
		// 		type: HOLIDAY_DAY_TYPE,
		// 	},
		// 	{
		// 		date: '01-14',
		// 		value: t( 'special-dates.example6', { ns: 'config' } ),
		// 		type: EVENT_DAY_TYPE,
		// 	},
		// ];
	}

	ensureUniqueIds() {
		const fieldsRequiringUniqueIds = [
			'habits',
			'monthItinerary',
			'specialDates',
			'todos',
			'weekRetrospectiveItinerary',
		];

		fieldsRequiringUniqueIds.forEach( ( field ) => {
			const thisField = this[ field ];
			this[ field ] = thisField.map( wrapWithId );
		} );

		this.dayItineraries = this.dayItineraries.map( ( dayItinerary ) => {
			dayItinerary.items = dayItinerary.items.map( wrapWithId );
			return dayItinerary;
		} );
	}
}

export default PdfConfig;
