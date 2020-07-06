import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Cards, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api/index';

// TODO: Ver component willMount unMount leak de memoria
// TODO: Agregar mas lista paises abajo (top tiers)
// TODO: Ver si se puede pasar data como data.cosas y no como data: { Globals: { ... } y Date: { ... } }
// ! Too many request FIX.

export default class App extends Component {
  _isMount = false;
  state = {
    data: {},
    country: '',
  };

  async componentDidMount() {
    this._isMount = true;
    if (this._isMount) {
      const fetchedData = await fetchData();
      console.log(fetchedData);
      this.setState({ data: fetchedData });
    }
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    console.log(fetchedData);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data } = this.state;
    return (
      <Route
        exact
        path="/"
        render={() => (
          <div className={styles.container}>
            <Cards data={data} />
            <CountryPicker handleCountryChange={this.handleCountryChange} />
            <div className={styles.source}>
              <h5>Developed by: Aakanksha Khatri</h5>
              <a href="https://www.linkedin.com/in/aakanksha-khatri-11b6241a4/">LinkedIn </a> | 
              <a href="https://github.com/aakanksha04 ">GitHub </a>
            </div>
          </div>
        )}
      />
    );
  }
}
