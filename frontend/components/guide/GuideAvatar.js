import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Avatar } from '@rmwc/avatar';

const GuideAvatar = (props) => {
  console.log('props');
  console.log(props);
  const { guidePhoto } = props.props;
  return <Avatar src={guidePhoto} size="xlarge" />;
};
GuideAvatar.PropTypes = {
  //guideId: PropTypes.string,
};
/*
const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  
`*/

export default GuideAvatar;
