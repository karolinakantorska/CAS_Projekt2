import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Router from 'next/router';
import styled from 'styled-components';
// RMWC
import { Card } from '@rmwc/card';
// Components
import Nav from '../main/Nav';
import Error from '../main/Error';
import ErrorMessage from '../main/ErrorMessage';
import { validateForm, addErrorMessage, removeErrorMessage } from '../../lib/utils';
// Queries
import ADD_GUIDE from '../../graphgl/mutations/ADD_GUIDE';
import ALL_GUIDES_QUERY from '../../graphgl/queries/ALL_GUIDES_QUERY';
import { StyledContainer } from '../styles/StyledContainer';
// Components for Styling
import { StyledCard, StyledSpanButon } from '../styles/StyledForm';
import { StyledFieldset, StyledButton } from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import { StyledTextTitle5, StyledTextButtonBlack } from '../styles/StyledText';
import { StyledGuideImage } from '../styles/StyledGuideImage';

const AddGuide = () => {
  const { loading: loadingAll, error: errorAll, data: dataAll } = useQuery(
    ALL_GUIDES_QUERY,
  );
  const password = useFormInput('');
  const email = useFormInput('');
  const name = useFormInput('');
  const surname = useFormInput('');
  const description = useFormInput('');
  const [photo, setPhoto] = useState('');

  const [add_guide, { loading, error, data }] = useMutation(ADD_GUIDE, {
    onCompleted: (data) => {
      Router.push({
        pathname: '/guides',
      });
    },
    onError: (error) => {
      error;
    },
    update(cache, data) {
      // Get the current guide list
      const dataAll = cache.readQuery({
        query: ALL_GUIDES_QUERY,
        variables: { permissions: 'GUIDE' },
      });
      // Create a new user
      const newUser = {
        ...data.data.createUser,
      };
      // Write back to the users list, appending the new user
      cache.writeQuery({
        query: ALL_GUIDES_QUERY,
        variables: { permissions: 'GUIDE' },
        data: {
          users: [...dataAll.users, newUser],
        },
      });
    },
  });

  async function handlePhotoUpload(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('upload_preset', 'MTBregistration');

    const cloudinaryRes = await fetch(
      'https://api.cloudinary.com/v1_1/karolinauploads/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );
    const file = await cloudinaryRes.json();
    setPhoto(file.secure_url);
    console.log(file.secure_url);
  }
  function handleSubmit(e) {
    e.preventDefault();
    removeErrorMessage();
    const errors = validateForm(email, password, name);
    addErrorMessage(errors);
    if (errors.length === 0) {
      add_guide({
        variables: {
          password: password.value,
          email: email.value,
          name: name.value,
          surname: surname.value,
          description: description.value,
          photo: photo,
        },
      });
    }
  }
  if (loadingAll) {
    return <p>Loading...</p>;
  }
  if (errorAll) {
    return <Error error={errorAll} />;
  }
  return (
    <React.Fragment>
      <Nav />
      <StyledContainer>
        <StyledCard>
          <form>
            <StyledFieldset disabled={loading} aria-busy={loading}>
              <StyledTextTitle5>Add new MTB Guide</StyledTextTitle5>
              <StyledInput type="file" id="file" onChange={handlePhotoUpload} />
              <label htmlFor="file">
                <StyledGuideCard>
                  <StyledGuideImage src={photo} alt="Upload a photo" />
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
                minLength={8}
                maxLength={32}
                helpText={{
                  persistent: true,
                  validationMsg: true,
                }}
                pattern="^.{8,32}$"
                required={true}
              />
              <TextField
                {...description}
                fullwidth
                placeholder="Description"
                textarea={true}
                value={description.value}
              />
              <StyledSpanButon>
                <StyledButton
                  onClick={(e) => handleSubmit(e)}
                  raised
                  theme={['secondaryBg', 'onSecondary']}
                >
                  <StyledTextButtonBlack>Add Guide</StyledTextButtonBlack>
                </StyledButton>
              </StyledSpanButon>
            </StyledFieldset>
          </form>
        </StyledCard>
      </StyledContainer>
    </React.Fragment>
  );
};

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange,
  };
}
const StyledInput = styled.input`
  display: none;
`;
export const StyledGuideCard = styled(Card)`
  display: grid;
  align-content: stretch;
  margin: auto;
  max-width: 344px;
  height: 344px;
`;

export default AddGuide;
