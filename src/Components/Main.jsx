import React, {  useState } from "react";
import { useEffect } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";

const Main =()=>{

    const [allPokemons, setAllPokemons]=useState([]);
    const [loading, setLoading]=useState(true);
    const [url, setUrl]=useState("https://pokeapi.co/api/v2/pokemon/?limit=10")
    const [nextUrl, setNextUrl]=useState()
    const [prevUrl, setPrevUrl]=useState()
    const [pokeDex, setPokeDex]=useState()

    const pokeFun =async()=>{
        setLoading(true)
        const res=await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results)
        setLoading(false);
    }
    const getPokemon=async(res)=>{
        res.map(async(item)=>{
            const result=await axios.get(item.url)
            setAllPokemons(state=>{
                state=[...state,result.data]
                state.sort((a,b)=>a.id>b.id?1:-1)
                return state;
            })
            
        })
    }

    const setPaginate = (url)=>{
        setAllPokemons([])
        setUrl(url)
    }
    
    useEffect(()=>{
        pokeFun();
    },[url])
    return(
        <>

            <div className="container">
                <div className="left-content">
                    <Card pokemon={allPokemons} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>


                    <div className="btn-group">
                        {prevUrl && <button onClick={()=>{
                            setPaginate(prevUrl)
                        }}>Previous</button>}
                        {
                            nextUrl && <button onClick={()=>{
                                setPaginate(nextUrl)
                            }}>Next</button>
                        }
                    </div>
                </div>
                <div className="right-content">
                    <Pokeinfo data={pokeDex}/>
                </div>
            </div>
        </>
    )
}

export default Main;