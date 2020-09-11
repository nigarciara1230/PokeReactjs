import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
    render(){
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                    <Link to={`/`}>
                    <a className="navbar-brand col-sm-3 col-md-2 mr-0 aligin-items-center">POKEMON PRIMERA GENERACION</a>
                    </Link>
                </nav>
            </div>
        );
    }
}