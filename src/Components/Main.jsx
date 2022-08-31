import React, { useEffect, useState } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";

const Main =()=>{
    const [pokeData, setPokeData]=useState([]);
    const [loading, setLoading]=useState(true);
    const [url, setUrl]=useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl, setNextUrl]=useState()
    const [prevUrl, setPrevUrl]=useState()

    const pokeFun =async()=>{
        setLoading(true)
        const res=await axios.get(url);
       /*  console.log(res.data.results) */
       setNextUrl(res.data.next);
       setPrevUrl(res.data.previous);
       getPokemon(res.data.results);
       setLoading(false);
    }
    const getPokemon=async(res)=>
        res.map(async(item)=>{
            const result= await axios.get(item.url) 
            /* console.log(result.data) */
            setPokeData(state=>{
                state=[...state,result.data]
                return state;
            })
        })
    useEffect(()=>{
        pokeFun();
    },[url] )
    return(
        <>
            <div className="container">
                <div className="left-content">
                    <Card pokemon={pokeData} loading={loading}/>
                   
                    
                   
                    <div className="btn-group">
                        <button>Previous</button>
                        <button>Previous</button>
                    </div>
                    
                </div>
                <div className="right-content">
                    <Pokeinfo/>

                </div>

            </div>
        </>
    )
}

export default Main;