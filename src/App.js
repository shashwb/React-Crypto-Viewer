import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
var NumberFormat = require('react-number-format');


class App extends Component {

  //we need a constructor to pass in our props...
  //this will construct the component from any props that are inherited
  constructor(props) {
    super(props);
    this.state = {
      //defined a 'cryptos' property which will hold the response
      //data from the api
      cryptos: [],
    }
  }

  componentDidMount() {
    //once the app is renderred onto the DOM, we need to send the get request here
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT&tsyms=USD')
      .then(res => {
        const cryptos = res.data;
        console.log('cryptos status', cryptos);
        // set the state based on what is returned by the get request
        this.setState({ cryptos: cryptos });
      })
  }

// .map is used for iterating over an object...
  render() {
    return (
      <div className='App'>
        { Object.keys(this.state.cryptos).map((key) => (
          <div id='crypto-container'>
            <span className='left'>{key}</span>
            <NumberFormat className='right' value={this.state.cryptos[key].USD} displayType={'text'} decimalPrecision={2} thousandSeparator={true} prefix={'$'} />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
