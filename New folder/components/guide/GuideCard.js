import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
//import styled from 'styled-components';
import DeleteGuide from './DeleteGuide';

const Guide = (props) => {
  const { currentUserPermission } = props;
  const { id, email, name, surname, description, photo } = props.user;

  return (
    <div>
      <img src={photo} alt="Mountainbiker photo" />
      <h4>{name} {surname}</h4>
      <p className='bottom_description'>email: {email}</p>
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
          <button>Book Me!</button>
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
            <button>Book Me!</button>
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
    </div>
  );
};
/*
const StyledDiv = styled.div`
  max-width: 300px;
  height: 500px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 300px 40px 30px 1fr;
  border: 1px solid lightgray;
  border-radius: 10px;

  box-shadow: 2 10 9 5 lightgray;
  -moz-box-shadow: 2 10 9 5 lightgray;
  -webkit-box-shadow: 2 10 9 5 lightgray;

  h4 {
    font-size: ${(props) => props.theme.type.typeH4.size};
    color: ${(props) => props.theme.textDark.primary};
    margin: ${(props) => props.theme.type.typeH4.margin};
  }
  .bottom_description {
    font-size: ${(props) => props.theme.type.typeBody1.size};
    color: ${(props) => props.theme.textDark.secundary};
    padding: 0px 0 0px 0;
    margin: 0px 0 0px 0;
  }
`;
const StyledImage = styled.img`
  max-width: 300px;
  justify-self: stretch;
  border-radius: 10px 10px 0 0;
`;
*/
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
