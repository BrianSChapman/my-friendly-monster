import React, { useState } from 'react';
import Login from './Login';


export default function HomeContainer() {

  return (
    <>
    <section>
      <div className="navbar">
        <h1 className="title">My Friendly Monsters</h1>
      </div>
      <Login/>
    </section>
    </>
  );
}
