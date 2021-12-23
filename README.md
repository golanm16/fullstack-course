<a href="https://classroom.google.com/c/NDA4NzY4OTU2Mzkz">
  <img src="https://lh3.googleusercontent.com/-QO_htsTEOuU/YWu9EpBu60I/AAAAAAAAAcM/ye-xNHdbTgAr26SeMuIY6SiBb8mCVV10wCMACGAYYCw/s1280/beta_binyaminTech_logo%2B%25281%2529-page-001%2B%25281%2529.jpg" alt="Logo" >
</a>
(its a link to the classroom☝️)

# 📚 fullstack course 2021

## CheatSheet

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

or alternatively

```js
const port = 1234;
app.use(cors({ origin: `http://localhost:${port}` }));
```

to allow only localhost and not all domains

## 📖 my homework files:

### 0️⃣ week 00:

[📒 ex 1-4](week_00/week_00_hw.js)

- ex 01: fruit string
- ex 02: guess characters from my string
- ex 03: multiplication table
- ex 04: 8 boom

[📒 ex 05](week_00/week_00_hw_math.js)

- ex 05: get a random number using Math

### 1️⃣ week 01:

[📒 animals database](week_01/animals_db.js)

- ex: get a list of animals and make a primitive database

### 2️⃣ week 02:

[📒 people database](week_02/people_db.js)

#### ex: maintain a database of users/people

- add user.
- search by id.
- search by string.

### 3️⃣ week 03:

[📒 people database cont.](week_03/people_db.js)

#### ex: maintain a database of users/people

- delete user and his children.
- edit user first name/last name/city

### 4️⃣ week 04:

[📒 products](week_04/store.js)

#### ex: crocery shopping in js

- make a product object builder.

### 6️⃣ week 06:

[📒 jokes](week_06/jokes.js)

#### ex: get jokes by api with custom filtering

- get a number of random jokes.
- get joke by id, if not found show error message.
- change chuck norris to any name you want.

## 🎧 my coding soundtracks

<a href="http://www.youtube.com/watch?v=5qap5aO4i9A">
  <img src="https://thumbs.gfycat.com/AgedMiniatureBoto-max-1mb.gif" alt="lofi girl youtube livestream" height="150">
 </a>

<a href="https://open.spotify.com/playlist/37i9dQZF1DWU0ScTcjJBdj">
  <img src="https://i.scdn.co/image/ab67706f000000031932c7ea794e72d82b10692c" alt="relax & unwind spotify playlist" height="150">
 </a>

<a href="https://open.spotify.com/album/25r7pEf31viAbsoVHC6bQ4">
  <img src="https://i.scdn.co/image/ab67616d00001e026d30303243e6bd56a5482e9b" alt="the elder scrolls: skyrim soundtrack" height="150">
 </a>

## 🎙 my podcasts

<a href="https://open.spotify.com/show/4XPl3uEEL9hvqMkoZrzbx5">
  <img src="https://i.scdn.co/image/ab67656300005f1f11874ad24c1dcac2ace8d4c9" alt="darknet diaries podcast" height="150">
 </a>
<a href="https://open.spotify.com/show/44Mg6W7BrmDtJuuWF7H4b2">
  <img src="https://i.scdn.co/image/321f42b88e6f6b19148d023d79de7ca916e4c152" alt="pocket animals podcast" height="150">
 </a>
