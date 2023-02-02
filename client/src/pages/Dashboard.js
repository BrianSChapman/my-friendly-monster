import React, { useState } from 'react';
import { QUERY_SINGLE_USER } from '../utils/queries'
import { useQuery } from '@apollo/client'
import { useLocation } from 'react-router-dom';
import Auth from '../utils/auth'


export default function Dashboard() {
    const tokenTest = Auth.getProfile();
    const userId = tokenTest.data._id;
    const { loading, error, data } = useQuery(QUERY_SINGLE_USER, {
        variables: {_id: userId},
    });
    // const monsters = data?.monsters || [];
    console.log(data);

    return (
        <div>
            <h1>THIS IS DASHBOARD</h1>
            {/* make a list of all monsters belonging to user
            {loading ? (
                <div>Loading...</div>
            ) : (
                {data}
            )} */}
        </div>
        // create monster button
    );
}
