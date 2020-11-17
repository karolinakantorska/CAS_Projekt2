import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ONE_USER_QUERY from '../../graphgl/queries/ONE_USER_QUERY';

const SingleGuideInfo = (props) => {
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const id = props.id;

  const { loading, errorQuery, data } = useQuery(ONE_USER_QUERY, {
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
      <p>id:{id} </p>
      <label htmlFor="photo">Photo:</label>
      <img src={photo} alt="Mountainbiker photo" />
      <p>name: {name}</p>
    </div>
  );
};
SingleGuideInfo.propTypes = {
  id: PropTypes.string.isRequired
};
/*
const StyledNav = styled.nav`
    background: white;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
`;
*/

export default SingleGuideInfo;

