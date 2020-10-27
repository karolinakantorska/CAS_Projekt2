import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import Router from 'next/router';
import styled from 'styled-components';
import DELETE_USER from '../graphgl/mutations/DELETE_USER';
import ALL_GUIDES_QUERY from '../graphgl/queries/ALL_GUIDES_QUERY';
import ALL_USERS_QUERY from '../graphgl/queries/ALL_USERS_QUERY';


const DeleteGuide = (props) => {
  const client = useApolloClient();

  const [delete_user, { loading, error, called, data }] = useMutation(
    DELETE_USER,
    {
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
        newDataAll.users = newDataAll.users.filter((user) => user.id !== deletedUserID,);
        client.writeQuery({
          query: ALL_GUIDES_QUERY,
          variables: { permissions: 'GUIDE' },
          data: { users: [...newDataAll.users] },
        });
    
      },
    },
  );

  return (
    <div>
      <StyledButton
        onClick={async (e) => {
          e.preventDefault();
          delete_user({
            variables: { id: props.id },
            optimisticResponse: {
              __typename: 'Mutation',
              deleteUser: {
                __typename: 'User',
                id: props.id,
              },
            },
          });
        }}
      >
        {props.children}
      </StyledButton>
    </div>
  );
};
const StyledButton = styled.button`
  width: 100%;
`;

export default DeleteGuide;
