import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// RMWC
import { Card } from '@rmwc/card';
import { CardPrimaryAction } from '@rmwc/card';
//Components
import DeleteGuide from './DeleteGuide';
import ButtonMain from '../reusable/ButtonMain';
import ButtonLink from '../reusable/ButtonLink';
// Utils
import { routeToEditGuide, routeToSignin, routeToCalendar } from '../../lib/utilsRouts';
import { goToBookingPage, permission } from '../../lib/utils';

// Components for Styling
import { StyledGuideImage } from '../styles/StyledGuideImage';
import { StyledButtonSpan } from '../styles/StyledButtonSpan';
import {
  StyledTextBody2,
  StyledTextTitle5,
  StyledTextSubtitle1,
} from '../styles/StyledText';

const Guide = ({ currentUserPermission, guide }) => {
  const { id, email, name, surname, description, photo } = guide;
  return (
    <StyledGuideCard>
      <CardPrimaryAction onClick={() => goToBookingPage(currentUserPermission, id)}>
        <StyledGuideImage src={photo} alt="Mountainbiker photo" />
      </CardPrimaryAction>
      {currentUserPermission && (
        <StyledSpanBookMe>
          <ButtonMain
            text="Book Me!"
            onClick={() => goToBookingPage(currentUserPermission, id)}
          />
        </StyledSpanBookMe>
      )}
      <StyledSpan>
        <StyledTextTitle5 use="headline6" tag="h4">
          {name} {surname}
        </StyledTextTitle5>
        <StyledTextSubtitle1>{email}</StyledTextSubtitle1>
        <StyledTextBody2>{description}</StyledTextBody2>
      </StyledSpan>
      {!currentUserPermission && (
        <ButtonLink text="Logg in to book Me!" onClick={routeToSignin} />
      )}
      {currentUserPermission === permission.admin && (
        <React.Fragment>
          <StyledButtonSpan>
            <ButtonLink text="Edit" onClick={() => routeToEditGuide(id)} />
            <DeleteGuide id={id} />
          </StyledButtonSpan>
        </React.Fragment>
      )}
    </StyledGuideCard>
  );
};
Guide.propTypes = {
  currentUserPermission: PropTypes.string,
  id: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string,
  surname: PropTypes.string,
  description: PropTypes.string,
  photo: PropTypes.string,
};
const StyledSpan = styled.span`
  display: grid;
  grid-template-rows: 30px 35px 50px;
  padding: 8px;
`;
export const StyledGuideCard = styled(Card)`
  display: grid;
  align-content: stretch;
  margin: auto;
  margin-top: 98px;
  max-width: 344px;
`;

const StyledSpanBookMe = styled.span`
  min-width: 100px;
  max-width: 60%;
  margin-left: -8px;
  margin-top: -50px;
`;

export default Guide;
