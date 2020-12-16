import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import CURRENT_USER_QUERY from '../../graphgl/queries/CURRENT_USER_QUERY';

const User = (props) => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {});
  const [currentUserId, setCurrentUserId] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [currentUserPermission, setCurrentUserPermission] = useState('');

  useEffect(() => {
    if (data && data.currentUser !== null) {
      //console.log("currentUser ", data.currentUser);
      setCurrentUserId(data.currentUser.id);
      setCurrentUserName(data.currentUser.name);
      setCurrentUserEmail(data.currentUser.email);
      setCurrentUserPermission(data.currentUser.permissions);
    }
    // by logging out
    if (data && data.currentUser === null) {
      setCurrentUserName('');
    }
  }, [loading, data]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (data) {
    console.log('user');
    console.log(data);
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
