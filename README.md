# New Web Dev & Sausages Hompages and Registration Tool

## Frontend

The frontend was created with the [Preact-cli](https://github.com/developit/preact-cli/blob/master/README.md).

### To get started

You must add a secrets.json file at the root of the project that includes the Firebase client config.

```json
{
  "firebase_client_config": {
    "apiKey": "<API_KEY>",
    "authDomain": "wds-event-tool.firebaseapp.com",
    "databaseURL": "https://wds-event-tool.firebaseio.com",
    "projectId": "wds-event-tool",
    "messagingSenderId": "<MESSAGE_SENDER_ID>"
  }
}
```

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# test the production build locally
yarn run serve
```

## Backend

The backend was created using the Firebase cli. Notice that unline the frontend, the backend does not currently use Yarn.

### To get started

To deploy to Firebase, you must have a project with a Firestore database enabled. a number of config variables need to be set with the cli using `firebase functions:config:set`.

```js
{
  "nexmo": {
    "api_secret": "<SECRET>",
    "api_key": "<API_KEY>"
  },
  "slack": {
    "url": "https://hooks.slack.com/services/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"
  },
  "googleapi": {
    "client_secret": "<SECRET>",
    "sheet_id": "<ID>",
    "client_id": "<ID>"
  },
  "sendgrid": {
    "key": "<API_KEY>"
  }
}
```
