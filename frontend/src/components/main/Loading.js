import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LinearProgress } from '@rmwc/linear-progress';

const Loading = (props) => {
  //return <StyledP className="error_div">Loading...</StyledP>;
  return <LinearProgress />;
};

const StyledP = styled.p`
  height: 15px;
  margin-top: 0px;
`;
/*
Loading.propTypes = {
  error: PropTypes.string,
};
*/
export default Loading;
