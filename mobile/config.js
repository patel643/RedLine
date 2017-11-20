
console.log(`loading configuration (dev mode=${__DEV__})`);

const config = {
  // e.g., http://foo.herokuapp.com
  API_BASE: 'TODO',

  AUTH0_CLIENT_ID: 'iLFQMMACnPkGDQdB65DxSdifHuiALXqQ',
  AUTH0_DOMAIN: 'https://maxharp3r.auth0.com',
}

const devModeOverrides = {
  API_BASE: 'http://localhost:3000'
}

if (__DEV__) {
  Object.assign(config, devModeOverrides)
}

console.log('config:', config)

export default config;
