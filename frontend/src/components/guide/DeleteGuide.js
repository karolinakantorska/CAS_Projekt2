import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import PropTypes from 'prop-types';
import Error from '../main/Error';
import { Button } from '@rmwc/button';
import styled from 'styled-components';
import {
  StyledTextBody2,
  StyledTextTitle5,
  StyledTextSubtitle1,
  StyledTextButtonBlack,
  StyledTextButtonColor,
} from '../styles/StyledText';
// Queries
import DELETE_USER from '../../graphgl/mutations/DELETE_USER';
import DELETE_RESERVATIONS_FROM_ONE_GUIDE from '../../graphgl/mutations/DELETE_RESERVATIONS_FROM_ONE_GUIDE';
import ALL_GUIDES_QUERY from '../../graphgl/queries/ALL_GUIDES_QUERY';

const DeleteGuide = (props) => {
  const client = useApolloClient();
  const { id } = props;
  const [buttonDescription, setButtonDescription] = useState('Delete Reservations');
  const [delete_user, { loading, error, called, data }] = useMutation(DELETE_USER, {
    onError: (error) => {
      error;
    },
    update(cache, data) {
      const deletedUserID = data.data.deleteUser.id;
      // Get the current guide list
      const dataAll = cache.readQuery({
        query: ALL_GUIDES_QUERY,
        variables: { permissions: 'GUIDE' },
      });
      // spreading users to a new variable
      const newDataAll = { ...dataAll };
      // filter out a user by ID
      newDataAll.users = newDataAll.users.filter((user) => user.id !== deletedUserID);
      client.writeQuery({
        query: ALL_GUIDES_QUERY,
        variables: { permissions: 'GUIDE' },
        data: { users: [...newDataAll.users] },
      });
    },
  });
  const [delete_reservations, { error: deleteReservationsError }] = useMutation(
    DELETE_RESERVATIONS_FROM_ONE_GUIDE,
    {
      onCompleted: () => {
        setButtonDescription('Delete User');
      },
      onError: (deleteReservationsError) => {
        deleteReservationsError;
      },
    },
  );
  function handleDelete() {
    delete_reservations({
      variables: {
        id,
      },
    });
    if (buttonDescription === 'Delete User') {
      delete_user({
        variables: {
          id,
        },
      });
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <Error error={error} />;
  }
  return (
    <>
      <StyledButtonLink onClick={handleDelete}>
        <StyledTextButtonColor>{buttonDescription}</StyledTextButtonColor>
      </StyledButtonLink>
      {error && <Error error={error} />}
    </>
  );
};
DeleteGuide.propTypes = {
  id: PropTypes.string.isRequired,
};
export const StyledButtonLink = styled(Button)`
  text-transform: capitalize;
  border-radius: 0px 0px 0px 0px;
`;
export default DeleteGuide;
