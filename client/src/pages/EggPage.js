import React, { useState } from "react";
import { ADD_MONSTER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import egg from "./assets/zh3j4qF.gif";

const EggPage = () => {
  const monsterArray = [
    "https://imgur.com/a/6ncbacJ",
    "https://imgur.com/a/HF9GwLp",
    "https://imgur.com/a/X3rUCn6",
    "https://imgur.com/a/L9PCw85",
    "https://imgur.com/a/u45n7Ln",
    "https://imgur.com/a/eYXEvhs",
  ];
  const randomMonster =
    monsterArray[Math.floor(monsterArray.length * Math.random())];
  const [nameState, setNameState] = useState("My Monster");
  console.log(nameState);
  const [imgState, setImgState] = useState(randomMonster);
  console.log(imgState);
  const [addMonster, { error }] = useMutation(ADD_MONSTER);

  const AddMonster = () => {
    try {
        addMonster({
        variables: {
          nameState,
          imgState,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="container-fluid">
      <button onClick={AddMonster}>
        <img src={egg} alt="Egg Pixel Art"></img>
      </button>
    </section>
  );
};
export default EggPage;
