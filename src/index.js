// import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const searchBoxRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

const BASE_URL = 'https://restcountries.com/v3.1/';

fetchCountries = (url = 'all') => {
  return fetch(BASE_URL + url).then(response => response.json());
};
fetchCountries().then(data => console.log(data.flatMap(dat => dat.flags)));

// searchBoxRef.addEventListener('input', e => {
//   e.preventDefault;

//   // fetchCountries('e').then(
//   //   data => (countryListRef.textContent = data.flatMap(rrr => rrr)),
//   // );
// });

// countryListRef;
