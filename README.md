#### How to run:
This will probably only work in Chrome.
```
npm install
node server.js
```
App is available at: [http://localhost:3000/](http://localhost:3000/)

#### How to develop on this
Since I used Jsx for this example, you'll need to uncomment these lines in index.html:
```
<!--<script src="//cdnjs.cloudflare.com/ajax/libs/react/0.8.0/JSXTransformer.js"></script>-->
<!--
<script src="src/socketService.js"></script>
<script type="src/text/jsx" src="src/example.js"></script>
-->
```
and then comment out these lines in index.html:
```
<script src="build/socketService.js"></script>
<script src="build/example.js"></script>
```
