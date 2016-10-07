# react/redux websocket example

[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[travis-image]: https://travis-ci.org/maxnachlinger/redux-websocket-example.svg?branch=master
[travis-url]: https://travis-ci.org/maxnachlinger/redux-websocket-example
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/

[![Screen-shot](https://raw.github.com/maxnachlinger/redux-websocket-example/master/doc/screen.png)]

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

### Client tests:
```shell
cd client
npm test
```

### TODO
- Show idle users with idle times ("idle for N minutes" etc)
- Add CSS - dear God the UI is awful :)
- Allow users to edit their recent messages, but show an edit indicator by edited message to everyone else
