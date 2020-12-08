import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Router from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UPDATE_GUIDE from '../../graphgl/mutations/UPDATE_GUIDE';
import ONE_USER_QUERY from '../../graphgl/queries/ONE_USER_QUERY';
import Nav from '../main/Nav';
import { StyledContainer } from '../styles/StyledContainer';
import { StyledCard, StyledSpanPadding } from '../styles/StyledForm';
import {
  StyledFieldset,
  StyledButtons,
  StyledButton,
  StyledSpanButon,
} from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import {
  StyledTextBody1,
  StyledTextBody2,
  StyledTextTitle5,
  StyledTextTitle6,
  StyledTextSubtitle1,
  StyledTextSubtitle2,
  StyledTextMenu,
  StyledTextMenuBlack,
} from '../styles/StyledText';
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
  function handleSubmit() {
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
  }
  if (loading) {
    return <p>"Loading..." </p>;
  }
  if (errorQuery) return `Error! ${error.message}`;
  if (!data.user) return <p>No Guide Found</p>;

  return (
    <div>
      <Nav />
      <StyledContainer>
        <StyledCard>
          <form onSubmit={handleSubmit}>
            <StyledFieldset disabled={loading} aria-busy={loading}>
              <StyledTextTitle6>Edit the MTB Guide</StyledTextTitle6>
              <img src={photo} alt="Mountainbiker photo" />
              <label htmlFor="photo">
                <input type="file" onChange={handlePhotoUpload} />
              </label>
              <TextField
                {...name}
                fullwidth
                placeholder="Name"
                value={name.value}
                onChange={handleNameChange}
              />
              <TextField
                {...surname}
                fullwidth
                placeholder="Surname"
                value={surname.value}
                onChange={handleSurnameChange}
              />
              <TextField
                {...email}
                fullwidth
                placeholder="Email"
                value={email.value}
                onChange={handleEmailChange}
              />
              <TextField
                {...description}
                fullwidth
                placeholder="Description"
                value={description.value}
                onChange={handleDescriptionChange}
              />
              <StyledSpanButon>
                <StyledButton onClick={handleSubmit} raised>
                  <StyledTextMenu>Edit Guide</StyledTextMenu>
                </StyledButton>
              </StyledSpanButon>
            </StyledFieldset>
          </form>
        </StyledCard>
      </StyledContainer>
    </div>
  );
};
UpdateGuide.propTypes = {
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
