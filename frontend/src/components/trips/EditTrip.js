import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// RMWC
import { CardPrimaryAction } from '@rmwc/card';
// Components
import Nav from '../main/Nav';
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
import { ButtonMain, ButtonLink } from '../reusable/Buttons';
import LoadingBar from '../reusable/LoadingBar';
import Input from '../reusable/Input';
import MySwitch from '../reusable/MySwitch';
// Utils
import {
  useForm,
  useFormInput,
  useSwich,
  usePhotoUpload,
  arrayFromObject,
} from '../../lib/utilsForm';
import { difficulties } from '../../lib/utils';
import { useTrip } from '../../apollo/querries/useTrip';
import { useEditTrip } from '../../apollo/mutations/useEditTrip';
import { urlGuidePhoto, uploadPresetTripSquere } from '../../lib/utilsPhotoUpload';
import { routeToTripList } from '../../lib/utilsRouts';
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
// Components for Styling
import { StyledCard } from '../styles/StyledCards';
import { StyledFieldset, StyledSpanErrors, StyledSelect } from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import { StyledGuideImage } from '../styles/StyledImage';
import { H6, TextGrayDense } from '../styles/Text';
// RMWC

const EditTrip = ({ tripId }) => {
  const { loading, error, data } = useTrip(tripId);
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  const { switchValues, handleSwitch } = useSwich(
    {
      ebike: data ? data.trip.ebikes : true,
    },
    loading,
  );
  const { inputs, handleChange, handleSubmit, errorInput } = useForm(
    handleEditTrip,
    {
      title: { textValue: data ? data.trip.title : '' },
      special: { textValue: data ? data.trip.special : '' },
      description: { textValue: data ? data.trip.description : '' },
      start: { textValue: data ? data.trip.start : '' },
      end: { textValue: data ? data.trip.end : '' },
      duration: { textValue: data ? data.trip.duration : '' },
      costs: { textValue: data ? data.trip.costs : '' },
    },
    loading,
  );
  const { value: difficulty, handleChange: handleDifficultyChange } = useFormInput(
    data ? data.trip.difficulty : '',
    loading,
  );
  const { uploadPhoto, result, loadingPhotoUpload, errorPhotoUpload } = usePhotoUpload(
    data ? data.trip.photo : '',
    urlGuidePhoto,
    uploadPresetTripSquere,
  );
  const [updateTrip, { loading: loadingMutation, error: errorMutation }] = useEditTrip();
  function handleEditTrip() {
    updateTrip({
      variables: {
        id: tripId,
        title: inputs.title.textValue,
        guideId: data.trip.guide.id,
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
  if (loading || loadingCurrentUser) {
    return <LoadingBar />;
  }
  if (error || errorCurrentUser) {
    return <ErrorGraphql error={error} />;
  }
  if (data && dataCurrentUser) {
    const { trip } = data;
    const guideId = dataCurrentUser.currentUser.id;
    const difficultiesArray = arrayFromObject(difficulties);
    return (
      <>
        {/*<Nav />*/}
        <StyledCard>
          <form onSubmit={handleSubmit} method="post">
            <StyledFieldset disabled={loadingMutation} aria-busy={loadingMutation}>
              <H6 use="headline6">{`Edit the Trip`}</H6>
              {error && <ErrorGraphql error={error} />}
              <TextGrayDense use="body1">Title:</TextGrayDense>
              <Input
                handleChange={handleChange}
                name="title"
                value={inputs.title.textValue || ''}
                required={false}
              />
              <TextGrayDense use="body1">What's so special?</TextGrayDense>
              <Input
                handleChange={handleChange}
                name="special"
                value={inputs.special.textValue || ''}
                required={false}
              />
              <TextGrayDense use="body1">Difficulty Level:</TextGrayDense>
              <StyledSelect
                onChange={handleDifficultyChange}
                placeholder="Please chose difficulty level"
                defaultValue={trip.difficulty}
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
                {loadingPhotoUpload && <LoadingBar />}
                {errorPhotoUpload && <ErrorMessage error={errorPhotoUpload} />}
              </StyledSpanErrors>
              <StyledInput type="file" id="file" onChange={uploadPhoto} />
              <label htmlFor="file">
                <CardPrimaryAction>
                  <StyledGuideImage
                    src={result ? result : data.trip.photo}
                    alt="Upload a photo"
                  />
                </CardPrimaryAction>
              </label>

              <TextGrayDense use="body1">Description:</TextGrayDense>
              <TextField
                fullwidth
                onChange={handleChange}
                name="description"
                value={inputs.description.textValue || ''}
                required={false}
                textarea={true}
                rows={5}
                maxLength={700}
              />
              <TextGrayDense use="body1">Start Point:</TextGrayDense>
              <Input
                handleChange={handleChange}
                name="start"
                value={inputs.start.textValue || ''}
                required={false}
              />
              <TextGrayDense use="body1">End Point:</TextGrayDense>
              <Input
                handleChange={handleChange}
                name="end"
                value={inputs.end.textValue || ''}
                required={false}
              />
              <TextGrayDense use="body1">Duration:</TextGrayDense>
              <Input
                handleChange={handleChange}
                name="duration"
                value={inputs.duration.textValue || ''}
                required={false}
              />
              <TextGrayDense use="body1">Are the E-bikes allowed?</TextGrayDense>
              <MySwitch
                name="ebike"
                text="E-bike"
                handleSwitch={handleSwitch}
                checked={switchValues.ebike || false}
              />
              <TextGrayDense use="body1">Aditional costs:</TextGrayDense>
              <Input
                handleChange={handleChange}
                name="costs"
                value={inputs.costs.textValue || ''}
                required={false}
              />
              {errorMutation && <ErrorGraphql error={errorMutation} />}
              <ButtonMain text="Save Changes" />
              <ButtonLink
                text="Go to My Trips"
                onClick={() => {
                  routeToTripList(guideId);
                }}
              />
            </StyledFieldset>
          </form>
        </StyledCard>
      </>
    );
  }
};
const StyledInput = styled.input`
  display: none;
`;
EditTrip.propTypes = {
  tripId: PropTypes.string.isRequired,
};

export default EditTrip;
