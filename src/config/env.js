export const ENV = {
  apiBaseUrl:
    window.location.href.indexOf('localhost:7000') !== -1
      ? 'http://localhost:8000/api/v1/'
      : 'https://datn-be.herokuapp.com/api/v1/',
};
