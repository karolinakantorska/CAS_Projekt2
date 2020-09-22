import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import DeleteGuide from './DeleteGuide';


const Guide = (props) => (
  <StyledDiv>
    <h4>MTB Guide:</h4>
    <p>name: {props.user.name}</p>
    <p>surname: {props.user.surname}</p>
    <p>email: {props.user.email}</p>
    <p>description: {props.user.description}</p>
    <p>image:</p>
    <img src={props.user.photo} alt="Mountainbiker photo" />
    <Link
      href={{
        pathname: "/booking_guide",
        query: { id: props.user.id },
      }}
    >
      <button>Book Me!</button>
    </Link>
    <Link
      href={{
        pathname: "/edit_guide",
        query: { id: props.user.id },
      }}
    >
      <button>Edit</button>
    </Link>
    <DeleteGuide id={props.user.id}>Delete</DeleteGuide>
  </StyledDiv>
);

const StyledDiv = styled.div`
  border: 1px solid gray;
  display: grid;
  grid-template-columns: 1fr;
  
`;


export default Guide;