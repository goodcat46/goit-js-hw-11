import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import Handlebars from 'handlebars';
import list from './list.hbs';
import card from './card.hbs';
// import axios from "axios";
// axios.get('/users')
//   .then(res => {
//     console.log(res.data);
//   });

import './css/styles.css';
import { JsonCountriesApi } from './jsonCountryApi';

const DEBOUNCE_DELAY = 300;
const refs = {
  inputEl: document.querySelector('#search-box'),
  listEl: document.querySelector('.country-list'),
  infoEl: document.querySelector('.country-info'),
};
const serchCountryByName = new JsonCountriesApi();

refs.inputEl.addEventListener(
  'input',
  debounce(event => {
    let countryName = event.target.value;
    if (countryName.trim() === '') {
      refs.listEl.innerHTML = '';
      refs.infoEl.innerHTML = '';
      refs.listEl.classList.remove('box-shadow');
      refs.infoEl.classList.remove('box-shadow');
      Notiflix.Notify.failure('Please enter the country name');
      return;
    } else {
      console.log('Пошук країни:', countryName.trim());
      serchCountryByName.name = countryName.trim();

      serchCountryByName
        .fetchCountries()
        .then(data => {
          let { name, capital, population, flags, languages } = data[0];
          let contryObj = {
            name,
            capital,
            population,
            flag: flags.svg,
            langList: Object.values(languages).join(''),
          };
          if (data.length > 10) {
            Notiflix.Notify.failure('Please enter the country name currently');
            console.log('Ввведіть назву країни детальніше');
            return;
          } else if (data.length === 1) {
            refs.listEl.innerHTML = '';
            refs.infoEl.classList.add('box-shadow');
            refs.listEl.classList.remove('box-shadow');
            refs.infoEl.innerHTML = card(contryObj);
            console.log(data[0]);
            return;
          } else {
            refs.infoEl.innerHTML = '';
            refs.infoEl.classList.remove('box-shadow');
            refs.listEl.classList.add('box-shadow');
            refs.listEl.innerHTML = list(data);
            console.log(data);
          }
        })
        .catch(error => {
          if (error.message === '404') {
            refs.listEl.innerHTML = '';
            refs.infoEl.innerHTML = '';
            refs.listEl.classList.remove('box-shadow');
            refs.infoEl.classList.remove('box-shadow');
            Notiflix.Notify.failure('Oops, there is no country with that name');
            console.log('Такої країни не знайдено', countryName.trim());
          }
        });
    }
  }, DEBOUNCE_DELAY)
);

// refs.inputEl.addEventListener('input', event => {
//   let countryName = event.target.value;
//   console.log('Пошук країни:', countryName.trim());
//   serchCountryByName.name = countryName.trim();
//   serchCountryByName.fetchCountries().then(data => {
//     console.log(data);
//   });
// });
