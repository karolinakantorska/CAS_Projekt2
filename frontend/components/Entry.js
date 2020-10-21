import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const Entry = (props) => {
    const {time, userName, userEmail, id} = props;
return (
    <EntrySpan className='entryContainer'>
        <div className={time}>
            <p>gast name: ${userName}</p>
            <p>gast email: ${userEmail}</p>
        </div>
    </EntrySpan>
);
}
const EntrySpan = styled.span`
    background: white;
    font-size: 0.6rem;
    & .AM {
      background: lightskyblue;
      border: 1px solid gray;
      padding: 0;
    }
    & .PM {
      background: powderblue;
      border: 1px solid gray;
    }
    & .AM::before {
      content: "AM"
    }
    & .PM::before {
      content: "PM"
    }
`;

export default Entry;