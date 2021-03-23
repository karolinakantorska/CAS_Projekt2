import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// RMWC
import { CardPrimaryAction } from '@rmwc/card';
// Components
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
import { permission, specialsations, colors } from '../../lib/utils';
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
  );
  const { switchValues, handleSwitch } = useSwich({
    ebike: data ? data.user.ebike : true,
    mtb: data ? data.user.mtb : true,
  });
  const { inputs, handleChange, handleSubmit, errorInput } = useForm(handleEditGuide, {
    name: { textValue: data ? data.user.name : '' },
    surname: { textValue: data ? data.user.surname : '' },
    email: { textValue: data ? data.user.email : '' },
    description: { textValue: data ? data.user.description : '' },
    title: { textValue: data ? data.user.title : '' },
    phone: { textValue: data ? data.user.phone : '' },
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
        permissions: permission.guide,
        title: inputs.title.textValue,
        ebike: switchValues.ebike,
        mtb: switchValues.mtb,
        phone: inputs.phone.textValue,
        specialisations: checkedOptions,
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
    console.log(data.user);
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
              type="email"
              value={inputs.email.textValue || ''}
              required={true}
              error={errorInput.email}
            />
            <Input
              handleChange={handleChange}
              name="title"
              value={inputs.title.textValue || ''}
              required={false}
            ></Input>
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
                checked={switchValues.ebike}
              />
              <MySwitch
                name="mtb"
                text="MTB"
                handleSwitch={handleSwitch}
                checked={switchValues.mtb}
              />
            </StyledButtonSpan>
            <StyledSpan>
              {specialsations.map((specialisation, i) => {
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

            <ButtonMain text="Save Changes" />
            <ButtonLink text="Guide List" onClick={() => routeToGuidesList()} />
          </StyledFieldset>
        </form>
      </StyledCard>
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
