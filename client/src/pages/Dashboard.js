import React, { useState } from "react";
import { QUERY_SINGLE_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import beety from "./assets/beety.gif";
import ben from "./assets/ben.gif";
import frower from "./assets/frower.gif";
import iceabella from "./assets/iceabella.gif";
import volma from "./assets/volma.gif";
import wavy from "./assets/wavy.gif";

export default function Dashboard() {
  const tokenTest = Auth.getProfile();
  const userId = tokenTest.data._id;
  const { loading, error, data } = useQuery(QUERY_SINGLE_USER, {
    variables: { _id: userId },
  });
  const monsters = data?.user.monsters || [];

  const newMonster = (monster) => {

  switch (monster) {
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
  }}

  return (
    <div>
      <h1>THIS IS DASHBOARD</h1>
      {/* make a list of all monsters belonging to user */}
      {monsters.map((monster) => (
        <div key={monster._id} className="card mb-3">
          <h4 className="card-header bg-primary text-light p-2 m-0">
            {monster.fullName} <br />
            <span style={{ fontSize: "1rem" }}>
              had this thought on {monster.createdAt}
            </span>
          </h4>
          <div className="card-body bg-light p-2">
            <img
              src={() => {newMonster(monster.imageUrl)}}
              alt="Monster Artwork"/>
          </div>
        </div>
      ))}

      <Link to={"/eggpage"}>
        <button>Create Monster</button>{" "}
      </Link>
    </div>
  );
      }
