import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Router from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import ONE_USER_QUERRY from '../graphgl/queries/ONE_USER_QUERRY';

const SingleGuideInfo = (props) => {
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const id = props.id;

  const { loading, errorQuery, data } = useQuery(ONE_USER_QUERRY, {
    variables: { id: id },
  });

  useEffect(() => {
    if (!loading && data) {
      setName(data.user.name);
      setEmail(data.user.email);
      setSurname(data.user.surname);
      setDescription(data.user.description);
      setPhoto(data.user.photo);
      document.title = `MTB Engardin | ${data.user.name} ${data.user.surname}`;
    }
  }, [loading, data]);

  if (loading) {
    return <p>"Loading..." </p>;
  }
  if (errorQuery) return `Error! ${error.message}`;
  if (!data.user) return <p>No Guide Found</p>;

  return (
    <div>
      <p>id:{props.id} </p>
      <label htmlFor="photo">Photo:</label>
      <img src={photo} alt="Mountainbiker photo" />
      <p>name: {name}</p>
    </div>
  );
};
// TODO use context use themes
/*
const StyledNav = styled.nav`
    background: white;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
`;
*/

export default SingleGuideInfo;

