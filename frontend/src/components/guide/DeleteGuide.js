import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';

//Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import ButtonLink from '../reusable/ButtonLink';
import LoadingCicle from '../reusable/LoadingCicle';
// Utils
import { useDeleteGuide } from '../../apollo/mutations/useDeleteGuide';
// Queries
import DELETE_RESERVATIONS_FROM_ONE_GUIDE from '../../graphgl/mutations/DELETE_RESERVATIONS_FROM_ONE_GUIDE';

const DeleteGuide = ({ id }) => {
  const [buttonDescription, setButtonDescription] = useState('Delete Reservations');
  const [
    deleteReservations,
    { loading: loadingReservationsError, error: deleteReservationsError },
  ] = useMutation(DELETE_RESERVATIONS_FROM_ONE_GUIDE, {
    onCompleted: () => {
      setButtonDescription('Delete User');
    },
    onError: (error) => {
      error;
    },
  });
  const [deleteUser, { loading, error }] = useDeleteGuide();

  function handleDelete() {
    deleteReservations({
      variables: {
        id,
      },
    });
    if (buttonDescription === 'Delete User') {
      deleteUser({
        variables: {
          id,
        },
      });
    }
  }
  if (loading || loadingReservationsError) {
    return <LoadingCicle size="xsmall" />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (deleteReservationsError) {
    return <ErrorGraphql error={deleteReservationsError} />;
  }
  return (
    <>
      <ButtonLink text={buttonDescription} onClick={handleDelete} />
      {error && <ErrorGraphql error={error} />}
      {deleteReservationsError && <ErrorGraphql error={deleteReservationsError} />}
    </>
  );
};
DeleteGuide.propTypes = {
  id: PropTypes.string.isRequired,
};
export default DeleteGuide;
