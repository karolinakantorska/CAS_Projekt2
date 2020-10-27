import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import Router from 'next/router';
import styled from 'styled-components';
import DELETE_USER from '../graphgl/mutations/DELETE_USER';
import ALL_GUIDES_QUERY from '../graphgl/queries/ALL_GUIDES_QUERY';


const DeleteGuide = (props) => {
  const client = useApolloClient();
  const [delete_user, { loading, error, called, data }] = useMutation(
    DELETE_USER,
    {
      update(cache, payload) {
        const deletedUserID = payload.data.deleteUser.id;
        // Get the current guide list
        const dataAll = cache.readQuery({ query: ALL_GUIDES_QUERY });
        // spreading users to a new variable
        const newDataAll = { ...dataAll };
        // filter out a user by ID
        newDataAll.users = newDataAll.users.filter(
          (user) => user.id !== deletedUserID,
        );
        client.writeQuery({
          query: ALL_GUIDES_QUERY,
          data: {
            users: [...newDataAll.users],
          },
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
