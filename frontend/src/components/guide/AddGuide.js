import React from 'react';
import styled from 'styled-components';
// RMWC
import { Card } from '@rmwc/card';
// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
import ErrorCard from '../reusable/ErrorCard';
import Loading from '../reusable/LoadingBar';
import { ButtonMain } from '../reusable/Buttons';
import InputPassword from '../reusable/InputPassword';
import Input from '../reusable/Input';
// Utils
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useForm, usePhotoUpload } from '../../lib/utilsForm';
import { useAddGuide } from '../../apollo/mutations/useAddGuide';
import { permission } from '../../lib/utils';
import { urlGuidePhoto, uploadPresetGuide } from '../../lib/utilsPhotoUpload';
// Queries
import { StyledContainer } from '../styles/StyledContainer';
// Components for Styling
import { StyledCard } from '../styles/StyledCards';
import { StyledFieldset, StyledSpanErrors } from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import { StyledGuideImage } from '../styles/StyledImage';
import { H6 } from '../styles/Text';

const AddGuide = () => {
  //TODO maybe it is not needed
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  const [addGuide, { loading, error }] = useAddGuide();
  const { inputs, handleChange, handleSubmit, errorInput } = useForm(handleAddGuide, {
    name: { textValue: '' },
    surname: { textValue: '' },
    email: { textValue: '' },
    description: { textValue: '' },
    password: { textValue: '' },
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
    return <ErrorCard error={'Please log in with your Admin Account!'}></ErrorCard>;
  } else {
    return (
      <StyledCard>
        <form onSubmit={handleSubmit} method="post">
          <StyledFieldset disabled={loading} aria-busy={loading}>
            <H6 use="headline6">Add new MTB Guide</H6>
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
            {error && <ErrorGraphql error={error} />}
            <Input
              handleChange={handleChange}
              name="name"
              value={inputs.name.textValue || ''}
              required={true}
              error={errorInput.name}
            />
            <Input
              handleChange={handleChange}
              name="surname"
              required={false}
              value={inputs.surname.textValue || ''}
            />
            <Input
              handleChange={handleChange}
              name="email"
              value={inputs.email.textValue || ''}
              required={true}
              error={errorInput.email}
            />
            <InputPassword
              value={inputs.password.textValue || ''}
              handleChange={handleChange}
              error={errorInput.password}
            ></InputPassword>
            <TextField
              fullwidth
              onChange={handleChange}
              name="description"
              placeholder={inputs.description.textValue || ''}
              value={inputs.description.textValue || ''}
              required={false}
              textarea={true}
              rows={5}
              maxLength={700}
            />
            <ButtonMain text="Add Guide" />
          </StyledFieldset>
        </form>
      </StyledCard>
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
