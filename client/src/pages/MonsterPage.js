import React, { useState, useEffect } from "react";
import { UPDATE_MONSTER, REMOVE_MONSTER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { QUERY_SINGLE_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import chomp from "./assets/chomp.mp3";
import dance from "./assets/dance.mp3";
import beachy from "./assets/beachy.jpg";
import safari from "./assets/Safari.jpg";
import jungle from "./assets/Jungle.jpg";
import beety from "./assets/beety.gif";
import ben from "./assets/ben.gif";
import frower from "./assets/frower.gif";
import iceabella from "./assets/iceabella.gif";
import volma from "./assets/volma.gif";
import wavy from "./assets/wavy.gif";
import disco from "./assets/discoBall.gif";
import burger from "./assets/burgerRain.gif"
import beetysleep from "./assets/BeetySleep.gif"
import bensleep from "./assets/BenSleep.gif"
import frowersleep from "./assets/FrowerSleep.gif"
import iceabellasleep from "./assets/IceabellaSleep.gif"
import volmasleep from "./assets/VolmaSleep.gif"
import wavysleep from "./assets/WavySleep.gif"

export default function MonsterPage() {
  const [sleeping, setSleeping] = useState(false);
  var sleepText = `TIME FOR BED &#128564;`;
  const tokenTest = Auth.getProfile();
  const userId = tokenTest.data._id;
  const { loading, error, data } = useQuery(QUERY_SINGLE_USER, {
    variables: { _id: userId },
  });
  const monsters = data?.user.monsters || [];
  const { monsterId } = useParams();
  const getBiome = () => {
    for (let i = 0; i < monsters.length; i++) {
      const monster = monsters[i];
      if (monster._id === monsterId) {
        switch (monster.imageUrl) {
          case "wavy":
            return beachy;
            break;
          case "beety":
            return jungle;
            break;
          case "volma":
            return safari;
            break;
          case "ben":
            return safari;
            break;
          case "iceabella":
            return beachy;
            break;
          case "frower":
            return jungle;
            break;
          default:
            return safari;
            break;
        }
      }
    }
    return "no biome";
  };
  const newMonster = () => {
    for (let i = 0; i < monsters.length; i++) {
      const monster = monsters[i];
      if (monster._id === monsterId) {
        switch (monster.imageUrl) {
          case "wavy":
            if (sleeping === false) {
            return wavy;
            } else {
              return wavysleep;
            }
            break;
          case "beety":
            if (sleeping === false) {
              return beety;
              } else {
                return beetysleep;
              }
            break;
          case "volma":
            if (sleeping === false) {
              return volma;
              } else {
                return volmasleep;
              }
            break;
          case "ben":
            if (sleeping === false) {
              return ben;
              } else {
                return bensleep;
              }
            break;
          case "iceabella":
            if (sleeping === false) {
              return iceabella;
              } else {
                return iceabellasleep;
              }
            break;
          case "frower":
            if (sleeping === false) {
              return frower;
              } else {
                return frowersleep;
              }
            break;
          default:
            return ben;
            break;
        }
      }
    }
  };
  // Sound & Image upon Feed Monster Button Click
  const sound = () => {
    let audio = new Audio(chomp);
    audio.play();
    newMonster();

  };

  const [foodTime, setFoodTime] = useState(false);

  const handleFoodBtn = () => {
    setSleeping(false);
    document.getElementById("sleepBtn").innerHTML = `TIME FOR BED &#128564;`
    setFoodTime(true);
    sound();

    setTimeout(() => {
      setFoodTime(false);
    }, 4000);

    clearTimeout();
  };
  


  // Functionality for Dance Button & sound
  const danceSound = () => {
    let audio = new Audio(dance);
    audio.play();
    newMonster();
  };

  const [danceBreak, setDanceBreak] = useState(false);

  const handleDanceBtn = () => {
    setSleeping(false);
    document.getElementById("sleepBtn").innerHTML = `TIME FOR BED &#128564;`
    setDanceBreak(true);
    danceSound();

    setTimeout(() => {
      setDanceBreak(false);
    }, 12000);

    clearTimeout();
  };

  const sleepToggle = (event) => {
    console.log(event.target.innerHTML)
    if (!sleeping) {
      event.target.innerHTML = `WAKE UP! &#x23F0;`
      sleepText = `WAKE UP!`
      setSleeping(!sleeping);
      newMonster();
    } else if (sleeping) {
      event.target.innerHTML = `TIME FOR BED &#128564;`
      sleepText = `TIME FOR BED &#128564;`
      setSleeping(!sleeping);
      newMonster();
    } else {
      console.log("something went wrong");
    }
    return "something went wrong";
  }

  return (
    <div>
      <section className="container pt-5">
        <div className="row">
          <div className="col-lg-9 col-sm-12 image-column">
            <img
              src={`${newMonster()}`}
              alt="monster pixel art"
              className="monster-page-image"
            />
            {/* <img
            //   src={`${newMonster()}`}
            //   alt="monster pixel art"
            //   className="monster-page-image"
            // /> */}
            {foodTime && (<img id="burger-rain" src={burger} alt="Raining Burgers"></img>)}
            {danceBreak && (
              <img id="disco-ball" className="img-fluid" src={disco} alt="Disco Ball">
              </img>
            )}
            <img
              src={`${getBiome()}`}
              alt="biome background"
              className="biome img-fluid"
            />
          </div>
          <div className="col-lg-3 col-sm-12">
            <div className="mon-btn-container">
              <button className="mon-btns" onClick={handleFoodBtn}>
                FEED MONSTER &#127829;
              </button>
              <button className="mon-btns" onClick={handleDanceBtn}>
                {" "}
                LET'S DANCE!!! &#128131;
              </button>
              <button className="mon-btns" id="sleepBtn" onClick={(event) => {sleepToggle(event)}}>TIME FOR BED &#128564;</button>
              <div className="d-grid">
                <Link to="/dashboard">
                  <button
                    className="btn back-btn btn-lg"
                    style={{ cursor: "pointer" }}
                    type="submit"
                  >
                    To Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
