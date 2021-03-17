import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

//Components
import DeleteGuide from './DeleteGuide';
import { ButtonMain, ButtonLink } from '../reusable/Buttons';
import LoadingCicle from '../reusable/LoadingCicle';
import ErrorGraphql from '../reusable/ErrorGraphql';
// Utils
import { useGuide } from '../../apollo/querries/useGuide';
import {
  routeToGuideDetailsIfSignedIn,
  routeToCalendar,
  routeToEditGuide,
  routeToSignin,
  routeToTripList,
} from '../../lib/utilsRouts';
import { permission } from '../../lib/utils';

// Components for Styling
import { StyledGuideCard } from '../styles/StyledCards';
import { StyledGuideImage } from '../styles/StyledImage';
import { StyledButtonSpan } from '../styles/StyledButtonSpan';
import { H6, Subtitle, TextLink } from '../styles/Text';
import { guideAdditionalInfo } from '../../lib/guide';
// RMWC
import { Typography } from '@rmwc/typography';
import { CardPrimaryAction } from '@rmwc/card';

const Guide = ({ currentUserPermission, guideId }) => {
  const { loading, error, data } = useGuide(guideId);
  if (loading) {
    return (
      <StyledGuideCard>
        <LoadingCicle size="large" />
      </StyledGuideCard>
    );
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    const { user } = data;
    return (
      <StyledGuideCard>
        <CardPrimaryAction
          onClick={() => routeToGuideDetailsIfSignedIn(currentUserPermission, guideId)}
        >
          <StyledGuideImage src={user.photo} alt="Mountainbiker photo" />
        </CardPrimaryAction>
        {currentUserPermission && (
          <StyledSpanBookMe>
            <ButtonMain text="Book Me!" onClick={() => routeToCalendar(guideId)} />
          </StyledSpanBookMe>
        )}
        <StyledSpan>
          <H6 use="headline6">{`${user.name} ${user.surname}`}</H6>
          <Subtitle use="subtitle2">{`${guideAdditionalInfo.title}`}</Subtitle>
          <Typography use="body2">
            <strong>Ebiking: </strong>
            {` ${guideAdditionalInfo.ebike ? 'YES' : 'NO'}`}
          </Typography>
          <Typography use="body2">
            <strong>Mountainbike: </strong>
            {` ${guideAdditionalInfo.mtb ? 'YES' : 'NO'}`}
          </Typography>
          <Typography use="body2">
            <strong>Specialisation:</strong>
            {` ${guideAdditionalInfo.specialisations[0]}, ${guideAdditionalInfo.specialisations[2]}, ${guideAdditionalInfo.specialisations[5]}, ${guideAdditionalInfo.specialisations[4]}`}
          </Typography>
          {currentUserPermission !== '' && (
            <Link href={`/guide_details?guideId=${guideId}`}>
              <TextLink use="body2">Read more...</TextLink>
            </Link>
          )}
          {currentUserPermission !== '' && (
            <ButtonLink text="See My Trips" onClick={() => routeToTripList(guideId)} />
          )}
        </StyledSpan>
        {!currentUserPermission && (
          <ButtonLink text="Logg in to book Me!" onClick={() => routeToSignin} />
        )}
        {currentUserPermission === permission.admin && (
          <StyledButtonSpan>
            <ButtonLink text="Edit" onClick={() => routeToEditGuide(user.id)} />
            <DeleteGuide id={user.id} />
          </StyledButtonSpan>
        )}
      </StyledGuideCard>
    );
  }
};
Guide.propTypes = {
  currentUserPermission: PropTypes.string,
  guideId: PropTypes.string,
};
const StyledSpan = styled.span`
  display: grid;
  grid-template-rows: 1fr 25px 20px 20px 40px;
  padding: 8px;
`;
const StyledSpanBookMe = styled.span`
  min-width: 100px;
  max-width: 60%;
  margin-left: -8px;
  margin-top: -70px;
`;

export default Guide;
/*
 */
