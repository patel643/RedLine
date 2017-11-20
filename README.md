# React Native Project Template

Features:

* based on <https://github.com/umn-5117-f17/express-project-template>
* based on <https://expo.io/>
* includes <https://reactnavigation.org/>

## setup and run in development

* install [heroku command line app](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
* create account at [mlab](https://mlab.com/)
* create account at [auth0](https://auth0.com)
    * create a (regular web app) client
    * add a callback URL: `https://auth.expo.io/@EXPO_USERNAME/5117-rnpt` where
      5117-rnpt should match your "slug" is defined in mobile/exp.json
    * see <https://github.com/expo/auth0-example> for more docs
* edit file `mobile/config.js` to configure mobile app (see items marked TODO),
  and commit the changes
* create file `.env` in root of project to configure express, something like this:

```
DEBUG=app:*

PORT=3000

# these must match the values from web/.env
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


## deploy to heroku

* run these commands (one-time setup, or whenever these values need to change):

```
    # add all of the config variables from .env, except DEBUG and PORT
    heroku config:set AUTH0_DOMAIN=(foo).auth0.com AUTH0_API_ID=(bar)
```

* add the callback to "allowed callback URLs" list in auth0 client settings: `https://(heroku-dns).herokuapp.com/callback`

* check the code in and `git push heroku master`
