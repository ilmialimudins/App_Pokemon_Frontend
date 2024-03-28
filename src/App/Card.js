import React, { useState } from "react";

const Card = ({ pokemon, loading, infoPokemon }) => {
    const [selectedCardId, setSelectedCardId] = useState(null);
    const handleCardHover = (itemId) => {
        setSelectedCardId(itemId);
    };
    const handleCardClick = async (item) => {
        infoPokemon(item);
        window.location.href = `/detail/${item.id}`;
        localStorage.setItem('selectedPokemon', JSON.stringify(item));
    };

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    padding: '20px 0px'
                }}>
                {loading ?
                    <h1 src='https://loading.io/asset/721565' >Loading...</h1>
                    : pokemon.map((item) => (
                        <div key={item.id}
                            onMouseEnter={() => handleCardHover(item.id)}
                            onMouseLeave={() => setSelectedCardId(null)}
                            onClick={() => handleCardClick(item)}
                            style={{
                                padding: '10px',
                                background: selectedCardId === item.id ? 'linear-gradient(to bottom, #bdc3c7, #2c3e50)' : 'rgba(0, 0, 0, 0.3)',
                                borderRadius: '25%',
                                width: 'calc(30% - 20px)',
                                margin: '10px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'transform 0.3s',
                                transform: selectedCardId === item.id ? 'scale(1.1)' : 'scale(1)',
                                imageRendering: 'pixelated'
                            }} >
                            <img style={{ backgroundColor: 'grey', borderRadius: '50%' }} src={item.sprites.front_default} alt="" />
                            <h2
                                style={{ color: 'white', textShadow: '0 0 5px blue' }}
                            >{item.name}</h2>
                        </div>
                    ))}
            </div>
        </>
    )
}

export default Card;