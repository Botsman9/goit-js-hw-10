import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBoxRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

searchBoxRef.addEventListener(
  'input',
  debounce(() => {
    const nameRef = searchBoxRef.value.trim();

    fetchCountries(nameRef)
      .then(data => {
        countryListRef.innerHTML = renderMarcap(data);
        if (data.length > 10) {
          countryListRef.innerHTML = '';
          return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }
        if (data.length === 1) {
          countryListRef.innerHTML = '';
          countryInfoRef.innerHTML = greetMarcap(data);
        } else {
          countryInfoRef.innerHTML = '';
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }, DEBOUNCE_DELAY),
);

function renderMarcap(arry) {
  return arry
    .map(({ flags, name }) => {
      return `<h2><img width="50" src= ${flags.svg} alt="flags"> ${name.official}</h2>`;
    })
    .join(' ');
}

function greetMarcap(data) {
  return data
    .map(({ name, capital, population, flags, languages }) => {
      return `<h1><img width="45" src="${flags.svg}" alt="flag"> ${name.official}</h1>
<ul>
  <li>Capital: <span>${capital}</span></li>
  <li>Population: <span>${population}</span></li>
  <li>Languages: <span>${Object.values(languages)}</span></li>
</ul>`;
    })
    .join(' ');
}
