import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Sprite = styled.img`
    width: 6em;
    heigth: 6em;
`;

const Card = styled.div`
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25 1);
    &:hover{
        box-shadow: 0 14px 28px rgba(0,0,0,025), 0 10px 10px rgba(0,0,0,0.22);
    }
`;


export default class PokemonCard extends Component {
    state= {
        name: '',
        img:'',
        pkIndex: '',
        imageLoading: true,
        toManyRequests: false
    };

    componentDidMount(){
        //const { name, url } = this.props;
        const name = this.props.name;
        const url = this.props.url
        const pkIndex = url.split('/')[url.split('/').length - 2];
        const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkIndex}.png`;

        this.setState({
            name,
            img,
            pkIndex 
        });
    }

    render(){
        

        return (
            <div className="col-md-3 col-sm-6 nb-5">
                <Link to={`pokemon/${this.state.pkIndex}`}>
                    <Card className="card">
                        <h4 className="card-header">
                            {this.state.pkIndex} {".  "}
                            {this.state.name.toLowerCase().split(" ").map(letter => letter.charAt(0).toUpperCase() + letter.substring(1)).join(' ')}
                        </h4>  
                        <Sprite 
                            className="card-img-top rounded mx-auto mt-2" src={this.state.img}
                            onLoad={() => this.setState({ imageLoading: false})}
                            onError={() => this.setState({toManyRequests: true})}    
                        /> 
                    </Card> 
                </Link>               
            </div>
        );
    }
}

//https://www.youtube.com/watch?v=XehSJF85F38