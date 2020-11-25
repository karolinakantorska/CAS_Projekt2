import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DeleteGuide from './DeleteGuide';
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardActionButton,
} from '@rmwc/card';
import { Typography } from '@rmwc/typography';

const Guide = (props) => {
  const { currentUserPermission } = props;
  const { id, email, name, surname, description, photo } = props.user;
  console.log(props.user);
  return (
    <Card>
      <CardPrimaryAction>
        <StyledImage src={photo} alt="Mountainbiker photo" />
      </CardPrimaryAction>
      <StyledSpan>
        <Typography use="headline6" tag="h4">
          {name} {surname}
        </Typography>
        <Typography
          use="subtitle2"
          tag="p"
          theme="textSecondaryOnBackground"
        >
          {email}
        </Typography>
        <Typography
          use="body1"
          tag="div"
          theme="textSecondaryOnBackground"
        >
          description: {description}
        </Typography>
      </StyledSpan>

      {!currentUserPermission && (
        <Link
          href={{
            pathname: '/signin_page',
          }}
        >
          <CardActionButton>Logg in to book Me!</CardActionButton>
        </Link>
      )}
      {(currentUserPermission === 'USER' ||
        currentUserPermission === 'GUIDE') && (
        <Link
          href={{
            pathname: '/booking_guide',
            query: {
              guideId: id,
              guideName: name,
              guideSurname: surname,
            },
          }}
        >
          <button variant="contained" fullWidth="true">
            Book Me!
          </button>
        </Link>
      )}
      {currentUserPermission === 'ADMIN' && (
        <React.Fragment>
          <Link
            href={{
              pathname: '/booking_guide',
              query: {
                guideId: id,
                guideName: name,
                guideSurname: surname,
              },
            }}
          >
            <button variant="contained" fullWidth="true">
              Book Me!
            </button>
          </Link>
          <Link
            href={{
              pathname: '/edit_guide',
              query: { id: id },
            }}
          >
            <button>Edit</button>
          </Link>
          <DeleteGuide id={id}>Delete</DeleteGuide>
        </React.Fragment>
      )}
    </Card>
  );
};
const StyledSpan = styled.span`
  padding: 0.5rem;
`;
const StyledImage = styled.img`
  justify-self: stretch;
`;

Guide.propTypes = {
  currentUserPermission: PropTypes.string,
  id: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string,
  surname: PropTypes.string,
  description: PropTypes.string,
  photo: PropTypes.string,
};

export default Guide;

/*
<CardMedia
          sixteenByNine
          style={{
            backgroundImage: photo,
          }}
        />
        */
