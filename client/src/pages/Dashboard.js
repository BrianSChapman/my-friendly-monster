import React, { useState, useEffect } from "react";
import { QUERY_SINGLE_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { REMOVE_MONSTER } from "../utils/mutations";
import { UPDATE_MONSTER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import beety from "./assets/beety.gif";
import ben from "./assets/ben.gif";
import frower from "./assets/frower.gif";
import iceabella from "./assets/iceabella.gif";
import volma from "./assets/volma.gif";
import wavy from "./assets/wavy.gif";
import plus from "./assets/plus.gif";

export default function Dashboard() {
  const tokenTest = Auth.getProfile();
  const userId = tokenTest.data._id;
  const { loading, error, data } = useQuery(QUERY_SINGLE_USER, {
    variables: { _id: userId },
  });
  const monsters = data?.user.monsters || [];
  const [removeMonster, { removeError }] = useMutation(REMOVE_MONSTER);
  const [updateMonster, { updateError}] = useMutation(UPDATE_MONSTER
    // Todo: Look into Apollo Cache for this (Module 21, Act 17 & 18)
    );

  const RemoveMonster = (monsterId, userId) => {
    console.log(monsterId);
    try {
      removeMonster({
        variables: {
          monsterId: monsterId,
          userId: userId,
        },
      });
      window.location.reload();
    } catch (removeError) {
      console.log(removeError);
    }
  };

  const UpdateMonster = (fullName, monsterId) => {
    try {
      console.log(`this is new fullName: ${fullName}`)
      updateMonster({
        variables: {
          fullName: fullName,
          monsterId: monsterId,
        },
      });
      window.location.reload();
    } catch (updateError) {
      console.log(updateError);
    }
  }

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
    }
  };
  if (loading) {
    return <div>Loading</div>;
  }

  const editName = (event, monsterId) => {
    // var text = this.innerHTML;
    var editableText = event.target
    console.log(editableText);
            editableText = editableText.innerHTML.replace(/&/g, "&amp").replace(/</g, "&lt;");
            console.log("must've worked");
            UpdateMonster(editableText, monsterId );

  };

  return (
    <div>
      <h1 id="greeting">Click a monster to say hi!</h1>
      <div className="container-fluid d-flex p-5 flex-wrap mt-6" id="monster-card" >
        {monsters.map((monster) => (
          <div key={monster._id} className="card me-3 mb-4 p-2 border-0">
            <h4 className="card-header text-white text-center p-2 m-0">
              <span contentEditable="true" onBlur={(event) => {editName(event, monster._id)}} className="contentEditableName">{monster.fullName}</span> <span className="pencil">&#9999;&#65039;</span>
              <br />
            </h4>
            <Link to={`/monsterpage/${monster._id}`}>
              <div className="card-body p-2">
                <img
                  src={`${newMonster(monster.imageUrl)}`}
                  alt="Monster Artwork"
                  className="dashImg"
                />
              </div>
            </Link>
            <button
              className="rehomeBtn rounded"
              onClick={() => {
                RemoveMonster(monster._id, userId);
              }}
            >
              Delete Monster
            </button>
          </div>
        ))}

        <Link to={"/eggpage"}>
          <div className="card mb-3 p-2 border-0">
            <h4 className="card-header newHeader text-light text-center p-2 m-0">
              New Monster
              <br />
            </h4>
            <div className="card-body p-2">
              <img src={plus} alt="plus icon" className="plusImg" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
