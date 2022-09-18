'use strict';

export class JsonCountriesApi {
  #BASE_URL = 'https://restcountries.com';

  constructor() {
    this.name = null;
    this.searchQuery = '';
  }

  fetchCountries() {
    return fetch(`${this.#BASE_URL}/v3.1/name/${this.name}?fields=name,capital,population,flags,languages`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })

  }
}
