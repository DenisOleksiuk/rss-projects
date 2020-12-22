async function featchCovidStats() {
  const url = 'https://api.covid19api.com/summary';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const fetchCountries = async () => {
  const countries = await fetch('https://restcountries.eu/rest/v2/all?fields=name;population;flag')
    .then((res) => res.json());
  return countries;
};

export { featchCovidStats, fetchCountries };
