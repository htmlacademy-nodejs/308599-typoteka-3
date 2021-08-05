'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {HttpCode} = require(`../../constants`);
require(`express-async-errors`);

const DEFAULT_PORT = 3000;
const FILE_NAME = `mocks.json`;

const app = express();
app.use(express.json());

app.get(`/posts`, async (req, res) => {
  const fileContent = await fs.readFile(FILE_NAME);
  const mocks = JSON.parse(fileContent);
  res.json(mocks);
});

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

app.use((err, req, res, next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR);
  next(err);
});

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        return console.error(chalk.red(`Ошибка при создании сервера ${err}`));
      }

      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  }
};
