import { useEffect, useState } from 'react';
import background1 from '../Images/background1.jpg';
import '../Style/ListPokemon.css';
import { PiCaretCircleLeftDuotone, PiCaretCircleRightDuotone } from 'react-icons/pi';
import { fetching } from '../Service/readPokemon';
import { useQuery } from 'react-query';

function DetailPokemon() {
    const storedItem = localStorage.getItem('selectedPokemon');
    const [selectedPokemon, setSelectedPokemon] = useState([])
    const nextId = selectedPokemon.id + 1;
    const prevId = selectedPokemon.id - 1;
    const [pokeAbility, setPokeAbility] = useState([]);
    const [hoveredPrev, setHoveredPrev] = useState(false)
    const [hoveredNext, setHoveredNext] = useState(false)
    const abilityUrl = selectedPokemon?.abilities?.[0].ability?.url
    const currentId = selectedPokemon.id

    const fetchAbility = async () => {
        if (abilityUrl) {
            try {
                const res = await fetching(abilityUrl);
                const results = res?.effect_entries?.[0]?.effect
                setPokeAbility(results);
            } catch (error) {
                console.error("Error fetching Pokemon data:", error);
            }
        }
    };

    const fetchPrevPokemon = async () => {
        if (prevId > 0) {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${prevId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch previous Pokemon');
                }
                const prevPoke = await response.json();
            } catch (error) {
                console.error("Error fetching previous Pokemon data:", error);
            }
        }
    };

    const fetchNextPokemon = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nextId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch next Pokemon');
            }
        } catch (error) {
            console.error("Error fetching next Pokemon data:", error);
        }
    };
    const { data: abilityData, isLoading: abilityIsLoading, error: abilityError } = useQuery(["pokemonAbility"], fetchAbility);
    const { data: prevPokemonData, isLoading: prevPokemonIsLoading, error: prevPokemonError } = useQuery(["prevPokemon"], fetchPrevPokemon);
    const { data: nextPokemonData, isLoading: nextPokemonIsLoading, error: nextPokemonError } = useQuery(["nextPokemon"], fetchNextPokemon);

    const ability1 = selectedPokemon?.abilities?.[0]?.ability?.name;
    const ability2 = selectedPokemon?.abilities?.[1]?.ability?.name;
    const type1 = selectedPokemon?.types?.[0]?.type?.name;
    const type2 = selectedPokemon?.types?.[1]?.type?.name;

    useEffect(() => {
        if (storedItem) {
            const selectedPokemon = JSON.parse(storedItem);
            setSelectedPokemon(selectedPokemon);
        }
    }, [storedItem]);

    return (
        <div className="App" style={{
            justifyContent: 'center', overflow: 'hidden'
        }}
        >
            <header style={{
                height: '150px', backgroundColor: 'white', overflow: 'hidden', gap: '10px', display: 'flex',
            }}>
                <div
                    onClick={() => {
                        const prev = currentId - 1
                        fetch(`https://pokeapi.co/api/v2/pokemon/${prev}`)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Failed to fetch previous Pokemon');
                                }
                                return response.json();
                            })
                            .then(prevPoke => {
                                setSelectedPokemon(prevPoke);
                            })
                            .catch(error => {
                                console.error("Error fetching previous Pokemon data:", error);
                            });
                        fetchAbility();
                        fetchPrevPokemon();

                    }}
                    onMouseEnter={() => { setHoveredPrev(true); }}
                    onMouseLeave={() => { setHoveredPrev(false); }}
                    style={{
                        cursor: hoveredPrev ? 'pointer' : 'none',
                        paddingTop: '20px', backgroundColor: hoveredPrev ? 'blue' : '#A4A4A4', height: '100px', width: '50%', display: 'flex', flexDirection: 'column-reverse', alignItems: 'flex-end'
                    }}>
                    <div style={{ backgroundColor: 'white', height: '50%', width: '60%', display: 'flex' }}>
                        <div ></div>
                        <div style={{ backgroundColor: 'white', height: '50px', width: '50px', transform: 'skew(-45deg)', marginLeft: '-25px' }}></div>
                    </div>
                    <div style={{
                        marginBottom: '20px',
                        height: '100%', width: '120%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <span style={{ display: 'flex', gap: '10px', fontSize: '20px', fontWeight: '700' }}>
                            {currentId <= 1 ? '' : <PiCaretCircleLeftDuotone size={30} color='white' />}

                            {currentId <= 1 ? '' : <label style={{ color: 'white', }}> #{prevId}</label>}
                        </span>
                    </div>
                </div>
                <div
                    onClick={() => {
                        const next = currentId + 1

                        fetch(`https://pokeapi.co/api/v2/pokemon/${next}`)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Failed to fetch previous Pokemon');
                                }
                                return response.json();
                            })
                            .then(nextPoke => {
                                setSelectedPokemon(nextPoke);
                            })
                            .catch(error => {
                                console.error("Error fetching previous Pokemon data:", error);
                            });
                        fetchAbility();
                        fetchNextPokemon();



                    }}
                    onMouseEnter={() => { setHoveredNext(true); }}
                    onMouseLeave={() => { setHoveredNext(false); }}
                    style={{
                        cursor: hoveredNext ? 'pointer' : 'none',
                        paddingTop: '20px', backgroundColor: hoveredNext ? 'blue' : '#A4A4A4',
                        height: '100px', width: '50%', display: 'flex', flexDirection: 'column-reverse', alignItems: 'flex-start'
                    }}>


                    <div style={{ backgroundColor: 'white', height: '50%', width: '60%', display: 'flex', flexDirection: 'row-reverse' }}>
                        <div ></div>
                        <div style={{ backgroundColor: 'white', height: '50px', width: '50px', transform: 'skew(45deg)', marginRight: '-25px' }}></div>
                    </div>
                    <div style={{
                        marginBottom: '20px',
                        height: '100%', width: '120%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>

                        <span style={{ display: 'flex', gap: '10px', fontSize: '20px', fontWeight: '700', alignItems: 'center', justifyContent: 'center' }}>
                            <label style={{ color: 'white', }}>#{nextId}</label>
                            <PiCaretCircleRightDuotone size={30} color='white' />
                        </span>
                    </div>

                </div>
            </header >
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-70px', marginBottom: '10px' }}
            >
                <label style={{ color: '#212121', fontSize: '24px', padding: '20px', fontWeight: '500' }}>
                    {selectedPokemon?.name?.toUpperCase()}
                </label>
                <label style={{ color: '#616161', fontSize: '24px', padding: '20px 0px', fontWeight: '500' }}>
                    #{currentId}
                </label>
            </div>
            <div style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${background1})`,
                paadingBottom: '10px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <div style={{

                        gap: '10px', display: 'flex', backgroundColor: 'white', minHeight: '100px', width: '880px', padding: '0px 10px', marginTop: '0px'
                    }}>

                        <div style={{ width: '50%', height: '430px', backgroundColor: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <img src={selectedPokemon?.sprites?.other?.dream_world?.front_default} alt={selectedPokemon.name} style={{
                                width: '100%', height: '80%', objectFit: 'contain',
                                imageRendering: 'pixelated'
                            }} />

                        </div>
                        <div style={{ height: 'fitcontent', textAlign: 'left', width: '50%', backgroundColor: '#FFF', flexDirection: 'column', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', }}>
                            <div style={{ padding: '10px', fontSize: "18px", fontWeight: '500' }} >
                                {pokeAbility}
                            </div>
                            <div style={{ flexDirection: 'row', display: "flex", minHeight: '300px', minWidth: '100%', backgroundColor: '#30A7D7', borderRadius: '10px', }}>
                                <div style={{ gap: "30px", display: 'flex', flexDirection: 'column', width: '30%', padding: '20px' }}>
                                    <div style={{ width: '50%', display: 'flex', flexDirection: "column" }}>
                                        <label style={{ fontSize: '20px', color: 'white', fontWeight: '500' }}>Height</label>
                                        <label style={{ fontSize: '20px', color: '#212121', fontWeight: '500' }}>{selectedPokemon?.height}</label>
                                    </div>
                                    <div style={{ width: '50%', display: 'flex', flexDirection: "column" }}>
                                        <label style={{ fontSize: '20px', color: 'white', fontWeight: '500' }}>Weight</label>
                                        <label style={{ fontSize: '20px', color: '#212121', fontWeight: '500' }}>{selectedPokemon?.weight}</label>
                                    </div>
                                </div>
                                <div style={{ gap: "30px", display: 'flex', flexDirection: 'column', width: '50%', padding: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: "column" }}>
                                        <label style={{ fontSize: '20px', color: 'white', fontWeight: '500' }}>Category</label>
                                        <label style={{ fontSize: '20px', color: '#212121', fontWeight: '500' }}>Mouse</label>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: "column" }}>
                                        <label style={{ fontSize: '20px', color: 'white', fontWeight: '500' }}>Abilities</label>
                                        <label style={{ fontSize: '20px', color: '#212121', fontWeight: '500' }}>
                                            +{ability1}
                                        </label>
                                        <label style={{ fontSize: '20px', color: '#212121', fontWeight: '500' }}>
                                            +{ability2}
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div style={{
                        gap: '10px', display: 'flex', backgroundColor: 'white', minHeight: '100px', width: '880px', padding: '10px 10px', marginTop: '0px', marginBottom: '30px', borderRadius: '0px  0px 10px 10px'
                    }}>
                        <div style={{
                            borderRadius: '10px',
                            height: 'fit-content',
                            padding: '20px', width: '45%', backgroundColor: '#F2F2F2', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
                        }}>
                            <label>Stats</label>
                            <div style={{ display: 'flex', flexDirection: 'row', fontSize: '12px', marginTop: '20px' }}>
                                <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                    <li style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '5px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <span style={{ border: "1px solid grey", width: '50px', height: '10px', backgroundColor: 'white', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'white', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'white', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'white', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'white', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', height: '32px' }}>HP</span>
                                        </div>
                                    </li>
                                </ul>
                                <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                    <li style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '5px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ border: "1px solid grey", width: '50px', height: '10px', backgroundColor: 'white', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'white', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'white', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', height: '32px' }}>Attack</span>
                                        </div>
                                    </li>
                                </ul>
                                <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                    <li style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '5px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>

                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'white', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'white', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'white', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', height: '32px' }}>Defense</span>
                                        </div>
                                    </li>
                                </ul>
                                <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                    <li style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '5px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'white', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', height: '32px' }}>Special Attack</span>
                                        </div>
                                    </li>
                                </ul>
                                <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                    <li style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '5px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'white', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'white', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', height: '32px' }}>Special Defence</span>
                                        </div>
                                    </li>
                                </ul>
                                <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                    <li style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '5px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'white', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'white', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'white', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', border: "1px solid grey", height: '10px', backgroundColor: 'blue', marginRight: '10px' }}></span>
                                            <span style={{ width: '50px', height: '32px' }}>Speed</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div style={{ textAlign: 'left', width: '50%', backgroundColor: '#FFF', flexDirection: 'column', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                            <div style={{ flexDirection: 'row', display: "flex", minHeight: '300px', minWidth: '100%', borderRadius: '10px', }}>
                                <div style={{ gap: "20px", display: 'flex', flexDirection: 'column', width: '50%', padding: '20px' }}>

                                    <div style={{
                                        width: '50%',
                                        display: 'flex',
                                        flexDirection: "column"
                                    }}>
                                        <label style={{
                                            fontSize: '20px',
                                            color: '#212121',
                                            fontWeight: '500', whiteSpace: 'nowrap'
                                        }}>Type / Species</label>
                                        <label style={{
                                            fontSize: '16px',
                                            color: '#212121',
                                            fontWeight: '500'
                                        }}>  </label>
                                        <div style={{ display: 'flex', gap: '10px' }} >
                                            <div style={{
                                                textAlign: 'center',
                                                width: 'auto',
                                                padding: '10px',
                                                color: '#212121',
                                                marginTop: '10px',
                                                borderRadius: '10px',
                                                fontWeight: '500',
                                                background: 'rgba(255, 255, 0, 0.5)',
                                                backgroundImage:
                                                    type1 === 'grass' ? 'linear-gradient(to bottom, rgba(0, 255, 0, 0.5), rgba(0, 128, 0, 0.5))' :
                                                        type1 === 'poison' ? 'linear-gradient(to bottom, rgba(128, 0, 128, 0.5), rgba(255, 0, 255, 0.5))' :
                                                            'linear-gradient(to bottom, rgba(255, 255, 0, 0.5) 50%, rgba(255, 165, 0, 0.5) 50%)'
                                            }}>
                                                {type1}
                                            </div>
                                            <div style={{
                                                textAlign: 'center',
                                                width: 'auto',
                                                padding: '10px',
                                                color: '#212121',
                                                marginTop: '10px',
                                                borderRadius: '10px',
                                                fontWeight: '500',
                                                background: 'rgba(255, 255, 0, 0.5)',
                                                backgroundImage:
                                                    type2 === 'grass' ? 'linear-gradient(to bottom, rgba(0, 255, 0, 0.5), rgba(0, 128, 0, 0.5))' :
                                                        type2 === 'poison' ? 'linear-gradient(to bottom, rgba(128, 0, 128, 0.5), rgba(255, 0, 255, 0.5))' :
                                                            'linear-gradient(to bottom, rgba(255, 255, 0, 0.5) 50%, rgba(255, 165, 0, 0.5) 50%)'
                                            }}>
                                                {type2}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ width: '50%', display: 'flex', flexDirection: "column" }}>
                                        <label style={{ fontSize: '20px', color: '#212121', fontWeight: '500' }}>Weakness</label>
                                        <div style={{
                                            fontWeight: '500',
                                            textAlign: 'center',
                                            width: 'auto',
                                            padding: '5px',
                                            color: '#212121',
                                            marginTop: '10px',
                                            borderRadius: '10px',
                                            background: 'linear-gradient(to bottom, rgba(255, 255, 0, 0.5) 50%, rgba(128, 0, 128, 0.5) 50%)'
                                        }}>Ground</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default DetailPokemon;
