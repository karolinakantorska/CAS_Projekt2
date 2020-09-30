import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import GuidesList from "./GuidesList";

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      id
      email
      name
      permissions
    }
  }
`;

const User = (props) => {
   
const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {});
const [currentUserName, setCurrentUserName] = useState("");
const [currentUserPermission, setCurrentUserPermission] = useState("");

useEffect(() => {
  if (data && data.currentUser !== null) {
    console.log("currentUser ", data.currentUser);
    setCurrentUserName(data.currentUser.name);
    setCurrentUserPermission(data.currentUser.permissions);
  }
  // by logging out
  if (data && data.currentUser === null) {
    setCurrentUserName("");
  }
}, [loading, data]);


if (loading) {
  return <p>Loading</p>;
}

return (
  <div {...props}>{props.children(currentUserPermission, currentUserName)}</div>
);
};



export default User;
export {CURRENT_USER_QUERY}