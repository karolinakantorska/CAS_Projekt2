import React from "react";
import { gql, useMutation} from "@apollo/client";
import Router from "next/router";


const DELETE_USER = gql`
    mutation DELETE_USER($id: ID!) {
        deleteUser(id: $id) {
            id
        }
    }
`;

const DeleteGuide = (props) => {
    const [
      delete_user,
      { loadingMutation, errorMutation, calledMutation, dataMutation },
    ] = useMutation(DELETE_USER);
  return (
    <div>
      <button
        onClick={async (e) => {
          e.preventDefault();
          delete_user({
            variables: { id: props.id },
          });
        }}
      >
        {props.children}
      </button>
    </div>
  );
} 

export default DeleteGuide;
