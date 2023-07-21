const DOMAIN_CONFIG = {
  prod: {
    url: 'http://121.40.48.93',
  },
  test: {
    url: 'http://121.40.48.93',
  },
};
const VERSION = '/api/v3';

let domain = DOMAIN_CONFIG.test;

const apiUrl = domain.url + VERSION;

export { apiUrl, domain };
