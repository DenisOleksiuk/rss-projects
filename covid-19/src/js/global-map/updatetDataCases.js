import {
  cases, isButtonTotalConfirmedStatus,
  isbuttonTotalRecoveredStatus, polygonSeries,
} from './config';

export const updateDataCases = (worldData) => {
  cases.splice(0, cases.length);
  if (isButtonTotalConfirmedStatus()) {
    worldData.forEach((country) => {
      // cases.push({ id: country.CountryCode, totalConfirmed: country.TotalConfirmed || 0 });
      cases.push({ id: country.CountryCode, value: country.TotalConfirmed || 1 });
    });
    polygonSeries.data = cases;
  } else if (isbuttonTotalRecoveredStatus()) {
    worldData.forEach((country) => {
      cases.push({ id: country.CountryCode, value: country.TotalRecovered || 1 });
    });
    polygonSeries.data = cases;
  } else {
    worldData.forEach((country) => {
      cases.push({ id: country.CountryCode, value: country.TotalDeaths || 1 });
    });
    polygonSeries.data = cases;
  }
};
