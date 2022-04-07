import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import NewUserForm from './components/NewUserForm';

export const GET_USERS = gql`
    query {
        users {
            id
            name
        }
    }
`

const App: React.FC = () => {
    const { data, loading } = useQuery(GET_USERS);

    if (loading) {
        return (
            <h1>Carregando...</h1>
        )
    }

    return (
        <div>
            <ol>
                {data.users.map((user: any) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ol>
            <NewUserForm />
        </div>
    )

}

export default App;