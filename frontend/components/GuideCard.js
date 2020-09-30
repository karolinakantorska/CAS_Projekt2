import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import DeleteGuide from './DeleteGuide';


const Guide = (props) => {
  const {currentUserPermission} = props;
  const {id, email, name, surname, description, photo } = props.user;
return (
  <StyledDiv>
    <h4>MTB Guide:</h4>
    <p>name: {name}</p>
    <p>surname: {surname}</p>
    <p>email: {email}</p>
    <p>description: {description}</p>
    <p>image:</p>
    <img src={photo} alt="Mountainbiker photo" />
    <Link
      href={{
        pathname: "/booking_guide",
        query: { id: id },
      }}
    >
      <button>Book Me!</button>
    </Link>
    <Link
      href={{
        pathname: "/edit_guide",
        query: { id: id },
      }}
    >
      <button>Edit</button>
    </Link>
    {(currentUserPermission === 'ADMIN') ? <DeleteGuide id={id}>Delete</DeleteGuide> : null}
  </StyledDiv>
)};

const StyledDiv = styled.div`
  border: 1px solid gray;
  display: grid;
  grid-template-columns: 1fr;
  
`;


export default Guide;