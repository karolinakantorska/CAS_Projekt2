import React from 'react';
import PropTypes from 'prop-types';
import { ButtonMain, ButtonLink } from '../reusable/Buttons';
import { SimpleDialog } from '@rmwc/dialog';
const MyDialog = ({ title, body, handleAction }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <ButtonLink text="Delete" onClick={() => setOpen(true)} />
      <SimpleDialog
        title={title}
        body={body}
        open={open}
        onClose={(evt) => {
          if (evt.detail.action === 'accept') {
            handleAction();
          }
          setOpen(false);
        }}
      />
    </>
  );
};
MyDialog.propTypes = {
  handleAction: PropTypes.func,
  title: PropTypes.string,
  body: PropTypes.string,
};
export default MyDialog;
