import React from 'react';
// Components
import LoadingBar from '../reusable/LoadingBar';
// Utils
import { useInfoes } from '../../apollo/querries/useInfoes';
import { StyledCardWithPadding } from '../../styles/StyledCards';
import { useHydratationFix } from '../../lib/useHydratationFix';
// RMWC
import { Typography } from '@rmwc/typography';
import { H6 } from '../../styles/Text';
import {
  StyledContainer,
} from '../../styles/StyledContainer';

const InfoText = () => {
  const { loading, error, data } = useInfoes();
  const hasMounted = useHydratationFix();
  if (!hasMounted) {
    return null;
  }
  return (
    <StyledContainer>
      <StyledCardWithPadding>
        {loading && <LoadingBar />}
        {error && <ErrorGraphql error={error} />}
        <H6 use="headline6">Oberengardin MTB Guides reservation</H6>
        <Typography use="body">Terms and Conditions</Typography>
        {data && data.infoes.length !== 0 && (
          <Typography use="body2" className="info1">
            {data.infoes[0].text}
          </Typography>
        )}
      </StyledCardWithPadding>
    </StyledContainer>
  );
};

export default InfoText;
