import React from 'react';
// Components
import Nav from '../main/Nav';
import LoadingBar from '../reusable/LoadingBar';
// Utils
import { useInfoes } from '../../apollo/querries/useInfoes';
import { StyledCardWithPadding } from '../styles/StyledCards';
// RMWC
import { Typography } from '@rmwc/typography';
import { H6 } from '../styles/Text';

const InfoText = () => {
  const { loading, error, data } = useInfoes();
  if (loading) {
    return <LoadingBar />;
  }
  if (error) {
    return (
      <StyledCardWithPadding>
        {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
        {error && <ErrorGraphql error={error} />}
      </StyledCardWithPadding>
    );
  }
  if (data) {
    return (
      <>
        {/*<Nav />*/}
        <StyledCardWithPadding>
          <H6 use="headline6">Oberengardin MTB Guides reservation</H6>
          <Typography use="body">Terms and Conditions</Typography>
          {data.infoes.length !== 0 && (
            <Typography use="body2" className="info1">
              {data.infoes[0].text}
            </Typography>
          )}
        </StyledCardWithPadding>
      </>
    );
  }
};

export default InfoText;
