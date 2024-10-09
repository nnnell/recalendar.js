import { Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import React from 'react';

import PdfConfig from '~/pdf/config';

class Header extends React.PureComponent {
	constructor( props ) {
		super( props );

		const stylesObject = {
			header: {
				flexGrow: 0,
				flexDirection: 'row',
			},
			meta: {
				flexGrow: 1,
				flexDirection: 'column',
				borderRight: `${this.props.config.borderWidth} solid black`,
			},
			dateMain: {
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				marginLeft: 'auto',
				// border: '1 dotted black',
			},
			dateInfo: {
				flex: 1,
				flexDirection: 'row',
				// paddingRight: 5,
				padding: '0 5 5 5',
				// border: '1 dotted grey',
			},
			subtitle: {
				// marginLeft: 'auto',
				// textTransform: 'uppercase',
				textAlign: 'right',
				// margin: '0 5',
				fontSize: props.subtitleSize,
				flex: 1,
			},
			title: {
				flex: '0 1 auto',
				textTransform: 'uppercase',
				letterSpacing: '0.3',
				textDecoration: 'none',
				justifyContent: 'center',
				// textAlign: 'right',
				color: 'black',
				padding: '10 0 5 5',
				fontSize: props.titleSize,
				// maxWidth: 165,
			},
			arrow: {
				flex: '0 0 auto',
				color: '#AAA',
				textDecoration: 'none',
				justifyContent: 'center',
				padding: '10 5',
				fontSize: props.titleSize,
			},
			dayNumber: {
				flex: '0 1 auto',
				fontSize: props.titleSize * 2.5,
				fontWeight: 'bold',
				// marginBottom: -5,
			},
			specialItems: {
				flexDirection: 'column',
				width: 130,
			},
			specialItem: {
				fontSize: 8,
				marginLeft: 5,
				fontStyle: 'italic',
			},
		};

		if ( this.props.isLeftHanded ) {
			stylesObject.header.flexDirection = 'row-reverse';

			stylesObject.meta.borderLeft = stylesObject.meta.borderRight;
			stylesObject.meta.borderRight = 'none';

			delete stylesObject.dateMain.marginLeft;
			delete stylesObject.subtitle.marginLeft;

			stylesObject.dateInfo.flexDirection = 'row-reverse';
			stylesObject.subtitle.textAlign = 'left';
		}

		this.styles = StyleSheet.create( stylesObject );
	}

	renderSpecialItems() {
		if ( ! this.props.specialItems ) {
			return null;
		}

		return (
			<View style={ this.styles.specialItems }>
				{this.props.specialItems.map( ( { value }, index ) => (
					<Text key={ index } style={ this.styles.specialItem }>
						• {value}
					</Text>
				) )}
			</View>
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
						<Text style={ this.styles.subtitle }>{subtitle}</Text>
					</View>
				</View>
				{calendar}
			</View>
		);
	}
}

Header.defaultProps = {
	titleSize: 13,
	subtitleSize: 14,
};

Header.propTypes = {
	config: PropTypes.instanceOf( PdfConfig ).isRequired,
	id: PropTypes.string,
	children: PropTypes.node,
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
