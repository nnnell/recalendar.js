import { Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import dayjs from 'dayjs/esm';
import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';

import { getWeekdays, getWeekendDays, getWeekNumber } from '~/lib/date';
import {
	findByDate,
	isHoliday,
	isEvent,
	DATE_FORMAT as SPECIAL_DATES_DATE_FORMAT,
} from '~/lib/special-dates-utils';
import PdfConfig from '~/pdf/config';
import {
	showPrevArrow as meow
} from '~/pdf/utils';
import MoonPhaseIcon from '~/pdf/components/moon-phase-icon';
import {
	dayPageLink,
	monthOverviewLink,
	weekOverviewLink,
	weekRetrospectiveLink,
	yearOverviewLink,
} from '~/pdf/lib/links';

export const HIGHLIGHT_WEEK = 'HIGHLIGHT_WEEK';
export const HIGHLIGHT_DAY = 'HIGHLIGHT_DAY';
export const HIGHLIGHT_NONE = 'HIGHLIGHT_NONE';

const HIGHLIGHT_BG = '#ccc'

class MiniCalendar extends React.Component {
	styles = StyleSheet.create( {
		body: {
			fontSize: 7,
			flex: '0 0 47%',
			padding: this.props.padding,
		},
		week: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'stretch',
		},
		weekHeader: {
			alignItems: 'flex-end',
		},
		currentWeek: {
			backgroundColor: HIGHLIGHT_BG,
		},
		currentWeekDay: {
			border: `${this.props.config.borderWidth} solid ${HIGHLIGHT_BG}`,
		},
		day: {
			flexGrow: 1,
			flexShrink: 1,
			width: 14,
			textDecoration: 'none',
			color: 'black',
			fontWeight: 'normal',
			textAlign: 'center',
			padding: '2.5 1',
			border: `${this.props.config.borderWidth} solid white`,
		},
		header: {
			flexDirection: 'row',
		},
		monthArrow: {
			flexBasis: 20,
			flexGrow: 0,
			textAlign: 'center',
			padding: '2 5',
			textDecoration: 'none',
			color: '#aaa',
			fontSize: 10,
			fontWeight: 'bold',
		},
		monthName: {
			padding: '2 5',
			textDecoration: 'none',
			color: '#888',
			fontSize: 10,
			fontWeight: 'bold',
		},
		pushLeft: {
			marginLeft: 'auto',
		},
		pushRight: {
			marginRight: 'auto',
		},
		currentDay: {
			backgroundColor: HIGHLIGHT_BG,
			border: `${this.props.config.borderWidth} solid ${HIGHLIGHT_BG}`,
		},
		weekendDay: {
			fontWeight: 1000,
		},
		eventDay: {
			border: `${this.props.config.borderWidth} solid #555`,
		},
		otherMonthDay: {
			color: '#999',
		},
		weekNumber: {
			color: '#999',
			border: 'none',
			borderRight: `${this.props.config.borderWidth} solid black`,
			fontSize: 7,
			justifyContent: 'center',
			width: 20,
		},
		weekRetrospective: {
			color: '#999',
			border: 'none',
			borderLeft: `${this.props.config.borderWidth} solid black`,
			paddingTop: 3,
		},
		weekdayName: {
			fontWeight: 'bold',
			color: 'black',
			border: 'none',
			borderBottom: `${this.props.config.borderWidth} solid black`,
			fontSize: 7,
		},
	} );

	getStartDate() {
		const { year, month } = this.props.config;
		let currentDate = dayjs( {
			year,
			month,
			day: 1,
			hours: 0,
			minutes: 0,
			seconds: 0,
		} );
		return currentDate
	}
	getEndDate() {
		const { year, month, monthCount } = this.props.config;
		let currentDate = dayjs( {
			year,
			month,
			day: 1,
			hours: 0,
			minutes: 0,
			seconds: 0,
		} );
		const endDate = currentDate.add( monthCount - 1, 'months' );
		return endDate
	}

	renderMonthName() {
		const { monthArrow, monthName, pushLeft, pushRight, header } = this.styles;
		const { config, date } = this.props;

		meow(date, 'day', config)

		const firstDisplayedMonth = `${this.getStartDate().year()}-${this.getStartDate().month()}`
		const lastDisplayedMonth = `${this.getEndDate().year()}-${this.getEndDate().month()}`

		const previousMonthDate = date.subtract(1, 'month')
		const currentMonthDate = date
		const nextMonthDate = date.add(1, 'month')

		const previousMonth = `${date.subtract(1, 'month').year()}-${date.subtract(1, 'month').month()}`
		const currentMonth = `${date.year()}-${date.month()}`
		const nextMonth = `${date.add(1, 'month').year()}-${date.add(1, 'month').month()}`

		const extraFirstMonth = `${this.getStartDate().subtract(1, 'month').year()}-${this.getStartDate().subtract(1, 'month').month()}`
		const extraLastMonth = `${this.getEndDate().add(1, 'month').year()}-${this.getEndDate().add(1, 'month').month()}`

		const showPrevArrow =
			extraFirstMonth !== previousMonth
			&& extraFirstMonth !== currentMonth
			&& this.props.showArrows

		const showNextArrow =
			extraLastMonth !== nextMonth
			&& extraLastMonth !== currentMonth
			&& this.props.showArrows

		return (
			<View style={ header }>
				{showPrevArrow ? (
					<Link
						src={ '#' + monthOverviewLink( previousMonthDate, config ) }
						style={ [ monthArrow, pushLeft ] }
					>
						{'←'}
					</Link>
				) : (
					<View style={ [ monthArrow, pushLeft ] }></View>
				)}
				<Link src={ '#' + monthOverviewLink( date, config ) } style={ monthName }>
					{date.format( 'MMM' )}
				</Link>
				<Link src={ '#' + yearOverviewLink() } style={ monthName }>
					{date.format( 'YYYY' )}
				</Link>
				{showNextArrow ? (
					<Link
						src={ '#' + monthOverviewLink( nextMonthDate, config ) }
						style={ [ monthArrow, pushRight ] }
					>
						{'→'}
					</Link>
				) : (
					<View style={ [ monthArrow, pushRight ] }></View>
				)}
			</View>
		);
	}

	renderWeekdayNames() {
		const { t } = this.props;
		const { day, week } = this.styles;
		const weekdays = getWeekdays( this.props.config.firstDayOfWeek );
		const daysOfTheWeek = weekdays.map( ( dayOfTheWeek, index ) => (
			<Text key={ index } style={ [ day, this.styles.weekdayName ] }>
				{dayOfTheWeek.min}
			</Text>
		) );

		return (
			<View style={ [ week, this.styles.weekHeader ] }>
				<Text
					style={ [
						day,
						this.styles.weekNumber,
						this.styles.weekdayName,
						{ paddingTop: 1 },
					] }
				>
					{t( 'calendar.header.week-number' )}
				</Text>
				{daysOfTheWeek}
				{this.props.config.isWeekRetrospectiveEnabled && (
					<Text
						style={ [
							day,
							this.styles.weekRetrospective,
							this.styles.weekdayName,
							{ paddingTop: 1 },
						] }
					>
						{t( 'calendar.header.retrospective' )}
					</Text>
				)}
			</View>
		);
	}

	renderMonth() {
		let currentWeek = this.props.date.startOf( 'month' ).startOf( 'week' );
		const endDate = this.props.date.endOf( 'month' );
		const weekRows = [];
		while ( currentWeek.isBefore( endDate ) ) {
			weekRows.push( this.renderWeek( currentWeek ) );
			currentWeek = currentWeek.add( 1, 'week' );
		}

		return <>{weekRows}</>;
	}

	renderWeek( week ) {
		const { config, t } = this.props;
		const { day } = this.styles;
		const days = [];
		const weekendDays = getWeekendDays( config.weekendDays, config.firstDayOfWeek );
		const weekNumber = getWeekNumber( week );

		for ( let i = 0; i < 7; i++ ) {
			const currentDay = week.add( i, 'days' );
			const dayStyles = [ day ];

			if (
				this.props.highlightMode === HIGHLIGHT_DAY &&
				currentDay.isSame( this.props.date, 'day' )
			) {
				dayStyles.push( this.styles.currentDay );
			}

			if (
				this.props.highlightMode === HIGHLIGHT_WEEK &&
				weekNumber === getWeekNumber( this.props.date )
			) {
				dayStyles.push( this.styles.currentWeekDay );
			}

			if ( weekendDays.includes( currentDay.day() ) ) {
				dayStyles.push( this.styles.weekendDay );
			}

			if ( currentDay.month() !== this.props.date.month() ) {
				dayStyles.push( this.styles.otherMonthDay );
			}

			const specialDateKey = currentDay.format( SPECIAL_DATES_DATE_FORMAT );
			const specialDatesToday = config.specialDates.filter(
				findByDate( specialDateKey ),
			);
			if ( specialDatesToday.length > 0 ) {
				if ( specialDatesToday.some( isEvent ) ) {
					dayStyles.push( this.styles.eventDay );
				}

				if ( specialDatesToday.some( isHoliday ) ) {
					dayStyles.push( this.styles.weekendDay );
				}
			}

			days.push(
				<Link
					key={ i }
					src={ '#' + dayPageLink( currentDay, config ) }
					style={ dayStyles }
				>
					{currentDay.date()}
				</Link>,
			);
		}

		const weekStyles = [ this.styles.week ];
		if (
			this.props.highlightMode === HIGHLIGHT_WEEK &&
			weekNumber === getWeekNumber( this.props.date )
		) {
			weekStyles.push( this.styles.currentWeek );
		}
		return (
			<View key={ weekNumber } style={ weekStyles }>
				<Link
					src={ '#' + weekOverviewLink( week, config ) }
					style={ [ day, this.styles.weekNumber ] }
				>
					{weekNumber}
				</Link>
				{days}
				{config.isWeekRetrospectiveEnabled && (
					<Link
						src={ '#' + weekRetrospectiveLink( week ) }
						style={ [ day, this.styles.weekRetrospective ] }
					>
						{t( 'calendar.body.retrospective' )}
					</Link>
				)}
			</View>
		);
	}

	render() {
		return (
			<View style={ this.styles.body } wrap={ false }>
				{this.renderMonthName()}
				{this.renderWeekdayNames()}
				{this.renderMonth()}
			</View>
		);
	}
}

MiniCalendar.defaultProps = {
	highlightMode: HIGHLIGHT_DAY,
	showArrows: true,
};

MiniCalendar.propTypes = {
	config: PropTypes.instanceOf( PdfConfig ).isRequired,
	date: PropTypes.instanceOf( dayjs ).isRequired,
	highlightMode: PropTypes.oneOf( [
		HIGHLIGHT_DAY,
		HIGHLIGHT_WEEK,
		HIGHLIGHT_NONE,
	] ),
	t: PropTypes.func.isRequired,
	padding: PropTypes.string,
	showArrows: PropTypes.bool,
};

export default withTranslation( 'pdf' )( MiniCalendar );
