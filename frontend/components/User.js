import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import GuidesList from './GuidesList';
import CURRENT_USER_QUERY from '../graphgl/queries/CURRENT_USER_QUERY';


const User = (props) => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {});
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [currentUserPermission, setCurrentUserPermission] = useState(
    '',
  );

  useEffect(() => {
    if (data && data.currentUser !== null) {
      //console.log("currentUser ", data.currentUser);
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
    return <p>Loading</p>;
  }

  return (
    <div {...props}>
      {props.children(
        currentUserPermission,
        currentUserName,
        currentUserEmail,
      )}
    </div>
  );
};

export default User;

