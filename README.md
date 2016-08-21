# react/redux websocket example

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

### Installation:
Note: This requires a recent version of NodeJS to work.
```shell
git clone git@github.com:maxnachlinger/react-websocket-example.git

cd react-websocket-example
cd client
npm i

cd ../server
npm i
```

### Running this app:
```shell
# start a webpack dev watch build
cd client
npm start

# start the server
cd ../server
npm start
```
The app runs at [http://silly-chat.localtest.me:3000](http://silly-chat.localtest.me:3000)

### TODO
- Show idle users with idle times ("idle for N minutes" etc)
- Add CSS - dear God the UI is awful :)
- Allow users to edit their recent messages, but show an edit indicator by edited message to everyone else
