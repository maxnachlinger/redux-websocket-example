# react/redux websocket example

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
The app runs at [http://localhost:3000](http://localhost:3000)

### TODO
- Add UI indicator that user(s) are typing
- Show idle users ("idle for N minutes" etc)
- Add CSS - dear God the UI is awful :)
- Allow users to edit their recent messages, show an edit indicator by edited message to everyone else
- Make a prod webpack build. This is a rather low priority as no one should ever use this in production :)
