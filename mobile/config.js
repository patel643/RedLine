
console.log(`loading configuration (dev mode=${__DEV__})`);

const config = {
  API_BASE: 'TODO'
}

const devModeOverrides = {
  API_BASE: 'http://localhost:3000'
}

if (__DEV__) {
  Object.assign(config, devModeOverrides)
}

console.log('config:', config)

export default config;
