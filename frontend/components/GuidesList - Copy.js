import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import apolloClientData from '../lib/withApollo';
// render props vs high order components
// here: high order components

const ALL_GUIDES_QUERY = gql`
    query ALL_GUIDES_QUERY {
        users {
            name
            surname
            description
            id
        }
    }
`;
const GuidesList = () => {
    const { loading,error, data } = useQuery(ALL_GUIDES_QUERY);
    if (loading || !data) {
        <div>
            <p>loading... a Home Page</p>
        </div>;
    }
    if (error) {
        <div>
            <p>Error: {error.message}</p>
        </div>;
    }
    { console.log(data) }
        return (
            <div>
                <h4>Guides:</h4>
                <ul>
                    {data.users.map(item => (
                        <li key={item.id}>
                            {item.name} id {item.id}
                        </li>
                    )
                    )}
                </ul>
            </div>
        )
};

/*
const StyledNav = styled.nav`
    background: white;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
`;
*/

export default apolloClientData(GuidesList) ;