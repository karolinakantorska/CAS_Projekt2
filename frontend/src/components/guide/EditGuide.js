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
import Loading from '../reusable/LoadingBar';
import Input from '../reusable/Input';
import MySwitch from '../reusable/MySwitch';
import MyCheckbox from '../reusable/MyCheckbox';
// Utils
import {
  useForm,
  useFormInput,
  useSwich,
  useCheckBoxes,
  usePhotoUpload,
} from '../../lib/utilsForm';
import { permission, specialsations } from '../../lib/utils';
import { useGuide } from '../../apollo/querries/useGuide';
import { useEditGuide } from '../../apollo/mutations/useEditGuide';
import { urlGuidePhoto, uploadPresetGuide } from '../../lib/utilsPhotoUpload';
import { routeToGuidesList } from '../../lib/utilsRouts';

// Components for Styling
import { StyledCard } from '../styles/StyledCards';
import { StyledFieldset, StyledSpanErrors } from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import { StyledGuideImage } from '../styles/StyledImage';
import { H6, TextGrayDense } from '../styles/Text';
import { StyledButtonSpan } from '../styles/StyledButtonSpan';

const UpdateGuide = ({ guideId }) => {
  const { loading, error, data } = useGuide(guideId);
  const { checkedOptions, handleChecked } = useCheckBoxes(
    data ? data.user.specialisations : [],
    loading,
  );
  const { switchValues, handleSwitch } = useSwich(
    {
      ebike: data ? data.user.ebike : true,
      mtb: data ? data.user.mtb : true,
    },
    loading,
  );
  const { inputs, handleChange, handleSubmit, errorInput } = useForm(
    handleEditGuide,
    {
      name: { textValue: data ? data.user.name : '' },
      surname: { textValue: data ? data.user.surname : '' },
      email: { textValue: data ? data.user.email : '' },
      description: { textValue: data ? data.user.description : '' },
      title: { textValue: data ? data.user.title : '' },
      phone: { textValue: data ? data.user.phone : '' },
      location: { textValue: data ? data.user.location : '' },
    },
    loading,
  );

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
        permissions: permission.guide,
        title: inputs.title.textValue,
        ebike: switchValues.ebike,
        mtb: switchValues.mtb,
        phone: inputs.phone.textValue,
        specialisations: checkedOptions,
        location: inputs.location.textValue,
      },
    });
  }

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    return (
      <>
        <Nav />
        <StyledCard>
          <form onSubmit={handleSubmit} method="post">
            <StyledFieldset disabled={loadingMutation} aria-busy={loadingMutation}>
              <H6 use="headline6">Edit the MTB Guide</H6>
              <StyledSpanErrors>
                {loadingPhotoUpload && <Loading />}
                {errorPhotoUpload && <ErrorMessage error={errorPhotoUpload} />}
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
              {error && <ErrorGraphql error={error} />}
              <TextGrayDense use="body1">Name:</TextGrayDense>
              <Input
                handleChange={handleChange}
                name="name"
                value={inputs.name.textValue || ''}
                required={true}
                error={errorInput.name}
              />
              <TextGrayDense use="body1">Surame:</TextGrayDense>
              <Input
                handleChange={handleChange}
                name="surname"
                value={inputs.surname.textValue || ''}
                required={false}
              />
              <TextGrayDense use="body1">Email:</TextGrayDense>
              <Input
                handleChange={handleChange}
                name="email"
                type="email"
                value={inputs.email.textValue || ''}
                required={true}
                error={errorInput.email}
              />
              <TextGrayDense use="body1">Title:</TextGrayDense>
              <Input
                handleChange={handleChange}
                name="title"
                value={inputs.title.textValue || ''}
                required={false}
              ></Input>
              <TextGrayDense use="body1">
                Prefered starting point, when no Trip is choosen:
              </TextGrayDense>
              <Input
                handleChange={handleChange}
                name="location"
                type="location"
                value={inputs.location.textValue || ''}
              />
              <TextGrayDense use="body1">Description:</TextGrayDense>
              <TextField
                fullwidth
                onChange={handleChange}
                name="description"
                //placeholder={inputs.description.textValue || ''}
                value={inputs.description.textValue || ''}
                required={false}
                textarea={true}
                rows={5}
                maxLength={700}
              />
              <TextGrayDense use="body1">Phone Number:</TextGrayDense>
              <Input
                handleChange={handleChange}
                name="phone"
                value={inputs.phone.textValue || ''}
                required={true}
                error={errorInput.phone}
              ></Input>
              <StyledButtonSpan>
                <MySwitch
                  name="ebike"
                  text="E-bike"
                  handleSwitch={handleSwitch}
                  checked={switchValues.ebike || false}
                />
                <MySwitch
                  name="mtb"
                  text="MTB"
                  handleSwitch={handleSwitch}
                  checked={switchValues.mtb || false}
                />
              </StyledButtonSpan>
              <StyledSpan>
                {specialsations.map((specialisation) => {
                  return (
                    <MyCheckbox
                      key={specialisation}
                      handleChecked={handleChecked}
                      specialisation={specialisation}
                      checked={checkedOptions.includes(specialisation)}
                    />
                  );
                })}
              </StyledSpan>
              {errorMutation && <ErrorGraphql error={errorMutation} />}
              <ButtonMain text="Save Changes" />
              <ButtonLink text="Guide List" onClick={() => routeToGuidesList()} />
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
const StyledSpan = styled.span`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 344px;
`;
UpdateGuide.propTypes = {
  guideId: PropTypes.string.isRequired,
};
export default UpdateGuide;
