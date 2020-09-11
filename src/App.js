import React from 'react';
import NavBar from './Components/Layout/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import Dash from './Components/Layout/Dash';
import backgroundI from './assets/download.png';
import PokemonId from './Components/Pokemones/PokemonId';

function App() {
  return (
    <Router>
      <div className="App" style={{background: `url(${backgroundI})`}}>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dash} />
            <Route exact path="/Pokemon/:pkIndex" component={PokemonId} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
