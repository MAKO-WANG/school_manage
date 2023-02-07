const DOMAIN_CONFIG = {
  prod: {
    url: 'http://121.40.48.93:8000',
  },
  test: {
    url: 'http://121.40.48.93:8000',
  },
  dev: {
    url: 'http://121.40.48.93:8000',
  },
};

const API_VERSION = '/api/v1';

export const DOMAIN = DOMAIN_CONFIG.dev.url + API_VERSION;
