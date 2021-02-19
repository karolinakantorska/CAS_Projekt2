import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TextField } from '@rmwc/textfield';
import { Select } from '@rmwc/select';
import { Ripple } from '@rmwc/ripple';

import User from '../main/User';
import Error from '../reusable/Error';
import ErrorMessage from '../reusable/ErrorMessage';

import DAY_QUERY from '../../graphgl/queries/DAY_QUERY';
import CREATE_DAY from '../../graphgl/mutations/CREATE_DAY';
import UPDATE_DAY from '../../graphgl/mutations/UPDATE_DAY';

import { StyledContainer } from '../styles/StyledContainer';
import { StyledCard, StyledButton, StyledSpanPadding } from '../styles/StyledForm';
// utils
import {
  StyledTextBody1,
  StyledTextTitle6,
  StyledTextButtonBlack,
} from '../styles/StyledText';
import {
  chooseWholeDay,
  chooseMorning,
  chooseAfternoon,
  useHandleTimeChange,
} from '../../lib/utilsBooking';
import {
  addErrorMessage,
  validateFormBookingConfirmation,
  removeErrorMessage,
} from '../../lib/utilsForm';
const BookingConfirmation = ({ props }) => {
  const { day, selectedMonth: month, selectedYear: year, guideId, bookedTime } = props;
  const time = useHandleTimeChange('');
  const [description, setDescription] = useState('');
  const [nrOfPeople, setNrOfPeople] = useState(1);
  const router = useRouter();
  const { loading, error, data: dataDay, refetch } = useQuery(DAY_QUERY, {
    variables: {
      year,
      month,
      day,
    },
    onCompleted: (dataDay) => {
      console.log('compleated', dataDay);
    },
    onError: (error) => {
      error;
    },
  });
  const [update_day, { error: errorUpdateDay }] = useMutation(UPDATE_DAY, {
    onCompleted: () => {
      //not sure of that
      //refetch();
      router.push({
        pathname: '/thank_you',
        query: {
          time,
          day,
          month,
          year,
          guideName: 'no name',
          guideSurname: 'no surname',
          guideId,
        },
      });
    },
    onError: (errorUpdateDay) => {
      errorUpdateDay;
    },
  });
  const [create_day, { error: errorCreateDay }] = useMutation(CREATE_DAY, {
    onCompleted: () => {
      //not sure of that
      //refetch();
      router.push({
        pathname: '/thank_you',
        query: {
          time,
          day,
          month,
          year,
          guideName: 'no name',
          guideSurname: 'no surname',
          guideId,
        },
      });
    },
    onError: (errorCreateDay) => {
      errorCreateDay;
    },
  });

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleNrOfPeopleChange(e) {
    setNrOfPeople(e.target.value);
  }
  function handleSubmitt(e, userName, userEmail) {
    e.preventDefault();
    removeErrorMessage();
    const errors = validateFormBookingConfirmation(time);
    addErrorMessage(errors);
    console.log('time.value', time.value);
    if (errors.length === 0) {
      // day doesn't exist yet
      // returns days=[]

      if (dataDay.days.length === 0) {
        create_day({
          variables: {
            time: time.value,
            day,
            month,
            year,
            userName,
            userEmail,
            nrOfPeople,
            description,
            id: guideId,
          },
        });
      }
      // day exist
      else {
        const { id } = dataDay.days[0];
        update_day({
          variables: {
            time: time.value,
            userName,
            userEmail,
            nrOfPeople,
            description,
            id: guideId,
            dayId: id, //existing day id
          },
        });
      }
    }
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <Error error={error} />;
  }
  if (dataDay) {
    return (
      <User>
        {(currentUserPermission, currentUserName, currentUserEmail, currentUserId) => (
          <>
            <StyledContainer>
              <StyledCard>
                <StyledSpanPadding>
                  <StyledTextTitle6>
                    Hallo {currentUserName}, confirm your booking details!
                  </StyledTextTitle6>
                  <ErrorMessage />
                  {errorCreateDay && <Error error={errorCreateDay} />}
                  {errorUpdateDay && <Error error={errorUpdateDay} />}
                  <StyledTextBody1>
                    Booked Date:{' '}
                    <strong>
                      {year}/{month}/{day}
                    </strong>
                  </StyledTextBody1>
                  <StyledTextBody1>
                    Do you preffer Morning or Aftenoon Trip?
                  </StyledTextBody1>
                  {bookedTime === 'PM' && (
                    <StyledSelect
                      {...time}
                      value={time.value}
                      placeholder="Please chose the time of a day"
                      invalid={!Boolean(time)}
                      options={[chooseMorning]}
                    />
                  )}
                  {bookedTime === 'AM' && (
                    <StyledSelect
                      {...time}
                      value={time.value}
                      placeholder="Please chose the time of a day"
                      invalid={!Boolean(time)}
                      options={[chooseAfternoon]}
                    />
                  )}
                  {bookedTime === '' && (
                    <StyledSelect
                      {...time}
                      value={time.value}
                      placeholder="Please chose the time of a day"
                      invalid={!Boolean(time)}
                      options={[chooseWholeDay, chooseMorning, chooseAfternoon]}
                    />
                  )}
                  <StyledTextBody1>How big is the group?</StyledTextBody1>
                  <StyledSelect
                    icon="directions_bike"
                    defaultValue="1"
                    onChange={(e) => handleNrOfPeopleChange(e)}
                    options={['1', '2', '3', '4', '5']}
                  />
                  <StyledTextBody1>
                    Write us, if you want to arrive latter, stay with us until a late
                    evening? Have some Ideas where would you like to go?
                  </StyledTextBody1>
                  <Ripple>
                    <TextField
                      textarea
                      fullwidth
                      rows={2}
                      maxLength={100}
                      //value={password}
                      onChange={handleDescriptionChange}
                    />
                  </Ripple>

                  <StyledButton
                    onClick={(e) => handleSubmitt(e, currentUserName, currentUserEmail)}
                    raised
                    theme={['secondaryBg', 'onSecondary']}
                  >
                    <StyledTextButtonBlack>Confirm and Go!</StyledTextButtonBlack>
                  </StyledButton>
                </StyledSpanPadding>
              </StyledCard>
            </StyledContainer>
          </>
        )}
      </User>
    );
  }
};
BookingConfirmation.propTypes = {
  day: PropTypes.string,
  selectedMonth: PropTypes.string,
  selectedYear: PropTypes.string,
  guideId: PropTypes.string,
  guideName: PropTypes.string,
  guideSurname: PropTypes.string,
};

const StyledSelect = styled(Select)`
  div {
    background-color: white;
  }
`;
export default BookingConfirmation;
