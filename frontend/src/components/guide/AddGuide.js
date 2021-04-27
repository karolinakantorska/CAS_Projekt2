import React from 'react';
import styled from 'styled-components';
// Components
import Nav from '../main/Nav';
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
import LoadingBar from '../reusable/LoadingBar';
import { ButtonMain, ButtonLink } from '../reusable/Buttons';
import InputPassword from '../reusable/InputPassword';
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
import { useCreateGuide } from '../../apollo/mutations/useCreateGuide';
import { permission, specialsations } from '../../lib/utils';
import { urlGuidePhoto, uploadPresetGuide } from '../../lib/utilsPhotoUpload';
import { routeToGuidesList } from '../../lib/utilsRouts';
// Components for Styling
import { StyledCard } from '../styles/StyledCards';
import { StyledFieldset, StyledSpanErrors } from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import { StyledGuideImage } from '../styles/StyledImage';
import { StyledButtonSpan } from '../styles/StyledButtonSpan';
import { H6, TextGrayDense } from '../styles/Text';
import { CardPrimaryAction } from '@rmwc/card';
const AddGuide = () => {
  const [addGuide, { loading, error }] = useCreateGuide();
  const { checkedOptions, handleChecked } = useCheckBoxes([]);
  const { switchValues, handleSwitch } = useSwich({ ebike: true, mtb: true });
  const { inputs, handleChange, handleSubmit, errorInput } = useForm(handleAddGuide, {
    name: { textValue: '' },
    surname: { textValue: '' },
    email: { textValue: '' },
    description: { textValue: '' },
    password: { textValue: '' },
    title: { textValue: '' },
    phone: { textValue: '' },
    location: { textValue: '' },
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
  return (
    <>
      <Nav />
      <StyledCard>
        <form onSubmit={handleSubmit} method="post">
          <StyledFieldset disabled={loading} aria-busy={loading}>
            <H6 use="headline6">Add new MTB Guide</H6>
            <StyledSpanErrors>
              {loadingPhotoUpload && <LoadingBar />}
              {errorPhotoUpload && <ErrorMessage error={errorPhotoUpload}></ErrorMessage>}
            </StyledSpanErrors>
            <StyledInput type="file" id="file" onChange={uploadPhoto} />
            <label htmlFor="file">
              <CardPrimaryAction>
                <StyledGuideImage src={result} alt="Upload a photo" />
              </CardPrimaryAction>
            </label>
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
              type="email"
              value={inputs.email.textValue || ''}
              required={true}
              error={errorInput.email}
            />
            <InputPassword
              handleChange={handleChange}
              value={inputs.password.textValue || ''}
              required={true}
              error={errorInput.password}
            ></InputPassword>
            <TextGrayDense use="body1">Short encouraging text:</TextGrayDense>
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
              {specialsations.map((specialisation) => (
                <MyCheckbox
                  key={specialisation}
                  handleChecked={handleChecked}
                  specialisation={specialisation}
                  checked={checkedOptions.includes(specialisation)}
                />
              ))}
            </StyledSpan>
            {error && <ErrorGraphql error={error} />}
            <ButtonMain text="Save Guide" />
          </StyledFieldset>
        </form>
      </StyledCard>
    </>
  );
};
const StyledInput = styled.input`
  display: none;
`;
const StyledSpan = styled.span`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 344px;
`;
export default AddGuide;
