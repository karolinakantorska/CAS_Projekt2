import React, { useState, useEffect } from 'react';
// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import LoadingBar from '../reusable/LoadingBar';
import { ButtonMain } from '../reusable/Buttons';
// Utils
import { useForm } from '../../lib/utilsForm';
import { useInfoes } from '../../apollo/querries/useInfoes';
import { useUpdateInfo } from '../../apollo/mutations/useUpdateInfo';
import { useCreateInfo } from '../../apollo/mutations/useCreateInfo';

// Components for Styling
import { StyledContainer } from '../../styles/StyledContainer';
import { StyledCardWithPadding } from '../../styles/StyledCards';
import { StyledFieldset, StyledSpanErrors } from '../../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import { H6, StyledTypographyGreen } from '../../styles/Text';

const ChangeInfo = () => {
  const [succesText, setSuccesText] = useState(false);
  const { loading, error, data, refetch } = useInfoes();
  const { inputs, handleChange, handleSubmit, errorInput } = useForm(
    handleEditInfo,
    {
      text: { textValue: !data || data.infoes.length === 0 ? '' : data.infoes[0].text },
    },
    loading,
  );
  const [
    createInfo,
    { loading: loadingCreateInfo, error: errorCreateInfo },
  ] = useCreateInfo();
  const [
    updateInfo,
    { loading: loadingUpdateInfo, error: errorUpdateInfo, data: dataCreateInfo },
  ] = useUpdateInfo();
  function handleEditInfo() {
    if (data.infoes.length === 0) {
      createInfo({
        variables: {
          text: inputs.text.textValue,
        },
      });
      refetch();
    } else {
      updateInfo({
        variables: {
          id: data.infoes[0].id,
          text: inputs.text.textValue,
        },
      });
    }
  }
  useEffect(() => {
    if (dataCreateInfo){
      setSuccesText(true);
    } 
  }, [dataCreateInfo]);
  if (loading) {
    return <LoadingBar />;
  }
  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (data) {
    return (
      <StyledContainer>
        <StyledCardWithPadding>
          <form onSubmit={handleSubmit} method="post">
            <StyledFieldset
              disabled={loadingCreateInfo || loadingUpdateInfo}
              aria-busy={loadingCreateInfo || loadingUpdateInfo}
            >
              <H6 use="headline6">Add new Info Text</H6>
              {error && <ErrorGraphql error={error} />}
              {errorCreateInfo && <ErrorGraphql error={errorCreateInfo} />}
              {errorUpdateInfo && <ErrorGraphql error={errorUpdateInfo} />}
              <TextField
                fullwidth
                onChange={handleChange}
                onClick={() => setSuccesText(false)}
                name="text"
                value={inputs.text.textValue || ''}
                required={false}
                textarea={true}
                rows={12}
                maxLength={3000}
              />
              <StyledSpanErrors>
                {succesText && (
                  <StyledTypographyGreen>Text Updated!</StyledTypographyGreen>
                )}
              </StyledSpanErrors>
              <ButtonMain text="Change Text" />
            </StyledFieldset>
          </form>
        </StyledCardWithPadding>
      </StyledContainer>
    );
  }
};

export default ChangeInfo;
