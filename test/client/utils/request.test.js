import { buildQuery, getApiUrl, getWeatherUrl, makeFetch, makeGet, makePost } from "App/utils";

const respFromServer = {
  data: {
    name: 'John Doe'
  }
};
const baseUrl = `${process.env.API_URL}/api/v1/`;

describe('Request util spec', () => {
  let fetchMock;
  let fetchResp;

  beforeEach(() => {
    fetchResp = {
      json: jest.fn().mockImplementation(() => Promise.resolve(respFromServer))
    };
    fetchMock = global.fetch = jest.fn().mockImplementation(() => Promise.resolve(fetchResp));
  });

  describe('getWeatherUrl', () => {
    it('should return the correct baseUrl', () => {
      expect(getWeatherUrl('montreal')).toBe('https://www.meteomedia.com/api/obsdata/caqc0363/c?ref=rt');
      expect(getWeatherUrl('toronto')).toBe('https://www.theweathernetwork.com/api/obsdata/caon0696/c?ref=rt');
    });
  });

  describe('makeFetch', () => {
    const data = { name: 'John' };

    it('should make a get request', async () => {
      await makeFetch({ url: baseUrl });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(baseUrl, {
        method: 'GET'
      });
    });

    it('should omit body from get request', async () => {
      await makeFetch({ url: baseUrl, data });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(baseUrl, {
        method: 'GET'
      });
    });

    it('should make a post request', async () => {
      await makeFetch({ url: baseUrl, method: 'POST', data });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(baseUrl, {
        method: 'POST',
        body: JSON.stringify(data)
      });
    });
  });

  describe('makeGet', () => {
    beforeEach(async () => {
      await makeGet({ url: baseUrl });
    });

    it('should invoke "fetch" with the correct arguments', () => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(baseUrl, {
        method: 'GET'
      });
    });

    it('should invoke "json" method of fetch response', () => {
      expect(fetchResp.json).toHaveBeenCalledTimes(1);
    });
  });

  describe('makePost', () => {
    const postData = {
      age: 33
    };

    beforeEach(async () => {
      await makePost({ url: baseUrl, data: postData });
    });

    it('should invoke "fetch" with the correct arguments', () => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(baseUrl, {
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
    });

    it('should invoke "json" method of fetch response', () => {
      expect(fetchResp.json).toHaveBeenCalledTimes(1);
    });
  });

  describe('buildQuery', () => {
    const testCases = [
      {input: null, expected: ''},
      {input: undefined, expected: ''},
      {input: 'something', expected: 'something'},
      {input: ['something'], expected: ''},
      {input: {name: 'John', age: 33}, expected: 'name=John&age=33'}
    ];

    testCases.forEach(({input, expected}) => {
      it(`should return "${expected}" when called with "${JSON.stringify(input)}"`, () => {
        expect(buildQuery(input)).toBe(expected);
      });
    });
  });

  describe('getApiUrl', () => {
    const testCases = [
      {input: {}, expected: baseUrl},
      {input: { path: 'contact-us' }, expected: `${baseUrl}contact-us`},
      {input: { path: '/contact-us' }, expected: `${baseUrl}contact-us`},
      {input: { path: '/contact-us', query: { name: 'John', age: 33 } }, expected: `${baseUrl}contact-us?name=John&age=33`}
    ];

    testCases.forEach(({input, expected}) => {
      it(`should return "${expected}" when called with "${JSON.stringify(input)}"`, () => {
        expect(getApiUrl(input)).toBe(expected);
      });
    });
  });
});