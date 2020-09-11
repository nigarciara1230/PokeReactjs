import React, { Component } from 'react';
import Pokemon from './../Pokemones/Pokemon';

export default class Dash extends Component {
    render(){
        return (
            <div className="row">
                <div className="col">
                    <Pokemon />
                </div>
            </div>
        );
    }
}