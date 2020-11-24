import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import DeleteGuide from './DeleteGuide';

const Guide = (props) => {
  const { currentUserPermission } = props;
  const { id, email, name, surname, description, photo } = props.user;

  return (
    <Card>
      <StyledImage src={photo} alt="Mountainbiker photo" />
      <h4>
        {name} {surname}
      </h4>
      <p className="bottom_description">email: {email}</p>
      <p>description: {description}</p>

      {!currentUserPermission && (
        <Link
          href={{
            pathname: '/signup_page',
          }}
        >
          <a>Logg in to book Me!</a>
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
          <Button variant="contained" fullWidth="true">
            Book Me!
          </Button>
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
            <Button variant="contained" fullWidth="true">
              Book Me!
            </Button>
          </Link>
          <Link
            href={{
              pathname: '/edit_guide',
              query: { id: id },
            }}
          >
            <Button>Edit</Button>
          </Link>
          <DeleteGuide id={id}>Delete</DeleteGuide>
        </React.Fragment>
      )}
    </Card>
  );
};


const StyledImage = styled.img`
  justify-self: stretch;
  border-radius: 10px 10px 0 0;
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
