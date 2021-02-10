import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// RMWC
import { Card } from '@rmwc/card';
import { Button } from '@rmwc/button';
import { CardPrimaryAction } from '@rmwc/card';

import DeleteGuide from './DeleteGuide';
// Components for Styling
import { StyledGuideImage } from '../styles/StyledGuideImage';
import {
  StyledTextBody2,
  StyledTextTitle5,
  StyledTextSubtitle1,
  StyledTextButtonBlack,
  StyledTextButtonColor,
} from '../styles/StyledText';

const Guide = (props) => {
  const { currentUserPermission, currentUserName } = props;
  const { id, email, name, surname, description, photo } = props.guide;
  const router = useRouter();
  function goToBookingPage() {
    if (currentUserPermission) {
      router.push({
        pathname: '/booking_guide',
        query: {
          guideId: id,
          guideName: name,
          guideSurname: surname,
          guidePhoto: photo,
          currentUserName,
        },
      });
    } else {
      router.push({
        pathname: '/signin_page',
      });
    }
  }

  return (
    <StyledGuideCard>
      <CardPrimaryAction onClick={goToBookingPage}>
        <StyledGuideImage src={photo} alt="Mountainbiker photo" />
      </CardPrimaryAction>
      {currentUserPermission && (
        <StyledButtonBookMe
          theme={['secondaryBg', 'onSecondary']}
          raised
          onClick={goToBookingPage}
        >
          <StyledTextButtonBlack>Book Me!</StyledTextButtonBlack>
        </StyledButtonBookMe>
      )}

      <StyledSpan>
        <StyledTextTitle5 use="headline6" tag="h4">
          {name} {surname}
        </StyledTextTitle5>
        <StyledTextSubtitle1>{email}</StyledTextSubtitle1>
        <StyledTextBody2>{description}</StyledTextBody2>
      </StyledSpan>

      {!currentUserPermission && (
        <Link
          href={{
            pathname: '/signin_page',
          }}
        >
          <StyledButtonLink>
            <StyledTextButtonColor>Logg in to book Me!</StyledTextButtonColor>
          </StyledButtonLink>
        </Link>
      )}

      {currentUserPermission === 'ADMIN' && (
        <React.Fragment>
          <StyledButtonSpan>
            <Link
              href={{
                pathname: '/edit_guide',
                query: { id: id },
              }}
            >
              <StyledButtonLink>
                <StyledTextButtonColor>Edit</StyledTextButtonColor>{' '}
              </StyledButtonLink>
            </Link>
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
  margin-top: 4rem;
  max-width: 344px;
`;
const StyledButtonSpan = styled.span`
  display: grid;
  align-content: stretch;
  grid-template-columns: 1fr 1fr;
`;
export const StyledButtonBookMe = styled(Button)`
  text-transform: capitalize;
  min-width: 100px;
  max-width: 60%;
  margin-left: -8px;
  margin-top: -50px;
  border-radius: 0px 0px 0px 0px;
`;
export const StyledButtonLink = styled(Button)`
  text-transform: capitalize;
  border-radius: 0px 0px 0px 0px;
`;

export default Guide;
