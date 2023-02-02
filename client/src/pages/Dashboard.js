import React, { useState } from 'react';
import { QUERY_SINGLE_USER } from '../utils/queries'
import { useQuery } from '@apollo/client'
import { useLocation } from 'react-router-dom';
import Auth from '../utils/auth'


export default function Dashboard() {
  const tokenTest = Auth.getProfile();
  const userId = tokenTest.data._id;
  const { loading, error, data } = useQuery(QUERY_SINGLE_USER, {
    variables: { _id: userId },
  });
  const monsters = data?.user.monsters || [];

  return (
    <div>
      <h1>THIS IS DASHBOARD</h1>
      {/* make a list of all monsters belonging to user */}
      {monsters.map((monster) => (
        <div key={monster._id} className="card mb-3">
          <h4 className="card-header bg-primary text-light p-2 m-0">
            {monster.fullName} <br />
            <span style={{ fontSize: '1rem' }}>
              had this thought on {monster.createdAt}
            </span>
          </h4>
          <div className="card-body bg-light p-2">
            <p>{monster.imageUrl}</p>
          </div>
        </div>))}
    </div>
    // create monster button
  );
}
