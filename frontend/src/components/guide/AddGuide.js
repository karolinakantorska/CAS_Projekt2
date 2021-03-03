import React, { useState } from 'react';
import styled from 'styled-components';
// RMWC
import { Card } from '@rmwc/card';
// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
import Loading from '../reusable/LoadingBar';
import ButtonMain from '../reusable/ButtonMain';
// Utils
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useForm, usePhotoUpload } from '../../lib/utilsForm';
import { useAddGuide } from '../../apollo/mutations/useAddGuide';
import { permission } from '../../lib/utils';
//import { handleAddGuide } from '../../lib/utilsAdmin';
import { urlGuidePhoto, uploadPresetGuide } from '../../lib/configUrl';
// Queries
import { StyledContainer } from '../styles/StyledContainer';
// Components for Styling
import { StyledCard, StyledFieldset, StyledSpanErrors } from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import { StyledTextTitle5 } from '../styles/StyledText';
import { StyledGuideImage } from '../styles/StyledGuideImage';

const AddGuide = () => {
  const [showPass, setShowPass] = useState('password');
  const [addGuide, { loading, error }] = useAddGuide();
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  const { inputs, handleChange, handleSubmit, errorInput } = useForm(handleAddGuide, {
    email: { textValue: '', required: true },
    password: { textValue: '', required: true },
    name: { textValue: '', required: true },
    surname: { textValue: '', required: false },
    description: { textValue: '', required: false },
  });
  const { uploadPhoto, result, loadingPhotoUpload, errorPhotoUpload } = usePhotoUpload(
    '',
    urlGuidePhoto,
    uploadPresetGuide,
  );
  function handleAddGuide() {
    addGuide({
      variables: {
        email: inputs.email.textValue,
        password: inputs.password.textValue,
        name: inputs.name.textValue,
        surname: inputs.surname.textValue,
        description: inputs.description.textValue,
        photo: result,
      },
    });
  }
  //dataCurrentUser.currentUser.permissions
  if (loadingCurrentUser) {
    return <Loading />;
  }
  if (errorCurrentUser) {
    return (
      <StyledContainer>
        {errorCurrentUser && <ErrorGraphql error={errorCurrentUser} />}
      </StyledContainer>
    );
  }
  if (dataCurrentUser.currentUser.permissions !== permission.admin) {
    return (
      <StyledContainer>
        <StyledCard>
          <ErrorMessage error={'Please log in with your Admin Account!'}></ErrorMessage>
        </StyledCard>
      </StyledContainer>
    );
  } else {
    return (
      <StyledContainer>
        <StyledCard>
          <form>
            <StyledFieldset disabled={loading} aria-busy={loading}>
              <StyledTextTitle5>Add new MTB Guide</StyledTextTitle5>
              <StyledSpanErrors>
                {loadingPhotoUpload && <Loading />}
                {errorPhotoUpload && (
                  <ErrorMessage error={errorPhotoUpload}></ErrorMessage>
                )}
              </StyledSpanErrors>
              <StyledInput type="file" id="file" onChange={uploadPhoto} />
              <label htmlFor="file">
                <StyledGuideCard>
                  <StyledGuideImage src={result} alt="Upload a photo" />
                </StyledGuideCard>
              </label>
              <ErrorMessage />
              {error && <ErrorGraphql error={error} />}
              <TextField
                fullwidth
                placeholder="Name"
                name="name"
                value={inputs.name.textValue || ''}
                onChange={handleChange}
                required
              />
              {errorInput.name && <ErrorMessage error={errorInput.name} />}
              <TextField
                fullwidth
                placeholder="Surname"
                name="surname"
                value={inputs.surname.textValue || ''}
                onChange={handleChange}
              />
              <TextField
                fullwidth
                placeholder="Email"
                name="email"
                value={inputs.email.textValue || ''}
                onChange={handleChange}
                required
              />
              {errorInput.email && <ErrorMessage error={errorInput.email} />}
              <TextField
                fullwidth
                placeholder="Password"
                type={showPass}
                name="password"
                value={inputs.password.textValue || ''}
                onChange={handleChange}
                required
                trailingIcon={{
                  icon: 'visibility',
                  size: 'xsmall',
                  onMouseOver: () => setShowPass('text'),
                  onMouseLeave: () => setShowPass('password'),
                }}
              />
              {errorInput.password && <ErrorMessage error={errorInput.password} />}
              <TextField
                fullwidth
                placeholder="Description"
                name="description"
                value={inputs.description.textValue || ''}
                onChange={handleChange}
                required={false}
                textarea={true}
                rows={4}
                maxLength={100}
              />
              <span>
                <ButtonMain loading={loading} text="Add Guide" onClick={handleSubmit} />
              </span>
            </StyledFieldset>
          </form>
        </StyledCard>
      </StyledContainer>
    );
  }
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
