import React from 'react';
import styled from 'styled-components';
// RMWC
import { Card } from '@rmwc/card';
// Components
import Error from '../reusable/Error';
import ErrorMessage from '../reusable/ErrorMessage';
import Loading from '../reusable/LoadingBar';
import ButtonMain from '../reusable/ButtonMain';
// Utils
import { useFormInput, usePhotoUpload } from '../../lib/utilsForm';
import { useAddGuide } from '../../apollo/mutations/useAddGuide';
import { handleAddGuide } from '../../lib/utilsAdmin';
// Queries
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
  const [add_guide, { loading, error }] = useAddGuide();
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
                loading={loading}
                text="Add Guide"
                onClick={(e) => {
                  handleAddGuide(
                    e,
                    password.value,
                    email.value,
                    name.value,
                    surname.value,
                    description.value,
                    result,
                    add_guide,
                  );
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
