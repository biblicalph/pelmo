import { API_URL, isString } from "App/utils";

export const makeFetch = async ({ url, method = 'GET', headers, data }) => {
  const options = { method, headers };

  if (data && method.toLowerCase() !== 'get') {
    options.body = JSON.stringify(data);
  }

  const resp = await fetch(url, options);

  const isSuccessful = resp.status >= 200 && resp.status < 300;
  if (!isSuccessful) {
    throw new Error(resp.statusText || `${method} ${url} failed`);
  }
  
  return resp.json();
};

export const makeGet = makeFetch;
export const makePost = ({ url, data }) => makeFetch({ 
  url, 
  data, 
  method: 'POST',
  headers: { 'Content-Type': 'application/json' } 
});

export const getWeatherUrl = (city) => {
  return city.toLowerCase() === 'montreal' 
    ? 'https://www.meteomedia.com/api/obsdata/caqc0363/c?ref=rt'
    : 'https://www.theweathernetwork.com/api/obsdata/caon0696/c?ref=rt';
};

export const buildQuery = (query) => {
  if (isString(query)) {
    return query;
  }
  if (Array.isArray(query)) {
    return '';
  }
  return Object.entries(query || {})
    .reduce((accum, [name, val]) => {
      accum.push(`${name}=${encodeURIComponent(val)}`);
      return accum;
    }, [])
    .join('&');
}

export const getApiUrl = ({ path, query }) => {
  const queryString = buildQuery(query);
  const cleanPath = path ? path.replace(/^\//, '') : '';
  const url = `${API_URL}${cleanPath}`;

  return !!queryString ? `${url}?${queryString}` : url;
}