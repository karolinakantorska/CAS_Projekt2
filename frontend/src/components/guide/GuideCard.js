import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// RMWC
import { Card } from '@rmwc/card';
import { Button } from '@rmwc/button';
import { CardPrimaryAction } from '@rmwc/card';
// Components for Styling
import {
  StyledTextBody2,
  StyledTextTitle5,
  StyledTextSubtitle1,
  StyledTextButtonBlack,
  StyledTextButtonColor,
} from '../styles/StyledText';

const Guide = (props) => {
  console.log(props);
  const { currentUserPermission } = props;
  const { id, email, name, surname, description, photo } = props.user;
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
        <StyledImage src={photo} alt="Mountainbiker photo" />
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
            <Link
              href={{
                pathname: '/delete_guide',
                query: { id: id },
              }}
            >
              <StyledButtonLink id={id}>
                <StyledTextButtonColor>Delete</StyledTextButtonColor>
              </StyledButtonLink>
            </Link>
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
const StyledImage = styled.img`
  justify-self: stretch;
  max-width: 344px;
  max-height: 344px;
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
