import { Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import dayjs from 'dayjs/esm';
import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';

import {
	findByDate,
	DATE_FORMAT as SPECIAL_DATES_DATE_FORMAT,
} from '~/lib/special-dates-utils';
import { getWeekNumber } from '~/lib/date';
import Header from '~/pdf/components/header';
import MiniCalendar, { HIGHLIGHT_WEEK } from '~/pdf/components/mini-calendar';
import SpecialItems from '~/pdf/components/special-items';
import MoonPhaseIcon from '~/pdf/components/moon-phase-icon';
import PdfConfig from '~/pdf/config';
import { weekOverviewLink, dayPageLink } from '~/pdf/lib/links';
import { content, pageStyle } from '~/pdf/styles';
import { getNameOfWeek } from '~/pdf/utils';

class WeekOverviewPage extends React.Component {
	styles = StyleSheet.create(
		Object.assign(
			{
				days: {
					flexDirection: 'row',
					flexWrap: 'wrap',
					flexGrow: 1,
				},
				day: {
					width: '33.45%',
					height: '33.5%',
					border: `${this.props.config.borderWidth} solid black`,
					flexDirection: 'column',
					marginTop: -0.5,
					marginLeft: -0.5,
					padding: '3 5 5',
					textDecoration: 'none',
					color: 'black',
				},
				dayInner: {
					flexDirection: 'column',
					flexGrow: 1,
					alignItems: 'start',
				},
				dayDate: {
					flexDirection: 'row',
					alignItems: 'baseline',
					marginBottom: 2,
				},
				dayOfWeek: {
					fontSize: 7,
					textTransform: 'uppercase',
					letterSpacing: '0.4',
				},
				shortDate: {
					fontSize: 10,
					textTransform: 'uppercase',
					marginLeft: 'auto',
				},
				todos: {
					width: '66.6%',
					height: '33.5%',
					flexDirection: 'column',
					padding: 5,
				},
				todo: {
					fontSize: 8,
				},
				moonPhase: {
					flexGrow: 0,
					marginTop: 'auto',
					marginLeft: 'auto',
				},
			},
			{ content, page: pageStyle( this.props.config ) },
		),
	);

	renderDays() {
		const { date } = this.props;
		let currentDate = date.startOf( 'week' );
		const endOfWeek = date.endOf( 'week' );
		const days = [];
		while ( currentDate.isBefore( endOfWeek ) ) {
			days.push( this.renderDay( currentDate ) );
			currentDate = currentDate.add( 1, 'day' );
		}

		days.push( this.renderTodos() );

		return days;
	}

	renderDay( day ) {
		const { config } = this.props;
		const specialDateKey = day.format( SPECIAL_DATES_DATE_FORMAT );
		const specialItems = config.specialDates.filter( findByDate( specialDateKey ) );
		const moonPhase = Object.keys(config.moonPhases).find(phase => config.moonPhases[phase].includes(specialDateKey))

		return (
			<Link
				key={ day.unix() }
				style={ this.styles.day }
				src={ '#' + dayPageLink( day, config ) }
			>
				<View style={ this.styles.dayInner }>
					<View style={ this.styles.dayDate }>
						<Text style={ this.styles.dayOfWeek }>{day.format( 'dddd' )}</Text>
						<Text style={ this.styles.shortDate }>{day.format( 'D' )}</Text>
					</View>
					<SpecialItems
						items={ specialItems }
						boldHolidays={ true }
					/>
					{config.showMoonPhases && moonPhase && (
						<View style={ this.styles.moonPhase }>
							<MoonPhaseIcon phase={ moonPhase } />
						</View>
					)}
				</View>
			</Link>
		);
	}

	renderTodos() {
		return (
			<View key={ 'todos' } style={ this.styles.todos }>
				{this.props.config.todos.map( ( { id, value } ) => (
					<Text key={ id } style={ this.styles.todo }>
						{value}
					</Text>
				) )}
			</View>
		);
	}

	render() {
		const { t, date, config } = this.props;
		return (
			<Page id={ weekOverviewLink( date, config ) } size={ config.pageSize }>
				<View style={ this.styles.page }>
					<Header
						config={ config }
						date={ date }
						dateType={ 'week' }
						isOverview={ true }
						isLeftHanded={ config.isLeftHanded }
						title={ t( 'page.week.title' ) }
						subtitle={ getNameOfWeek(date) }
						subtitleSize={ 16 }
						number={ getWeekNumber( date ).toString() }
						previousLink={
							'#' + weekOverviewLink( date.subtract( 1, 'week' ), config )
						}
						nextLink={ '#' + weekOverviewLink( date.add( 1, 'week' ), config ) }
						calendar={
							<MiniCalendar
								date={ date }
								highlightMode={ HIGHLIGHT_WEEK }
								config={ config }
							/>
						}
					/>
					<View style={ this.styles.days }>{this.renderDays()}</View>
				</View>
			</Page>
		);
	}
}

WeekOverviewPage.propTypes = {
	config: PropTypes.instanceOf( PdfConfig ).isRequired,
	date: PropTypes.instanceOf( dayjs ).isRequired,
	t: PropTypes.func.isRequired,
};

export default withTranslation( 'pdf' )( WeekOverviewPage );
