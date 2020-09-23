import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
//TODO make importing queries work!
//import CURRENT_USER_QUERY from './User';

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      id
      email
      permissions
    }
  }
`;

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = (props) => {
  const [signout, { loading, error, data }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return <div onClick={signout}>Sign Out</div>;
};

export default Signout;
