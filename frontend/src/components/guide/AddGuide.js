import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Router from 'next/router';
import styled from 'styled-components';
// RMWC
import { Card } from '@rmwc/card';
// Components
import Nav from '../main/Nav';
import Error from '../main/Error';
import ErrorMessage from '../main/ErrorMessage';
import Loading from '../main/Loading';
import {
  validateForm,
  addErrorMessage,
  removeErrorMessage,
  permission,
} from '../../lib/utils';
// Queries
import ADD_GUIDE from '../../graphgl/mutations/ADD_GUIDE';
import ALL_GUIDES_QUERY from '../../graphgl/queries/ALL_GUIDES_QUERY';
import { StyledContainer } from '../styles/StyledContainer';
// Components for Styling
import {
  StyledCard,
  StyledFieldset,
  StyledSpanButon,
  StyledButton,
} from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import { StyledTextTitle5, StyledTextButtonBlack } from '../styles/StyledText';
import { StyledGuideImage } from '../styles/StyledGuideImage';
import { useFormInput, usePhotoUpload } from '../../lib/utilsAdmin';

const AddGuide = () => {
  const password = useFormInput('');
  const email = useFormInput('');
  const name = useFormInput('');
  const surname = useFormInput('');
  const description = useFormInput('');
  const { uploadPhoto, result, loadingPhotoUpload, errorPhotoUpload } = usePhotoUpload(
    '',
  );

  const [add_guide, { loading, error }] = useMutation(ADD_GUIDE, {
    onCompleted: () => {
      Router.push({
        pathname: '/guides',
      });
    },
    onError: (error) => {
      error;
    },
    update(cache, data) {
      console.log('cache', cache);
      // Get the current guide list
      const dataAll = cache.readQuery({
        query: ALL_GUIDES_QUERY,
        variables: { permissions: permission.guide },
      });
      // Create a new user
      const newUser = {
        ...data.data.createUser,
      };
      // Write back to the users list, appending the new user
      cache.writeQuery({
        query: ALL_GUIDES_QUERY,
        variables: { permissions: permission.guide },
        data: {
          users: [...dataAll.users, newUser],
        },
      });
    },
  });
  // function updateCache(){}
  // must take cache, data

  function handleSubmit(e) {
    e.preventDefault();
    removeErrorMessage();
    const errors = validateForm(email.value, password.value, name.value);
    addErrorMessage(errors);
    if (errors.length === 0) {
      add_guide({
        variables: {
          password: password.value,
          email: email.value,
          name: name.value,
          surname: surname.value,
          description: description.value,
          photo: result,
        },
      });
    }
  }
  return (
    <React.Fragment>
      <Nav />
      <StyledContainer>
        <StyledCard>
          <form>
            <StyledFieldset disabled={loading} aria-busy={loading}>
              <StyledTextTitle5>Add new MTB Guide</StyledTextTitle5>
              <StyledSpan>
                {loadingPhotoUpload && <Loading />}
                {errorPhotoUpload && (
                  <ErrorMessage error={errorPhotoUpload}></ErrorMessage>
                )}
              </StyledSpan>
              <StyledInput type="file" id="file" onChange={uploadPhoto} />
              <label htmlFor="file">
                <StyledGuideCard>
                  <StyledGuideImage src={result} alt="Upload a photo" />
                </StyledGuideCard>
              </label>
              <ErrorMessage />
              {error && <Error error={error} />}
              <TextField
                {...name}
                fullwidth
                placeholder="Name"
                value={name.value}
                required={true}
              />
              <TextField
                {...surname}
                fullwidth
                placeholder="Surname"
                value={surname.value}
                required={true}
              />
              <TextField {...email} fullwidth placeholder="Email" value={email.value} />
              <TextField
                {...password}
                fullwidth
                placeholder="Password"
                type="password"
                value={password.value}
                required={true}
              />
              <TextField
                {...description}
                fullwidth
                placeholder="Description"
                textarea={true}
                value={description.value}
              />
              <StyledSpanButon>
                <StyledButton
                  onClick={(e) => handleSubmit(e)}
                  raised
                  theme={['secondaryBg', 'onSecondary']}
                >
                  <StyledTextButtonBlack>Add Guide</StyledTextButtonBlack>
                </StyledButton>
              </StyledSpanButon>
            </StyledFieldset>
          </form>
        </StyledCard>
      </StyledContainer>
    </React.Fragment>
  );
};
export const StyledGuideCard = styled(Card)`
  display: grid;
  align-content: stretch;
  margin: auto;
  width: 344px;
  //height: 344px;
`;
const StyledSpan = styled.div`
  height: 25px;
  margin-bottom: 5px;
`;
const StyledInput = styled.input`
  display: none;
`;

export default AddGuide;
