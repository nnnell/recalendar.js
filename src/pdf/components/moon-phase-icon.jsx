import { Svg, Path, Circle, StyleSheet } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import React from 'react';
import {
  FULL_MOON_TYPE,
  NEW_MOON_TYPE,
  FIRST_QUARTER_TYPE,
  LAST_QUARTER_TYPE,
} from '~/lib/special-dates-utils';

class MoonPhaseIcon extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const phases = {
      [NEW_MOON_TYPE]: <>
        <Circle cx="8" cy="8" r="7.5" fill="black" stroke="black" />
      </>,
      [FIRST_QUARTER_TYPE]: <>
        <Circle cx="8" cy="8" r="7.5" fill="white" stroke="black" /><Path d="M8 0.5v15A7.5 7.5 0 0 1 8 0.5Z" fill="black" stroke="0" stroke-width="0.5" />
      </>,
      [FULL_MOON_TYPE]: <>
        <Circle cx="8" cy="8" r="7.5" fill="white" stroke="black" />
      </>,
      [LAST_QUARTER_TYPE]: <>
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
