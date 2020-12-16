import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Router from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// RMWC
import { CardPrimaryAction } from '@rmwc/card';
import { Button } from '@rmwc/button';
// Components
import Nav from '../main/Nav';
// Queries
import UPDATE_GUIDE from '../../graphgl/mutations/UPDATE_GUIDE';
import ONE_USER_QUERY from '../../graphgl/queries/ONE_USER_QUERY';
// Components for Styling
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
  StyledTextMenuWhite,
  StyledTextButtonBlack,
  StyledTextButtonColor,
} from '../styles/StyledText';

import { StyledGuideImage } from '../styles/StyledGuideImage';
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
  }
  function handleSubmit() {
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
  function handleChancel() {
    Router.push({
      pathname: '/guides',
    });
  }
  if (loading) {
    return <p>"Loading..." </p>;
  }
  if (errorQuery) return `Error! ${error.message}`;
  if (!data.user) return <p>No Guide Found</p>;
  if (data) {
    console.log(data);
    return (
      <div>
        <Nav />
        <StyledContainer>
          <StyledCard>
            <form>
              <StyledFieldset disabled={loading} aria-busy={loading}>
                <StyledTextTitle6>Edit the MTB Guide</StyledTextTitle6>
                <StyledInput type="file" id="file" onChange={handlePhotoUpload} />
                <label htmlFor="file">
                  <CardPrimaryAction>
                    <img src={photo} alt="Upload a photo" />
                  </CardPrimaryAction>
                </label>
                <TextField
                  {...name}
                  fullwidth
                  label={name}
                  value={name.value}
                  onChange={handleNameChange}
                />
                <TextField
                  {...surname}
                  fullwidth
                  label={surname}
                  value={surname.value}
                  onChange={handleSurnameChange}
                />
                <TextField
                  {...email}
                  fullwidth
                  label={email}
                  value={email.value}
                  onChange={handleEmailChange}
                />
                <TextField
                  {...description}
                  fullwidth
                  label={description}
                  value={description.value}
                  onChange={handleDescriptionChange}
                />
                <StyledSpanButon>
                  <StyledButton
                    onClick={handleSubmit}
                    raised
                    theme={['secondaryBg', 'onSecondary']}
                    data-testid="ButtonEdit"
                  >
                    <StyledTextButtonBlack>Edit Guide</StyledTextButtonBlack>
                  </StyledButton>
                </StyledSpanButon>
                <StyledButtonLink data-testid="ButtonCancel" onClick={handleChancel}>
                  <StyledTextButtonColor>Chancel</StyledTextButtonColor>
                </StyledButtonLink>
              </StyledFieldset>
            </form>
          </StyledCard>
        </StyledContainer>
      </div>
    );
  }
};
const StyledInput = styled.input`
  display: none;
`;
export const StyledButtonLink = styled(Button)`
  text-transform: capitalize;
  width: 100%;
  border-radius: 0px 0px 0px 0px;
`;
UpdateGuide.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UpdateGuide;
