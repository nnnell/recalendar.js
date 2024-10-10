import { Svg, Path, Circle, StyleSheet } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import React from 'react';

class MoonPhaseIcon extends React.PureComponent {
	constructor(props) {
		super(props)
	}

	render() {
		const phases = {
			'new': <>
				<Circle cx="8" cy="8" r="7.5" fill="black" stroke="black" />
			</>,
			'firstQuarter': <>
				<Circle cx="8" cy="8" r="7.5" fill="white" stroke="black" /><Path d="M8 0.5v15A7.5 7.5 0 0 1 8 0.5Z" fill="black" stroke="0" stroke-width="0.5" />
			</>,
			'full': <>
				<Circle cx="8" cy="8" r="7.5" fill="white" stroke="black" />
			</>,
			'lastQuarter': <>
				<Circle cx="8" cy="8" r="7.5" fill="white" stroke="black" /><Path d="M8 0.5v15A7.5 7.5 0 0 0 8 0.5Z" fill="black" stroke="0" stroke-width="0.5" />
			</>,
		}

		return (
			<Svg viewBox="0 0 16 16" style={{ width: 8, height: 8 }}>
				{phases[this.props.phase]}
			</Svg>
		)
	}
}

MoonPhaseIcon.propTypes = {
	phase: PropTypes.string.isRequired,
}

export default MoonPhaseIcon
