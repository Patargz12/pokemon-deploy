"use client"
import { useEffect, useState } from "react"
import axios from "axios";


export default function PokemonCard( {pokemon, isCorrect}) {
    const [data,setData] = useState({});

    useEffect(() => {
        try{
            const fetchData = async () => {
                if (!pokemon) return
                const result = await axios.get(pokemon?.url); 
                setData(result.data);
            };
            fetchData(); 
        } catch (error) {
            console.log(error);
        }
    }, [pokemon]);
    
    
    return (
<div className="card">
  {data?.sprites?.front_default ? (
    <img
      src={data.sprites.front_default}
      alt="Pokemon Image"
      className={isCorrect ? "card__img--correct" : "card__img--incorrect"}
      style={{ marginTop: "50px" }}
    />
  ) : (
    <img
      src="/images/loading_screen.gif"
      alt="Loading Screen"
      style={{ marginTop: "50px" }}
      className="loading-screen-reset" // Apply a custom class to reset CSS properties
    />
  )}
</div>

    );
}