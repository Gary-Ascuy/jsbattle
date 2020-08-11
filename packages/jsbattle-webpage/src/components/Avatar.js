import React from "react";
import PropTypes from 'prop-types';

export default class Avatar extends React.Component {

  render() {
    return <i className={`user-avatar fas ${this.props.img == 'admin' ? 'fa-code' : 'fa-code'}`}></i>;
  }
}

Avatar.defaultProps = {
  img: 'user',
};

Avatar.propTypes = {
  img: PropTypes.string,
};
