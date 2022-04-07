import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { GET_USERS } from "../App";

const CREATE_USER = gql`
    mutation ($name: String!) {
        createUser(name: $name) {
            id
            name
        }
    }
`

const NewUserForm: React.FC = () => {
    const [name, setName] = useState('');
    const [createUser, { data, client }] = useMutation(CREATE_USER);

    async function handleCreateNewUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        await createUser({
            variables: {
                name,
            },
            update: (cache, { data: { createUser } }) => {
                const { users } = client.readQuery({ query: GET_USERS });

                cache.writeQuery({
                    query: GET_USERS,
                    data: {
                        users: {
                            ...users,
                            createUser,
                        }
                    }
                })
            }
        })

    }

    return (
        <form onSubmit={handleCreateNewUser}>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <button type="submit" >
                Adicionar
            </button>
        </form>
    );

}

export default NewUserForm;