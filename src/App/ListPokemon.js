import pokemonHeader from '../Images/Pokemon-Trading-Cards-Game.avif';
import '../Style/ListPokemon.css';
import { RiArrowLeftSLine, RiArrowRightSLine, RiSearchLine } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';
import { fetching } from '../Service/readPokemon';
import { useQueryClient } from 'react-query';
import Card from "./Card";

function ListPokemon() {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0/");
    const [, setPokeDex] = useState();
    const [searchPoke, setSearchPoke] = useState('')
    const [filterPoke, ] = useState([])
    const queryClient = useQueryClient();
    const [hoveredPrev, setHoveredPrev] = useState(false)
    const [hoveredNext, setHoveredNext] = useState(false)
    const [currentAPI, setCurrentApi] = useState([])


    const fetchPokemonData = async () => {
        setLoading(true);
        try {
            const res = await fetching(url);
            const results = res.results;
            setCurrentApi(res)
            const pokemonData = await Promise.all(results.map(async (item) => {
                const result = await fetching(item.url);
                return result;
            }));
            setPokeData(pokemonData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (searchPoke) {
            setLoading(true);
            let url = '';

            if (searchPoke.trim() === '') {
                url = 'https://pokeapi.co/api/v2/pokemon/';


            } else {
                url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0/`;
            }

            try {
                const res = await fetching(url);
                const results = res.results;

                if (searchPoke.trim() !== '') {
                    const pokemonData = await Promise.all(results.map(async (item) => {
                        const result = await fetching(item.url);
                        return result;
                    }));
                    const filteredPokeData = pokemonData.filter((poke) => poke.name.toLowerCase().includes(searchPoke.toLowerCase()));
                    setPokeData(filteredPokeData);
                } else {
                    setPokeData(results);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching Pokemon data:", error);
                setLoading(false);
            }
        } else {
            queryClient.invalidateQueries("pokemonData");
        }
    }

    useEffect(() => {
        fetchPokemonData()
    }, [url]);
    return (
        <div className="App" style={{ overflow: 'hidden' }}>
            <header style={{ padding: '100px', overflow: "hidden", marginTop: '-100px', backgroundImage: `url(${pokemonHeader})`, width: '100%', backgroundSize: 'center', backgroundPosition: 'center', height: '400px' }}>
            </header>

            <div style={{ backgroundColor: '#313131', height: '200px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ gap: "20px", display: 'flex', width: '80%', alignItems: 'center', height: '100%' }}>
                    <div style={{ width: "50%", height: '70%', display: 'flex', flexDirection: 'column' }}>
                        <label style={{ display: 'flex', alignItems: 'center', height: ' 40px', fontSize: '26px', fontWeight: '500', fontFamily: 'monospace', color: 'white' }}>
                            Name or Number
                        </label>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <input style={{ width: '440px', height: '40px' }}
                                value={searchPoke}
                                onChange={(e) => {
                                    setSearchPoke(e.target.value);
                                }}
                            />
                            <div
                                onClick={handleSearch}
                                type='submit' id='search' style={{ backgroundColor: '#EE6B2F', borderRadius: '10px', width: '55px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <RiSearchLine style={{ color: 'white' }}
                                />
                            </div>
                        </div>
                        <label style={{ color: 'white', marginRight: '10px', marginTop: '10px' }}>
                            Use the Advanced Search to explore Pokémon by type, weakness, Ability, and more!
                        </label>
                    </div>
                    <div style={{ width: "50%", height: '100%', display: 'flex', alignItems: 'center' }}>
                        <div style={{ textAlign: 'center', color: 'white', fontSize: '20px', padding: "15px 10px", display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'green', marginBottom: '45px', borderRadius: '8px' }}>
                            Search for a Pokémon by name or using its National Pokédex number.
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ backgroundColor: '#525252', justifyContent: 'center', alignItems: 'center', }}>
                <Card pokemon={filterPoke.length === 0 ? pokeData : filterPoke} loading={loading}
                    infoPokemon={poke => setPokeDex(poke)}
                />
            </div>
            <div style={{ position: 'fixed', top: '50%', left: '10px', transform: 'translateY(-50%)', zIndex: '999' }}>
                <div
                    onMouseEnter={() => { setHoveredPrev(true); }}
                    onMouseLeave={() => { setHoveredPrev(false); }}
                    onClick={async () => {
                        if (currentAPI.previous && currentAPI.previous !== 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0/') {
                            setUrl(currentAPI.previous);
                        }
                    }}
                    style={{ cursor: 'pointer', padding: '10px', borderRadius: '50%', backgroundColor: hoveredPrev ? 'blue' : 'rgba(255, 255, 255, 0.5)' }}
                >
                    <RiArrowLeftSLine style={{ fontSize: '24px', color: 'white' }} />
                </div>
            </div>
            <div style={{ position: 'fixed', top: '50%', right: '10px', transform: 'translateY(-50%)', zIndex: '999' }}>
                <div
                    onMouseEnter={() => { setHoveredNext(true); }}
                    onMouseLeave={() => { setHoveredNext(false); }}
                    onClick={async () => {
                        setUrl(currentAPI.next);
                        await fetchPokemonData();
                    }}
                    style={{ cursor: 'pointer', padding: '10px', borderRadius: '50%', backgroundColor: hoveredNext ? 'blue' : 'rgba(255, 255, 255, 0.5)' }}
                >
                    <RiArrowRightSLine style={{ fontSize: '24px', color: 'white' }} />
                </div>
            </div>
        </div>

    );
}


export default ListPokemon;
