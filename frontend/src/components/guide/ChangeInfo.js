import React from 'react';

// Components
import ErrorGraphql from '../reusable/ErrorGraphql';
import ErrorMessage from '../reusable/ErrorMessage';
import ErrorCard from '../reusable/ErrorCard';
import Loading from '../reusable/LoadingBar';
import ButtonMain from '../reusable/ButtonMain';

// Utils
import { useCurrentUser } from '../../apollo/querries/useCurrentUser';
import { useForm } from '../../lib/utilsForm';
import { permission } from '../../lib/utils';

// Components for Styling
import { StyledCardWithPadding } from '../styles/StyledForm';
import { StyledCard, StyledFieldset, StyledSpanErrors } from '../styles/StyledForm';
import { TextField } from '@rmwc/textfield';
import { StyledTextTitle5 } from '../styles/StyledText';
import { StyledGuideImage } from '../styles/StyledGuideImage';

const ChangeInfo = () => {
  const {
    loading: loadingCurrentUser,
    error: errorCurrentUser,
    data: dataCurrentUser,
  } = useCurrentUser();
  return (
    <StyledCardWithPadding>
      <form>
        <StyledFieldset disabled={false} aria-busy={false}>
          <StyledTextTitle5>Add new Info Text</StyledTextTitle5>
          <TextField
            fullwidth
            placeholder="Description"
            name="description"
            value={inputs.description.textValue || 'Here You can write...'}
            //onChange={handleChange}
            required={false}
            textarea={true}
            rows={4}
            maxLength={100}
          />
          <span>
            <ButtonMain loading={false} text="Add Info Text" onClick={() => null} />
          </span>
        </StyledFieldset>
      </form>
    </StyledCardWithPadding>
  );
};

export default ChangeInfo;
