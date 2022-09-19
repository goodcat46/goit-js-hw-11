'use strict';
import axios from 'axios';
// https://pixabay.com/api/?key=30018207-f47008a7d6e426100d6765bad&q=yellow+flowers&image_type=photo
export class PixabayApi {
  #BASE_URL = 'https://pixabay.com';
  #API_KEY = '30018207-f47008a7d6e426100d6765bad';

  constructor() {
    this.page = null;
    this.searchQuery = '';
    this.per_page = 40;
  }

  fetchPhotosByQuery() {
    const searchParams = {
      q: this.searchQuery,
      page: this.page,
      per_page: this.per_page,
      image_type: 'photo',
      safesearch: true,
      orientation: 'horizontal',
      key: this.#API_KEY,
    };

    return axios.get(`${this.#BASE_URL}/api/`, { params: searchParams });
  }

}
