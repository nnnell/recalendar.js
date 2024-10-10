import { Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import React from 'react';

import PdfConfig from '~/pdf/config';
import SpecialItems from '~/pdf/components/special-items';

class Header extends React.PureComponent {
	constructor( props ) {
		super( props );

		const stylesObject = {
			header: {
				flexGrow: 0,
				flexDirection: 'row',
			},
			meta: {
				flex: '1 0 50%',
				flexDirection: 'column',
				borderRight: `${this.props.config.borderWidth} solid black`,
			},
			dateMain: {
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'flex-start',
				marginLeft: 'auto',
				// padding: props.isOverview ? '10 0' : '0',
				padding: '8 0 0',
			},
			dateInfo: {
				flexDirection: 'column',
				padding: '0 5 5',
			},
			subtitleWrapper: {
				flexDirection: 'column',
				padding: '5 5 0',
			},
			subtitle: {
				textTransform: 'uppercase',
				flexWrap: 'wrap',
				fontSize: props.subtitleSize,
				flex: 1,
			},
			title: {
				flex: '0 1 auto',
				textTransform: 'uppercase',
				letterSpacing: '0.3',
				textDecoration: 'none',
				justifyContent: 'center',
				color: 'black',
				padding: '10 0 3 5',
				fontSize: props.titleSize,
			},
			arrow: {
				flex: '0 0 auto',
				color: '#AAA',
				textDecoration: 'none',
				justifyContent: 'center',
				padding: '10 5',
				fontSize: props.titleSize * 1.2,
				marginBottom: 2,
			},
			dayNumber: {
				flex: '0 1 auto',
				fontSize: props.titleSize * 2.6,
				fontWeight: 'bold',
				marginTop: 2,
				// marginBottom: -4,
			},
		};

		if ( this.props.isLeftHanded ) {
			stylesObject.header.flexDirection = 'row-reverse';

			stylesObject.meta.borderLeft = stylesObject.meta.borderRight;
			stylesObject.meta.borderRight = 'none';

			delete stylesObject.dateMain.marginLeft;
			delete stylesObject.subtitle.marginLeft;
		}

		this.styles = StyleSheet.create( stylesObject );
	}

	renderSpecialItems() {
		if ( !this.props.specialItems ) {
			return null;
		}

		return (
			<SpecialItems
				items={ this.props.specialItems }
				boldHolidays={ true }
			/>
		);
	}

	render() {
		const {
			calendar,
			id,
			nextLink,
			number,
			previousLink,
			subtitle,
			title,
			titleLink,
		} = this.props;

		return (
			<View id={ id } style={ this.styles.header }>
				<View style={ this.styles.meta }>
					<View style={ this.styles.subtitleWrapper }>
						<Text style={ this.styles.subtitle }>{subtitle}</Text>
					</View>
					<View style={ this.styles.dateMain }>
						<Link src={ titleLink } style={ this.styles.title }>
							{title}
						</Link>
						<Link src={ previousLink } style={ this.styles.arrow }>
							«
						</Link>
						<Text style={ this.styles.dayNumber }>{number}</Text>
						<Link src={ nextLink } style={ this.styles.arrow }>
							»
						</Link>
					</View>
					<View style={ this.styles.dateInfo }>
						{this.renderSpecialItems()}
					</View>
				</View>
				{calendar}
			</View>
		);
	}
}

Header.defaultProps = {
	titleSize: 13,
	subtitleSize: 13,
};

Header.propTypes = {
	config: PropTypes.instanceOf( PdfConfig ).isRequired,
	id: PropTypes.string,
	children: PropTypes.node,
	isOverview: PropTypes.bool,
	calendar: PropTypes.node.isRequired,
	isLeftHanded: PropTypes.bool.isRequired,
	number: PropTypes.string.isRequired,
	specialItems: PropTypes.array,
	subtitle: PropTypes.string.isRequired,
	subtitleSize: PropTypes.number,
	title: PropTypes.string.isRequired,
	titleLink: PropTypes.string,
	titleSize: PropTypes.number,
	previousLink: PropTypes.string.isRequired,
	nextLink: PropTypes.string.isRequired,
};

export default Header;
