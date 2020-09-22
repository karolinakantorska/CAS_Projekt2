import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
//import { useQuery } from '@apollo/react-hooks';
//import gql from 'graphql-tag';
import GuideCard from './GuideCard';

// render props vs high order components
// render props:

const ALL_GUIDES_QUERY = gql`
    query ALL_GUIDES_QUERY {
        users {
            name
            surname
            description
            id
            photo
        }
    }
`;

const GuidesList = () => {
    const { loading, error, data } = useQuery(ALL_GUIDES_QUERY);
    console.log('error: ', error);
    if (error) return <p>Error:{error}</p>
    if (loading) return <p>Loading...</p>;
    if (!data.users) return <p>No MTB Guide found</p>;

        return (
          <div>
            <h4>Guides:</h4>
            <ul>
              {data.users.map((user) => (
                <GuideCard user={user} key={user.id} />
              ))}
            </ul>
          </div>
        );
};

/*
const StyledNav = styled.nav`
    background: white;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
`;
*/

export default GuidesList;
export { ALL_GUIDES_QUERY };