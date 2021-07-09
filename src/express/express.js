'use strict';

const express = require(`express`);
const path = require(`path`);

const mainRouter = require(`./routes/main`);
const myRouter = require(`./routes/my`);
const articlesRouter = require(`./routes/articles`);
const categoriesRouter = require(`./routes/categories`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;
const TEMPLATE_DIR = `templates/pages`;

const app = express();

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, TEMPLATE_DIR));
app.set(`view engine`, `pug`);

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);
app.use(`/categories`, categoriesRouter);

app.use((req, res) => res.status(400).render(`400`));
app.use((err, req, res) => res.status(500).render(`500`));

app.listen(DEFAULT_PORT, () => console.log(DEFAULT_PORT));
