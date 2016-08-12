# react/redux websocket example

### Installation:
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
- Add CSS - probably via [Radium](https://github.com/FormidableLabs/radium) - dear God the UI is awful :)
- Add "user is typing" / "user has stopped typing" messaging
- Extract vendor code into it's own bundle (Webpack fun)
- Make a prod webpack build. This is a rather low priority as no one should ever use this in production :)
