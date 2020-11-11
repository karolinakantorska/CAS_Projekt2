import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Router from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UPDATE_GUIDE from '../../graphgl/mutations/UPDATE_GUIDE';
import ONE_USER_QUERY from '../../graphgl/queries/ONE_USER_QUERY';
//TODO it forces me to update photo every time

const UpdateGuide = (props) => {
   const id = props.id;
  const { loading, errorQuery, data } = useQuery(ONE_USER_QUERY, {
    variables: { id },
  });
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
 
  const [
    updateUser,
    { loadingMutation, errorMutation, calledMutation, dataMutation },
  ] = useMutation(UPDATE_GUIDE);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleSurnameChange(e) {
    setSurname(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  async function updateGuide(e, updateGuideMutation) {
    e.preventDefault();
    console.log('updating Guide');
    const res = await updateGuideMutation({
      variables: {
        id,
      },
    });
    console.log('Updated');
  }

  useEffect(() => {
    if (!loading && data) {
      //console.log(data.user.name);
      setName(data.user.name);
      setEmail(data.user.email);
      setSurname(data.user.surname);
      setDescription(data.user.description);
      setPhoto(data.user.photo);
    }
  }, [loading, data]);
  async function handlePhotoUpload(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('upload_preset', 'MTBregistration');

    const cloudinaryRes = await fetch(
      'https://api.cloudinary.com/v1_1/karolinauploads/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );
    const file = await cloudinaryRes.json();
    setPhoto(file.secure_url);
    //console.log('photo url: ', file.secure_url);
  }

  if (loading) {
    return <p>"Loading..." </p>;
  }
  if (errorQuery) return `Error! ${error.message}`;
  if (!data.user) return <p>No Guide Found</p>;

  return (
    <div>
      <p>id:{id} </p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          // IT IS NOT CHANGING DISPLAYED DATA UNTIL RELOAD
          // TODO catche updates
          // TODO displaying error
          // TODO optimistic updates
          // TODO maybe animation by loading

          updateUser({
            variables: {
              id,
              email,
              name,
              surname,
              description,
              photo,
            },
          });
          Router.push({
            pathname: '/guides',
          });
        }}
      >
        <fieldset
          disabled={loadingMutation}
          aria-busy={loadingMutation}
        >
          <img src={photo} alt="Mountainbiker photo" />
          <label htmlFor="photo">
            Photo:
            <input
              type="file"
              onChange={handlePhotoUpload}
            />
          </label>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              onChange={handleNameChange}
              defaultValue={name}
              required
            />
            <p>{name}</p>
          </label>
          <label htmlFor="surname">
            Surname:
            <input
              type="text"
              onChange={handleSurnameChange}
              defaultValue={surname}
              required
            />
            <p>{surname}</p>
          </label>
          <label htmlFor="email">
            E-mail:
            <input
              type="email"
              onChange={handleEmailChange}
              defaultValue={email}
              required
            />
            <p>{email}</p>
          </label>
          <label htmlFor="description">
            Description:
            <input
              type="text"
              onChange={handleDescriptionChange}
              defaultValue={description}
              required
            />
            <p>{description}</p>
          </label>
          <button type="submit">Submitt</button>
        </fieldset>
      </form>
    </div>
  );
};
UpdateGuide.PropTypes = {
  id: PropTypes.string.isRequired,
};
// TODO use context use themes
/*
const StyledNav = styled.nav`
    background: white;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
`;
*/

export default UpdateGuide;

