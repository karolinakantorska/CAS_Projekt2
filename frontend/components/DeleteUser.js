import React from "react";
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

const DELETE_USER = gql`
    mutation DELETE_USER($id: ID!) {
        DeleteUser(id: $id) {
            id
        }
    }
`;

const DeleteUser = (props) => (
    <button>{props.children}</button>
);

export default DeleteUser;
