# React Native Project Template

Features:

* based on <https://github.com/umn-5117-f17/express-project-template>
* based on <https://expo.io/>
* includes <https://reactnavigation.org/>

## setup and run in development

* install [heroku command line app](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
* create account at [mlab](https://mlab.com/)
* create account at [auth0](https://auth0.com)
    * (I assume you'll use the same auth0 API/client as your last project)
    * add a callback URL: `https://auth.expo.io/@EXPO_USERNAME/5117-rnpt` changing
      `EXPO_USERNAME` and setting `5117-rnpt` to match your "slug" as defined in
      mobile/exp.json
    * as you configure express and react native, you can use the same Auth0
      settings as with the last project (e.g., domain, client id, api id)
* edit file `mobile/config.js` to configure mobile app (see items marked TODO),
  and commit the changes
* create file `.env` in root of project to configure express, something like this:

```
DEBUG=app:*

PORT=3000

# these must match the values from mobile/config.js
AUTH0_DOMAIN=TODO.auth0.com
AUTH0_API_ID=TODO

DB_URI=mongodb://5117:5117iscool@ec2-54-175-174-41.compute-1.amazonaws.com:80/5117-f17-individual-hw
```

* run:

```
    npm install
    npm run dev
```

* open `mobile` folder in Expo XDE, open client on device or emulator

* make sure you can run both demos. If there's an error in auth, then double-
  check your configuration values. If there's an error in fetch, then try switching
  expo xde to "lan" and using your computer's IP address instead of localhost
  (and, ensure if you're using a device, that your computer and your device
  are on the same network).


## deploy to heroku

* run these commands (one-time setup, or whenever these values need to change):

```
    # add all of the config variables from .env, except DEBUG and PORT
    heroku config:set AUTH0_DOMAIN=(foo).auth0.com AUTH0_API_ID=(bar)
```

* check the code in and `git push heroku master`
