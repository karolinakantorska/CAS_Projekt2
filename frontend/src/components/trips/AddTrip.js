import React from 'react';
import styled from 'styled-components';
// RMWC
import { Card } from '@rmwc/card';
// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
import Loading from '../reusable/LoadingBar';
import { ButtonMain, ButtonLink } from '../reusable/Buttons';
import Input from '../reusable/Input';
import MySwitch from '../reusable/MySwitch';
// Utils
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import {
  useForm,
  usePhotoUpload,
  useFormInput,
  useSwich,
  arrayFromObject,
} from '../../lib/utilsForm';
import { routeToTripList } from '../../lib/utilsRouts';
import { useCreateTrip } from '../../apollo/mutations/useCreateTrip';
import { permission, difficulties } from '../../lib/utils';
//import { handleAddGuide } from '../../lib/utilsAdmin';
import { urlGuidePhoto, uploadPresetTripSquere } from '../../lib/utilsPhotoUpload';
// Queries
import { StyledContainer } from '../styles/StyledContainer';
// Components for Styling
import { StyledCard } from '../styles/StyledCards';
import { StyledFieldset, StyledSpanErrors, StyledSelect } from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import { CardPrimaryAction } from '@rmwc/card';
import { StyledGuideImage } from '../styles/StyledImage';
import { H6, TextGrayDense } from '../styles/Text';

const AddTrip = () => {
  const [createTrip, { loading, error, data }] = useCreateTrip();
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();

  const { inputs, handleChange, handleSubmit, errorInput } = useForm(handleAddTrip, {
    title: { textValue: '', required: false },
    special: { textValue: '', required: false },
    description: { textValue: '', required: false },
    start: { textValue: '', required: false },
    end: { textValue: '', required: false },
    duration: { textValue: '', required: false },
    costs: { textValue: '', required: false },
  });
  const { value: difficulty, handleChange: handleDifficultyChange } = useFormInput('');
  const { switchValues, handleSwitch } = useSwich({ ebikes: true });
  const { uploadPhoto, result, loadingPhotoUpload, errorPhotoUpload } = usePhotoUpload(
    '',
    urlGuidePhoto,
    uploadPresetTripSquere,
  );
  function handleAddTrip() {
    //console.log('dataCurrentUser.currentUser.id', dataCurrentUser.currentUser.id);
    createTrip({
      variables: {
        title: inputs.title.textValue,
        guideId: dataCurrentUser.currentUser.id,
        special: inputs.special.textValue,
        description: inputs.description.textValue,
        difficulty,
        start: inputs.start.textValue,
        end: inputs.end.textValue,
        duration: inputs.duration.textValue,
        costs: inputs.costs.textValue,
        ebikes: switchValues.ebikes,
        photo: result,
      },
    });
  }
  if (loadingCurrentUser) {
    return <Loading />;
  }
  if (errorCurrentUser || error) {
    return <ErrorGraphql error={errorCurrentUser || error} />;
  }
  if (dataCurrentUser) {
    console.log('dataCurrentUser.currentUser.id', dataCurrentUser.currentUser.id);
    const difficultiesArray = arrayFromObject(difficulties);
    return (
      <StyledContainer>
        <StyledCard>
          <form onSubmit={handleSubmit} method="post">
            <StyledFieldset disabled={loading} aria-busy={loading}>
              <H6 use="headline6">Add new Trip</H6>

              <Input
                handleChange={handleChange}
                name="title"
                value={inputs.title.textValue || ''}
                required={false}
              />
              <Input
                handleChange={handleChange}
                name="special"
                value={inputs.special.textValue || ''}
                required={false}
              />
              <StyledSelect
                onChange={handleDifficultyChange}
                placeholder="Please chose difficulty level"
                required={true}
              >
                {difficultiesArray.map((difficulty) => {
                  return (
                    <option
                      value={Object.keys(difficulty)}
                      name="difficulty"
                      key={Object.keys(difficulty)}
                    >
                      {Object.values(difficulty)}
                    </option>
                  );
                })}
              </StyledSelect>

              <StyledSpanErrors>
                {loadingPhotoUpload && <Loading />}
                {errorPhotoUpload && (
                  <ErrorMessage error={errorPhotoUpload}></ErrorMessage>
                )}
              </StyledSpanErrors>
              {error && <ErrorGraphql error={error} />}
              <StyledInput type="file" id="file" onChange={uploadPhoto} />
              <label htmlFor="file">
                <CardPrimaryAction>
                  <StyledGuideImage src={result} alt="Upload a photo" />
                </CardPrimaryAction>
              </label>
              <TextGrayDense use="body1">Description:</TextGrayDense>
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
              <Input
                handleChange={handleChange}
                name="start"
                value={inputs.start.textValue || ''}
                required={false}
              />
              <Input
                handleChange={handleChange}
                name="end"
                value={inputs.end.textValue || ''}
                required={false}
              />
              <Input
                handleChange={handleChange}
                name="duration"
                value={inputs.duration.textValue || ''}
                required={false}
              />
              <MySwitch
                name="ebikes"
                text="E-bikes"
                handleSwitch={handleSwitch}
                checked={switchValues.ebikes || false}
              />
              <Input
                handleChange={handleChange}
                name="costs"
                value={inputs.costs.textValue || ''}
                required={false}
              />
              <ButtonMain text="Save Trip" />
              <ButtonLink
                text="Go to My Trips"
                onClick={() => routeToTripList(dataCurrentUser.currentUser.id)}
              />
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

export default AddTrip;
