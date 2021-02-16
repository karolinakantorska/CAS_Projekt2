import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
// RMWC
import { Card } from '@rmwc/card';
// Components
import Error from '../reusable/Error';
import ErrorMessage from '../reusable/ErrorMessage';
import Loading from '../reusable/LoadingBar';
import ButtonMain from '../reusable/ButtonMain';
// Utils
import {
  useFormInput,
  usePhotoUpload,
  validateForm,
  addErrorMessage,
  removeErrorMessage,
} from '../../lib/utilsForm';
import { cacheAllGuides } from '../../lib/utilsCache';
import { routeToGuidesList } from '../../lib/utilsRouts';
// Queries
import ADD_GUIDE from '../../graphgl/mutations/ADD_GUIDE';
import { StyledContainer } from '../styles/StyledContainer';
// Components for Styling
import { StyledCard, StyledFieldset, StyledSpanErrors } from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import { StyledTextTitle5 } from '../styles/StyledText';
import { StyledGuideImage } from '../styles/StyledGuideImage';

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
      routeToGuidesList();
    },
    onError: (error) => {
      error;
    },
    update(cache, data) {
      cacheAllGuides(cache, data);
    },
  });
  function handleAddGuide(e) {
    e.preventDefault();
    removeErrorMessage();
    const errors = validateForm(email.value, name.value, password.value);
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
    <StyledContainer>
      <StyledCard>
        <form>
          <StyledFieldset disabled={loading} aria-busy={loading}>
            <StyledTextTitle5>Add new MTB Guide</StyledTextTitle5>
            <StyledSpanErrors>
              {loadingPhotoUpload && <Loading />}
              {errorPhotoUpload && <ErrorMessage error={errorPhotoUpload}></ErrorMessage>}
            </StyledSpanErrors>
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
              rows={4}
              maxLength={100}
              value={description.value}
            />
            <span>
              <ButtonMain
                text="Add Guide"
                onClick={(e) => {
                  handleAddGuide(e);
                }}
              />
            </span>
          </StyledFieldset>
        </form>
      </StyledCard>
    </StyledContainer>
  );
};
export const StyledGuideCard = styled(Card)`
  display: grid;
  align-content: stretch;
  margin: auto;
  width: 344px;
`;
const StyledInput = styled.input`
  display: none;
`;
export default AddGuide;
