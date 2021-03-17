import React from 'react';
import styled from 'styled-components';
// RMWC
import { Card } from '@rmwc/card';
// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
import ErrorCard from '../reusable/ErrorCard';
import Loading from '../reusable/LoadingBar';
import ButtonMain from '../reusable/ButtonMain';
import InputPassword from '../reusable/InputPassword';
import Input from '../reusable/Input';
// Utils
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useForm, usePhotoUpload } from '../../lib/utilsForm';
import { useAddGuide } from '../../apollo/mutations/useAddGuide';
import { permission } from '../../lib/utils';
//import { handleAddGuide } from '../../lib/utilsAdmin';
import { urlGuidePhoto, uploadPresetGuide } from '../../lib/utilsPhotoUpload';
// Queries
import { StyledContainer } from '../styles/StyledContainer';
// Components for Styling
import { StyledCard } from '../styles/StyledCards';
import { StyledFieldset, StyledSpanErrors } from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import { StyledTextTitle5 } from '../styles/StyledText';
import { StyledGuideImage } from '../styles/StyledGuideImage';

const AddTrip = () => {
  const [addGuide, { loading, error }] = useAddGuide();
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  /*
  const { inputs, handleChange, handleSubmit, errorInput } = useForm(handleAddGuide, {
    email: { textValue: '', required: true },
    password: { textValue: '', required: true },
    name: { textValue: '', required: true },
    surname: { textValue: '', required: false },
    description: { textValue: '', required: false },
  });
  */
  /*
  const { uploadPhoto, result, loadingPhotoUpload, errorPhotoUpload } = usePhotoUpload(
    '',
    urlGuidePhoto,
    uploadPresetGuide,
  );
  */

  return (
    <StyledContainer>
      <StyledCard>
        <form>
          <StyledFieldset disabled={false} aria-busy={false}>
            <StyledTextTitle5>Add new Trip</StyledTextTitle5>
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
export default AddTrip;
