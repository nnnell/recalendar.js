import { Text, View, StyleSheet } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import React from 'react';

import { HOLIDAY_DAY_TYPE } from '~/lib/special-dates-utils';
import PdfConfig from '~/pdf/config';

class SpecialItems extends React.PureComponent {
	styles = StyleSheet.create({
		itemList: {
			flexDirection: 'column',
			fontSize: this.props.fontSize,
			fontStyle: 'italic',
			paddingRight: 2,
		},
		item: {
			flexDirection: 'row',
		},
		itemMarker: {
			paddingRight: 2,
		},
	})

	render() {
		return (
			<View style={ this.styles.itemList }>
				{this.props.items.map( ( { id, type, value }, index ) => (
					<View key={ index } style={ this.styles.item }>
						<Text style={ this.styles.itemMarker }>•</Text>
						<Text style={{ fontWeight: this.props.boldHolidays && type === HOLIDAY_DAY_TYPE ? 'bold' : 'normal' }}>{value}</Text>
					</View>
				) )}
			</View>
		)
	}
}

SpecialItems.defaultProps = {
	boldHolidays: false,
	fontSize: 8,
}

SpecialItems.propTypes = {
	items: PropTypes.array,
	boldHolidays: PropTypes.bool,
	fontSize: PropTypes.number,
}

export default SpecialItems
