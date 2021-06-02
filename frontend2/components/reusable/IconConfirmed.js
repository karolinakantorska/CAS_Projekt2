import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@rmwc/icon';
const IconConfirmed = ({ confirmed, size }) => {
  return (
    <>
      {confirmed ? (
        <Icon icon={{ icon: 'done', size }} />
      ) : (
        <Icon icon={{ icon: 'minimize', size }} />
      )}
    </>
  );
};
IconConfirmed.propTypes = {
  confirmed: PropTypes.bool,
  size: PropTypes.string,
};
export default IconConfirmed;
