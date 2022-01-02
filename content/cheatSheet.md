# CheatSheet

### insert react to HTML:

```HTML
  <script src="https://unpkg.com/react@17.0.2/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js"></script>
```

### insert babel to HTML:

```HTML
  <script src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js"></script>
  <script type="text/babel" src="./main.js" defer></script>
```

## install express, body-parser & cors

```
  npm i express
  npm i body-parser
  npm i cors
```

## use express & body-parser

```js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```

## use cors

```js
const cors = require("cors");
app.use(cors());
```

or alternatively (more strict)

```js
const port = 1234;
app.use(cors({ origin: `http://localhost:${port}` }));
```

to allow only localhost and not all domains
