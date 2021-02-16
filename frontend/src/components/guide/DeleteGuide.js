import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
//Components
import Error from '../reusable/Error';
import ButtonLink from '../reusable/ButtonLink';
// Utils
import { cacheDeleteGuide } from '../../lib/utilsCache';
// Queries
import DELETE_USER from '../../graphgl/mutations/DELETE_USER';
import DELETE_RESERVATIONS_FROM_ONE_GUIDE from '../../graphgl/mutations/DELETE_RESERVATIONS_FROM_ONE_GUIDE';

const DeleteGuide = ({ id }) => {
  const [buttonDescription, setButtonDescription] = useState('Delete Reservations');

  const [delete_user, { loading, error, data }] = useMutation(DELETE_USER, {
    onError: (error) => {
      error;
    },
    update(cache, data) {
      cacheDeleteGuide(cache, data);
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
      <ButtonLink text={buttonDescription} onClick={handleDelete} />
      {error && <Error error={error} />}
    </>
  );
};
DeleteGuide.propTypes = {
  id: PropTypes.string.isRequired,
};
export default DeleteGuide;
