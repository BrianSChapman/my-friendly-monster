import React, { useState } from "react";
import { UPDATE_MONSTER, REMOVE_MONSTER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import ben from "./assets/ben.gif";

export default function MonsterPage() {
    return (
        <section className="container-fluid">
            <img src={ben} alt="Ben Gif" />
            <button>FEED MONSTER</button>
            <button>DANCE!!!</button>
            <button>GO TO SLEEP</button>
        </section>
    )
}