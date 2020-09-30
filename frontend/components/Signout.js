import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";

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
  return <button onClick={signout}>Sign Out</button>;
};

export default Signout;
