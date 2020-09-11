import React, { Component } from 'react';
import axios from 'axios';

const TYPE_COLORS ={
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B8A156',
    steel: 'B5B5C3',
    water: '3295F6'
};

export default class PokemonId extends Component {
    state = {
        name:'',
        pkIndex:'',
        img:'',
        types:[],
        description:'',
        stats:{
            hp:"",
            attack:"",
            defense:"",
            speed:"",
            specialAttack:"",
            specialDefense:""
        },
        height:'',
        weight:'',
        eggGroups:'',
        abilities:'',
        genderRatioFemale:"",
        evs:'',
        hatchSteps:''
    };

    async componentDidMount(){
        const { pkIndex }= this.props.match.params;

        const pkUrl =`https://pokeapi.co/api/v2/pokemon/${pkIndex}/`;
        const spUrl = `https://pokeapi.co/api/v2/pokemon-species/${pkIndex}/`;

        const pokemonRes = await axios.get(pkUrl);

        const name = pokemonRes.data.name.toLowerCase().split(" ").map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join(' ');
        const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkIndex}.png`;

        let {hp, attack, defense, speed, specialAttack, specialDefense} = '';

        pokemonRes.data.stats.map(stat =>{
            switch(stat.stat.name){
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat'];
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat'];
                    break;
                default:
                    hp='';
            }
            return stat;
        });

        const height = Math.round(pokemonRes.data.height) /10; //metros

        const weight = Math.round(pokemonRes.data.weight /10); //Kg

        const types = pokemonRes.data.types.map(type => type.type.name);

        const abilities = pokemonRes.data.abilities.map(ability => {
            return ability.ability.name.toLowerCase().split("-").map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        });

        const evs = pokemonRes.data.stats
        .filter(stat => {
            if (stat.effort > 0){
                return true;
            }
                return false;
        }).map(stat => {
            return `${stat.effort} ${stat.stat.name}`
            .toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        }).join(', ');

        await axios.get(spUrl).then(res => {
            let description = '';
            res.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'es'){
                    description = flavor.flavor_text;
                }
                return flavor;
            });
            
            const femaleRate = res.data['gender_rate'];
            const genderRatioFemale = 12.5 * femaleRate;
            const genderRatioMale = 12.5 * (8-femaleRate);

            const cathRate = Math.round((100/255)* res.data['capture_rate']); //%

            const eggGroups = res.data['egg_groups'].map(group => {
                return group.name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' '); 
            }).join(', ');

            const hatchSteps = 255* (res.data['hatch_counter'] + 1);

            this.setState({
                description,
                genderRatioFemale,
                genderRatioMale,
                cathRate,
                eggGroups,
                hatchSteps
            });
        });

        
        this.setState({
            name,
            pkIndex,
            img,
            types,
            stats:{
                hp,
                attack,
                defense,
                speed,
                specialAttack,
                specialDefense
            },
            height,
            weight,
            abilities,
            evs
        });
    }
    render(){
        return (
            <div className="col">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                          <div className="col-5">
                            <h6>{this.state.pkIndex}</h6>
                          </div>
                          <div className="col-7">
                                <div className="float-rigth">
                                    {this.state.types.map(type => (
                                        <span 
                                            key={type} 
                                            className="badge badge-primary badge-pill mr-1"
                                            style={{backgroundColor: `#${TYPE_COLORS[type]}`,
                                            color: 'white'
                                        }} 
                                        >
                                            {type.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                                        </span>
                                    ))}
                                </div>
                          </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row aling-items-center">
                            <div className="col-md-3">
                                <img role="banner" alt="" src={this.state.img} className="card-img-top rounder mx-auto mt-2"/>
                            </div>
                            <div className="col-md-9">
                                <h5 className="mx-auto">
                                    {this.state.name.toLowerCase().split(" ").map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join(' ')}
                                </h5>
                                <div className="row aling-items-center">
                                    <div className="col-12 col-md-3">
                                        HP 
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div  className="progress-bar" role="progressbar" style={{ width: `${this.state.stats.hp}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                <span>{this.state.stats.hp}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row aling-items-center">
                                    <div className="col-12 col-md-3">
                                        ATAQUE 
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: `${this.state.stats.attack}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                <span>{this.state.stats.attack}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row aling-items-center">
                                    <div className="col-12 col-md-3">
                                        DEFENSA
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: `${this.state.stats.defense}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                <span>{this.state.stats.defense}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row aling-items-center">
                                    <div className="col-12 col-md-3">
                                        VELOCIDAD 
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: `${this.state.stats.speed}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                <span>{this.state.stats.speed}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row aling-items-center">
                                    <div className="col-12 col-md-3">
                                        ATAQUES ESPECIALES
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: `${this.state.stats.specialAttack}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                <span>{this.state.stats.specialAttack}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row aling-items-center">
                                    <div className="col-12 col-md-3">
                                        DEFENSAS ESPECIALES 
                                    </div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: `${this.state.stats.specialDefense}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                <span>{this.state.stats.specialDefense}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-1">
                                <div className="col">
                                    <p className="p-2 ">
                                        {this.state.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="card-body">
                        <h5 className="card-title text-center">Perfil:</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <h6 className="float-rigth">Altura: </h6>
                            </div>
                            <div className="col-md-6">
                                <h6 className="float-left">{this.state.height} [m]</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h6 className="float-rigth">Peso: </h6>
                            </div>
                            <div className="col-md-6">
                                <h6 className="float-left">{this.state.weight} [Kg]</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h6 className="float-rigth">Posibilidad de atraparlo: </h6>
                            </div>
                            <div className="col-md-6">
                                <h6 className="float-left">{this.state.cathRate} [%]</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h6 className="float-rigth">Proporcion de Genero: </h6>
                            </div>
                            <div className="col-md-6">
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style={{ width: `${this.state.genderRatioFemale}%` , backgroundColor:'#FA299E'}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
                                        <span>{this.state.genderRatioFemale}</span>
                                    </div>
                                    <div className="progress-bar" role="progressbar" style={{ width: `${this.state.genderRatioMale}%`, backgroundColor:'primary'}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">
                                        <span>{this.state.genderRatioMale}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h6 className="float-rigth">Huevos Grupo: </h6>
                            </div>
                            <div className="col-md-6">
                                <h6 className="float-left">{this.state.eggGroups} </h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h6 className="float-rigth">Pasos de Eclosión Huevos: </h6>
                            </div>
                            <div className="col-md-6">
                                <h6 className="float-left">{this.state.hatchSteps} </h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h6 className="float-rigth">Habilidades: </h6>
                            </div>
                            <div className="col-md-6">
                                <h6 className="float-left">{this.state.abilities} </h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <h6 className="float-rigth">EV's: </h6>
                            </div>
                            <div className="col-md-6">
                                <h6 className="float-left">{this.state.evs} </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}