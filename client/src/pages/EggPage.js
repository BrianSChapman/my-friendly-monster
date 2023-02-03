import React, { useState } from "react";
import { ADD_MONSTER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import egg from "./assets/zh3j4qF.gif";
// import beety from './assets/beety.gif';
// import ben from './assets/ben.gif';
// import frower from './assets/frower.gif';
// import iceabella from './assets/iceabella.gif';
// import volma from './assets/volma.gif';
// import wavy from './assets/wavy.gif';
import Auth from '../utils/auth';

const EggPage = () => {
    const tokenTest = Auth.getProfile();
  const userId = tokenTest.data._id;
  const monsterArray = [
    'wavy',
    'volma',
    'iceabella',
    'frower',
    'ben',
    'beety',
];
  const randomMonster = monsterArray[Math.floor(monsterArray.length * Math.random())];
  const [nameState, setNameState] = useState("My Monster");
  console.log(nameState);
  const [imgState, setImgState] = useState(randomMonster);
    console.log(imgState);
  const [addMonster, { error }] = useMutation(ADD_MONSTER);


  const AddMonster = () => {
    try {
        addMonster({
        variables: {
          fullName: nameState,
          imageUrl: imgState,
          userId
          
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="container-fluid">
      <Link to="/dashboard">
      <button onClick={AddMonster}>
        <img src={egg} alt="Egg Pixel Art"/>
      </button>
      </Link>
    </section>
  );
};
export default EggPage;
