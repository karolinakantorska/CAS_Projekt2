import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client'
import Router from 'next/router'
import Link from 'next/link';
import styled from 'styled-components';

const ADD_GUIDE = gql`
    mutation ADD_GUIDE(
        $email: String!
        $name: String!
        $surname: String
        $description: String
    ) {
        createUser(
            email: $email
            name: $name
            surname: $surname
            description: $description
        ) {
            name
            id
        }
    }
`

const CreateGuide = (props) => {
    const name = useFormInput('');
    const surname = useFormInput('');
    const email = useFormInput('');
    const description = useFormInput('');
    const [add_guide, { loading, error, called, data }] = useMutation(ADD_GUIDE);
    /*
    const [name, setName] = useState('');
    function handleNameChange(e){
        setName(e.target.value);
    }
    */
    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                // TODO catche updates
                // TODO displaying error
                // TODO optimistic updates
                // TODO maybe animation by loading
                add_guide({
                     variables: {
                          email: email.value,
                          name: name.value, 
                          surname: surname.value, 
                          description: description.value
                    }
                }); 
                Router.push({
                    pathname: '/guides'
                }) 
            }}>
                <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="name">
                        Name:
                    <input
                            {...name}
                            type="text"
                            placeholder="name"
                            required
                        />
                        <p>{name.value}</p>
                    </label>
                    <label htmlFor="surname">
                        Surname:
                    <input
                            {...surname}
                            type="text"
                            placeholder="surname"
                            required
                        />
                        <p>{surname.value}</p>
                    </label>
                    <label htmlFor="email">
                        E-mail:
                    <input
                            {...email}
                            type="email"
                            placeholder="e mail"
                            required
                        />
                        <p>{email.value}</p>
                    </label>
                    <label htmlFor="description">
                        Description:
                    <input
                            {...description}
                            type="email"
                            required
                        />
                        <p>{description.value}</p>
                    </label>
                    <button type="submit">Submitt</button>
                </fieldset>
            </form> 
            {console.log('error:', error)}
        </div>
    )
};
// TODO use context use themes
/*
const StyledNav = styled.nav`
    background: white;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
`;
*/
function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        setValue(e.target.value);
    }

    return {
        value,
        onChange: handleChange
    };
}

export default CreateGuide;
export { ADD_GUIDE }

