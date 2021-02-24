import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';

//Components
import Error from '../reusable/Error';
import ButtonLink from '../reusable/ButtonLink';
import LoadingCicle from '../reusable/LoadingCicle';
// Utils
import { useDeleteGuide } from '../../apollo/mutations/useDeleteGuide';
// Queries
import DELETE_RESERVATIONS_FROM_ONE_GUIDE from '../../graphgl/mutations/DELETE_RESERVATIONS_FROM_ONE_GUIDE';

const DeleteGuide = ({ id }) => {
  const [buttonDescription, setButtonDescription] = useState('Delete Reservations');
  const [
    delete_reservations,
    { loading: loadingReservationsError, error: deleteReservationsError },
  ] = useMutation(DELETE_RESERVATIONS_FROM_ONE_GUIDE, {
    onCompleted: () => {
      setButtonDescription('Delete User');
    },
    onError: (error) => {
      error;
    },
  });
  const [delete_user, { loading, error }] = useDeleteGuide();

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
  if (loading || loadingReservationsError) {
    return <LoadingCicle size="xsmall" />;
  }
  if (error) {
    return <Error error={error} />;
  }
  if (deleteReservationsError) {
    return <Error error={deleteReservationsError} />;
  }
  return (
    <>
      <ButtonLink text={buttonDescription} onClick={handleDelete} />
      {error && <Error error={error} />}
      {deleteReservationsError && <Error error={deleteReservationsError} />}
    </>
  );
};
DeleteGuide.propTypes = {
  id: PropTypes.string.isRequired,
};
export default DeleteGuide;
