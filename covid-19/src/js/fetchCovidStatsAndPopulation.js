async function featchCovidStats() {
  const url = 'https://api.covid19api.com/summary';
  const data = await fetch(url)
    .then((response) => {
      if (response.status >= 400 && response.status < 600) throw new Error('Bad response from server');

      return response;
    })
    .then((data) => data.json())
    .catch((error) => error);

  return data;
}

const fetchCountries = async () => {
  const countries = await fetch('https://restcountries.eu/rest/v2/all?fields=name;population;flag')
    .then((response) => {
      if (response.status >= 400 && response.status < 600) throw new Error('Bad response from server');

      return response;
    })
    .then((data) => data.json())
    .catch((error) => error);

  return countries;
};

export { featchCovidStats, fetchCountries };
