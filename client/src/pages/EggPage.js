import React, { useState } from "react";
import { ADD_MONSTER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import egg from "./assets/zh3j4qF.gif";
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
    <div>
    <h1 id="greeting">Hatch the egg!</h1>
    <section className="container-fluid d-flex justify-content-center">
      {/* <Link to="/dashboard"> */}
      <Link to ="/dashboard">
      <button onClick={AddMonster}
      className="eggBtn">
        <img src={egg} alt="Egg Pixel Art" className="eggImg"/>
      </button>
      </Link>
      {/* </Link> */}
    </section>
    </div>
  );
};
export default EggPage;
