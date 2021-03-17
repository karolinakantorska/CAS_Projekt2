import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// RMWC
import { CardPrimaryAction } from '@rmwc/card';
// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
import { ButtonMain } from '../reusable/Buttons';
import Loading from '../reusable/LoadingBar';
import Input from '../reusable/Input';
// Utils
import { useForm, usePhotoUpload } from '../../lib/utilsForm';
import { useGuide } from '../../apollo/querries/useGuide';
import { useEditGuide } from '../../apollo/mutations/useEditGuide';
import { urlGuidePhoto, uploadPresetGuide } from '../../lib/utilsPhotoUpload';

// Components for Styling
import { StyledCard } from '../styles/StyledCards';
import { StyledFieldset, StyledSpanErrors } from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import { StyledGuideImage } from '../styles/StyledImage';
import { H6 } from '../styles/Text';

const UpdateGuide = ({ guideId }) => {
  const { loading, error, data } = useGuide(guideId);
  const { inputs, handleChange, handleSubmit, errorInput } = useForm(handleEditGuide, {
    name: { textValue: data ? data.user.name : '' },
    surname: { textValue: data ? data.user.surname : '' },
    email: { textValue: data ? data.user.email : '' },
    description: { textValue: data ? data.user.description : '' },
  });

  const { uploadPhoto, result, loadingPhotoUpload, errorPhotoUpload } = usePhotoUpload(
    data ? data.user.photo : '',
    urlGuidePhoto,
    uploadPresetGuide,
  );
  const [updateUser, { loading: loadingMutation, error: errorMutation }] = useEditGuide();
  function handleEditGuide() {
    updateUser({
      variables: {
        id: guideId,
        email: inputs.email.textValue,
        name: inputs.name.textValue,
        surname: inputs.surname.textValue,
        description: inputs.description.textValue,
        photo: result,
      },
    });
  }

  if (loading) {
    return <Loading />;
  }
  if (error || errorMutation) {
    return <ErrorGraphql error={error || errorMutation} />;
  }
  if (data) {
    return (
      <StyledCard>
        <form onSubmit={handleSubmit} method="post">
          <StyledFieldset disabled={loadingMutation} aria-busy={loadingMutation}>
            <H6 use="headline6">Edit the MTB Guide</H6>
            <StyledSpanErrors>
              {loadingPhotoUpload && <Loading />}
              {errorPhotoUpload && <ErrorMessage error={errorPhotoUpload}></ErrorMessage>}
            </StyledSpanErrors>
            <StyledInput type="file" id="file" onChange={uploadPhoto} />
            <label htmlFor="file">
              <CardPrimaryAction>
                <StyledGuideImage
                  src={result ? result : data.user.photo}
                  alt="Upload a photo"
                />
              </CardPrimaryAction>
            </label>
            <ErrorMessage />
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
              value={inputs.surname.textValue || ''}
              required={false}
            />
            <Input
              handleChange={handleChange}
              name="email"
              value={inputs.email.textValue || ''}
              required={true}
              error={errorInput.email}
            />
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
            <ButtonMain text="Save Changes" />
          </StyledFieldset>
        </form>
      </StyledCard>
    );
  }
};
const StyledInput = styled.input`
  display: none;
`;
UpdateGuide.propTypes = {
  guideId: PropTypes.string.isRequired,
};
export default UpdateGuide;
