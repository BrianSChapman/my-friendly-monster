import React, { useState } from "react";
import { UPDATE_MONSTER, REMOVE_MONSTER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { QUERY_SINGLE_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import chomp from "./assets/chomp.mp3";
import beachy from "./assets/beachy.jpg";
import safari from "./assets/Safari.jpg";
import jungle from "./assets/Jungle.jpg";
import beety from "./assets/beety.gif";
import ben from "./assets/ben.gif";
import frower from "./assets/frower.gif";
import iceabella from "./assets/iceabella.gif";
import volma from "./assets/volma.gif";
import wavy from "./assets/wavy.gif";

export default function MonsterPage() {
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
            return wavy;
            break;
          case "beety":
            return beety;
            break;
          case "volma":
            return volma;
            break;
          case "ben":
            return ben;
            break;
          case "iceabella":
            return iceabella;
            break;
          case "frower":
            return frower;
            break;
          default:
            return ben;
            break;
        }
      }
    }
  };
  const sound = () => {
    let audio = new Audio(chomp);
    audio.play();
  };
  return (
    <div>
      <section className="container pt-5">
        <div className="row">
          <div className="col-9 image-column">
            <img
              src={`${newMonster()}`}
              alt="monster pixel art"
              className="monster-page-image"
            />
            <img
              src={`${getBiome()}`}
              alt="biome background"
              className="biome"
            />
          </div>
          <div className="col-3">
            <div className="mon-btn-container">
              <button className="mon-btns" onClick={sound}>
                FEED MONSTER &#127829;
              </button>
              <button className="mon-btns"> LET'S DANCE!!! &#128131;</button>
              <button className="mon-btns">TIME FOR BED &#128564;</button>
              <div className="d-grid">
        <Link to="/dashboard">
          <button
            className="btn back-btn btn-lg"
            style={{ cursor: "pointer" }}
            type="submit">
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
