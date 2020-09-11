import React, { Component } from 'react';
import axios from 'axios';

import PokemonCard from './PokemonCard';

export default class Pokemon extends Component {
    state= {
        url: "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0",
        pokemon: null
    };

    async componentDidMount(){
        const res = await axios.get(this.state.url);
        this.setState({ pokemon : res.data['results']});
    } 

    render(){
        return (
            <React.Fragment>
                { this.state.pokemon ? (
                    <div className="row">
                        {this.state.pokemon.map(pokemon => (
                            <PokemonCard 
                                name={pokemon.name}
                                url={pokemon.url}
                            />
                        ))}
                    </div>
                ) : (
                    <h3>Cargando Pokemones</h3>
                )}
            </React.Fragment>
        );
    }
}

/*
import React, { Component } from 'react';


export default class Pokemon extends Component {
    render(){
        return (
            <div>
                
            </div>
        );
    }
}
*/