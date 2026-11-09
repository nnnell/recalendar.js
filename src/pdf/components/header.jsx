import { Link, StyleSheet, Text, View } from '@react-pdf/renderer';
import {
  BORDER_WIDTH,
} from '~/pdf/config';
import PropTypes from 'prop-types';
import { HOLIDAY_DAY_TYPE } from '~/lib/special-dates-utils';
import React from 'react';

class Header extends React.PureComponent {
  constructor(props) {
    super(props);

    const stylesObject = {
      header: {
        flexGrow: 0,
        flexDirection: 'row',
      },
      meta: {
        flexGrow: 1,
        flexDirection: 'column',
        borderRight: `${BORDER_WIDTH} solid black`,
        paddingLeft: 10,
      },
      dateMain: {
        flexDirection: 'row',
        // alignItems: 'flex-end',
        // alignItems: 'flex-start',
        alignItems: 'baseline',
        // justifyContent: 'flex-end',
        // marginLeft: 'auto',

        // backgroundColor: 'lightgreen',
      },
      dateInfo: {
        flex: 1,
        // flexDirection: 'row',
        marginTop: -4,
        paddingRight: 5,
        width: '100%',
        // justifyContent: 'flex-end',
        // justifyContent: 'space-between',

        // backgroundColor: 'yellow',
      },
      subtitle: {
        // marginLeft: 'auto',
        textTransform: 'uppercase',
        textAlign: 'right',
        justifySelf: 'flex-end',
        // margin: '0 5',
        fontSize: props.subtitleSize,
        letterSpacing: '0.4',
        flexGrow: 0,
        flexShrink: 0,

        // backgroundColor: 'pink',
      },
      title: {
        textTransform: 'uppercase',
        textDecoration: 'none',
        justifyContent: 'center',
        textAlign: props.titleAlign,
        color: 'black',
        // paddingTop: 13,
        paddingLeft: 0.5,
        paddingRight: 5,
        paddingBottom: 5,
        fontSize: props.titleSize,
        maxWidth: 165,
        letterSpacing: '0.4',
        // lineHeight: 1,
        // alignSelf: 'center',
        // alignSelf: 'baseline',

        // backgroundColor: 'teal',
      },
      arrow: {
        color: '#AAA',
        textDecoration: 'none',
        justifyContent: 'center',
        paddingLeft: 6,
        paddingRight: 6,
        alignSelf: 'stretch',
        // padding: '10 5',
        // padding: '8 10 0',
        marginBottom: -8,
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 1,

        // backgroundColor: 'white',
      },
      hiddenArrow: {
        opacity: 0,
      },
      dayNumber: {
        fontSize: 50,
        // fontWeight: 'bold',
        fontWeight: 600,
        marginTop: -6,
        // marginBottom: -4,
        lineHeight: 1,

        // backgroundColor: 'pink',
      },
      specialItems: {
        // flexDirection: 'column',
        // flexGrow: 1,
        marginTop: 8,
        textAlign: 'left',
        marginRight: 'auto',

        // backgroundColor: 'yellow',
      },
      specialItem: {
        fontSize: 10,
        marginLeft: 5,
        // marginBottom: 2,
        textIndent: -4,
        fontStyle: 'italic',
        maxWidth: 200,

        // backgroundColor: 'lightgreen',
      },
    };

    if (this.props.isLeftHanded) {
      stylesObject.header.flexDirection = 'row-reverse';

      stylesObject.meta.borderLeft = stylesObject.meta.borderRight;
      stylesObject.meta.borderRight = 'none';

      delete stylesObject.dateMain.marginLeft;
      delete stylesObject.subtitle.marginLeft;

      stylesObject.dateInfo.flexDirection = 'row-reverse';
      stylesObject.subtitle.textAlign = 'left';
    }

    this.styles = StyleSheet.create(stylesObject);
  }

  renderSpecialItems() {
    if (!this.props.specialItems) {
      return null;
    }

    return (
      <View style={this.styles.specialItems}>
        {this.props.specialItems.map(({ id, value, type }) => (
          <Text key={id} style={[this.styles.specialItem, { fontWeight: type === HOLIDAY_DAY_TYPE ? 'bold' : 'normal' }]}>
            • {value}
          </Text>
        ))}
      </View>
    );
  }

  renderArrow(link, symbol) {
    if (!link) {
      return <Text style={[this.styles.arrow, this.styles.hiddenArrow]}>{symbol}</Text>;
    }

    return (
      <Link src={'#' + link} style={this.styles.arrow}>
        {symbol}
      </Link>
    );
  }

  render() {
    const { calendar, id, nextLink, number, previousLink, subtitle, title, titleLink } = this.props;

    return (
      <View id={id} style={this.styles.header}>
        <View style={this.styles.meta}>
          <View style={this.styles.dateMain}>
            <Link src={titleLink} style={this.styles.title}>
              {title}
            </Link>
            {this.renderArrow(previousLink, '‹')}
            <Text style={this.styles.dayNumber}>{number}</Text>
            {this.renderArrow(nextLink, '›')}
          </View>
          <View style={this.styles.dateInfo}>
            <Text style={this.styles.subtitle}>{subtitle}</Text>
            {this.renderSpecialItems()}
          </View>
        </View>
        {calendar}
      </View>
    );
  }
}

Header.defaultProps = {
  titleSize: 18,
  subtitleSize: 24,
  titleAlign: 'left',
};

Header.propTypes = {
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
  titleAlign: PropTypes.string,
  previousLink: PropTypes.string.isRequired,
  nextLink: PropTypes.string.isRequired,
};

export default Header;
