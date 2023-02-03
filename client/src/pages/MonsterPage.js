import React, { useState } from "react";
import { UPDATE_MONSTER, REMOVE_MONSTER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import ben from "./assets/ben.gif";
import { useParams } from "react-router-dom";
import { QUERY_SINGLE_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
// import beachy from "./assets/beachy.jpg"
// import safari from "./assets/safari.jpg"
// import jungle from "./assets/jungle.jpg"

export default function MonsterPage() {

    const tokenTest = Auth.getProfile();
    const userId = tokenTest.data._id;
    const { loading, error, data } = useQuery(QUERY_SINGLE_USER, {
        variables: { _id: userId },
    });
    const monsters = data?.user.monsters || [];
    const { monsterId } = useParams();

    // const getBiome = () => {
    //     for (let i = 0; i < monsters.length; i++) {
    //         const monster = monsters[i];
    //         if (monster._id === monsterId) {
    //             switch (monster.imageUrl) {
    //                 case "wavy":
    //                     return beachy;
    //                     break;
    //                 case "beety":
    //                     return jungle;
    //                     break;
    //                 case "volma":
    //                     return safari;
    //                     break;
    //                 case "ben":
    //                     return safari;
    //                     break;
    //                 case "iceabella":
    //                     return beachy;
    //                     break;
    //                 case "frower":
    //                     return jungle;
    //                     break;
    //                 default:
    //                     return safari;
    //                     break;
    //             }
    //         }
    //         return "no biome"
    //     }
    // }


    // const getBiome = (monster) => {
    //     console.log(monster._id, monsterId)
    //     if (monster._id === monsterId) {
    //         switch (monster.imageUrl) {
    //             case "wavy":
    //                 return beachy;
    //                 break;
    //             case "beety":
    //                 return jungle;
    //                 break;
    //             case "volma":
    //                 return safari;
    //                 break;
    //             case "ben":
    //                 return safari;
    //                 break;
    //             case "iceabella":
    //                 return beachy;
    //                 break;
    //             case "frower":
    //                 return jungle;
    //                 break;
    //             default:
    //                 return safari;
    //                 break;
    //         }
    //     }
    //     return "no biome"
    // }

    return (
        <section className="container-fluid">
            <img src={ben} alt="Ben Gif" />
            <button>FEED MONSTER</button>
            <button>DANCE!!!</button>
            <button>GO TO SLEEP</button>
        </section>
        <div>
            <h1>MONSTER PAGE</h1>
            {/* <img src={getBiome} alt="biome background" /> */}
            <p></p>
        </div>
    )
}