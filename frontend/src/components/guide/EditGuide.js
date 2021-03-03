import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// RMWC
import { CardPrimaryAction } from '@rmwc/card';
// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
import ButtonMain from '../reusable/ButtonMain';
import ButtonLink from '../reusable/ButtonLink';
import Loading from '../reusable/LoadingBar';
// Utils
import { useFormInput, usePhotoUpload } from '../../lib/utilsForm';
import { routeToGuidesList } from '../../lib/utilsRouts';
import { useGuide } from '../../apollo/querries/useGuide';
import { useEditGuide } from '../../apollo/mutations/useEditGuide';
import { handleEditGuide } from '../../lib/utilsAdmin';

// Components for Styling
import { StyledContainer } from '../styles/StyledContainer';
import { StyledCard, StyledFieldset, StyledSpanErrors } from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import { StyledTextTitle6 } from '../styles/StyledText';
import { StyledGuideImage } from '../styles/StyledGuideImage';

const UpdateGuide = ({ id }) => {
  const { loading, error, data } = useGuide(id);
  const [updateUser, { loading: loadingMutation, error: errorMutation }] = useEditGuide();
  const name = useFormInput(data ? data.user.name : '');
  const surname = useFormInput(data ? data.user.surname : '');
  const email = useFormInput(data ? data.user.email : '');
  const description = useFormInput(data ? data.user.description : '');
  const { uploadPhoto, result, loadingPhotoUpload, errorPhotoUpload } = usePhotoUpload(
    data ? data.user.photo : '',
  );
  if (loading) {
    return <Loading />;
  }
  if (error || errorMutation) {
    return <ErrorGraphql error={error || errorMutation} />;
  }
  if (data) {
    console.log('id', id);
    return (
      <StyledContainer>
        <StyledCard>
          <form data-testid="emailInput">
            <StyledFieldset disabled={loadingMutation} aria-busy={loadingMutation}>
              <StyledTextTitle6>Edit the MTB Guide</StyledTextTitle6>
              <StyledSpanErrors>
                {loadingPhotoUpload && <Loading />}
                {errorPhotoUpload && (
                  <ErrorMessage error={errorPhotoUpload}></ErrorMessage>
                )}
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
              <TextField
                {...name}
                fullwidth
                placeholder={data.user.name}
                value={name.value}
                required={true}
              />
              <TextField
                {...surname}
                fullwidth
                placeholder={data.user.surname}
                value={surname.value}
                required={true}
              />
              <TextField
                {...email}
                fullwidth
                placeholder={data.user.email}
                value={email.value}
                required={false}
              />
              <TextField
                {...description}
                fullwidth
                placeholder={data.user.description}
                textarea={true}
                rows={4}
                maxLength={100}
                value={description.value}
              />
              <span>
                <ButtonMain
                  loading={loadingMutation}
                  text="Edit Guide"
                  onClick={(e) => {
                    handleEditGuide(
                      e,
                      id,
                      email.value,
                      name.value,
                      surname.value,
                      description.value,
                      result,
                      updateUser,
                    );
                  }}
                  data-testid="ButtonEdit"
                />
              </span>
              <ButtonLink
                loading={loadingMutation}
                text="Chancel"
                onClick={routeToGuidesList}
              />
            </StyledFieldset>
          </form>
        </StyledCard>
      </StyledContainer>
    );
  }
};
const StyledInput = styled.input`
  display: none;
`;

UpdateGuide.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UpdateGuide;
