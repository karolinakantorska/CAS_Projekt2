import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import Error from '../reusable/Error';
import CURRENT_USER_QUERY from '../../graphgl/queries/CURRENT_USER_QUERY';

const User = (props) => {
  const [currentUserId, setCurrentUserId] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [currentUserPermission, setCurrentUserPermission] = useState('');
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {
    onCompleted: (data = null) => {
      if (data && data.currentUser === null) {
        setCurrentUserName('');
      } else {
        setCurrentUserId(data.currentUser.id);
        setCurrentUserName(data.currentUser.name);
        setCurrentUserEmail(data.currentUser.email);
        setCurrentUserPermission(data.currentUser.permissions);
      }
    },
    onError: (error) => {
      error;
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <Error error={error} />;
  }
  if (data) {
    return (
      <div {...props}>
        {props.children(
          currentUserPermission,
          currentUserName,
          currentUserEmail,
          currentUserId,
        )}
      </div>
    );
  }
};
User.propTypes = {
  currentUserPermission: PropTypes.string,
  currentUserName: PropTypes.string,
  currentUserEmail: PropTypes.string,
  currentUserId: PropTypes.string,
};
export default User;
