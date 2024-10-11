import { Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import React from 'react';

import { ALEGREYA_SANS } from '~/pdf/lib/fonts';
import PdfConfig from '~/pdf/config';
import {
	showPrevArrow
} from '~/pdf/utils';
import SpecialItems from '~/pdf/components/special-items';
import MoonPhaseIcon from '~/pdf/components/moon-phase-icon';

class Header extends React.PureComponent {
	constructor( props ) {
		super( props );

		const stylesObject = {
			header: {
				flexGrow: 0,
				flexDirection: 'row',
			},
			meta: {
				position: 'relative',
				flex: '1 0 50%',
				flexDirection: 'column',
				padding: '5 5 5 8',
				borderRight: `${this.props.config.borderWidth} solid black`,
			},
			dateInfo: {
				flexDirection: 'column',
				marginTop: 4,
			},
			subtitleWrapper: {
				flex: '0 0 auto',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'flex-end',
				paddingRight: 5,
				textTransform: 'uppercase',
				letterSpacing: '0.4',
			},
			subtitle: {
				flex: '0 1 auto',
				fontSize: props.subtitleSize,
			},
			moonPhase: {
				flex: '0 0 auto',
				paddingLeft: 5,
				paddingRight: 9,
			},
			dateMain: {
				flexDirection: 'row',
				marginLeft: 'auto',
				marginBottom: 2,
				alignItems: 'flex-end',
				justifyContent: 'flex-end',
				textTransform: 'uppercase',
				letterSpacing: '0.4',
			},
			title: {
				marginTop: 1,
				marginRight: 3,
				maxWidth: props.titleMaxWidth,
				fontSize: props.titleSize,
				color: 'black',
				textDecoration: 'none',
				textAlign: 'right',
			},
			arrow: {
				flex: '0 0 auto',
				justifyContent: 'center',
				marginTop: -8,
				marginBottom: props.config.fontFamily === ALEGREYA_SANS ? (props.titleSize * 1.2) * -0.6 : (props.titleSize * 1.2) * -0.5,
				paddingTop: props.titleSize * 0.9,
				paddingBottom: props.titleSize * 1.1,
				paddingHorizontal: 5,
				fontSize: props.titleSize * 1.2,
				fontWeight: 'bold',
				lineHeight: 1,
				color: '#AAA',
				textDecoration: 'none',
			},
			dayNumber: {
				flex: '0 1 auto',
				marginTop: -8,
				marginBottom: (props.titleSize * 2.6) * -0.25,
				fontSize: props.titleSize * 2.6,
				fontWeight: 'bold',
			},
		};

		if ( this.props.isLeftHanded ) {
			stylesObject.header.flexDirection = 'row-reverse';
			stylesObject.subtitleWrapper.flexDirection = 'row-reverse';
			stylesObject.dateMain.justifyContent = 'flex-start';
			stylesObject.dateMain.marginLeft = 0;
			stylesObject.dateMain.marginRight = 'auto';

			stylesObject.moonPhase.right = 5;
			delete stylesObject.moonPhase.left;

			stylesObject.meta.borderLeft = stylesObject.meta.borderRight;
			stylesObject.meta.borderRight = 'none';
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
			moonPhase,
		} = this.props;

		return (
			<View id={ id } style={ this.styles.header }>
				<View style={ this.styles.meta }>
					<View style={ this.styles.dateMain }>
						<Link src={ titleLink } style={ this.styles.title }>
							{title}
						</Link>
						<Link src={ previousLink } style={ this.styles.arrow }>
							‹
						</Link>
						<Text style={ this.styles.dayNumber }>{number}</Text>
						<Link src={ nextLink } style={ this.styles.arrow }>
							›
						</Link>
					</View>
					<View style={ this.styles.subtitleWrapper }>
						<View style={ this.styles.moonPhase }>
							{moonPhase && (
								<MoonPhaseIcon phase={ moonPhase } />
							)}
						</View>
						<Text style={ this.styles.subtitle }>{subtitle}</Text>
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
	titleMaxWidth: '67%',
	subtitleSize: 16,
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
	titleMaxWidth: PropTypes.string,
	previousLink: PropTypes.string.isRequired,
	nextLink: PropTypes.string.isRequired,
	moonPhase: PropTypes.string,
};

export default Header;
