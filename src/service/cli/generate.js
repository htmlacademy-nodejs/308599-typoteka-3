'use strict';

const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const fs = require(`fs`).promises;
const {ExitCode, MAX_ID_LENGTH} = require(`../../constants`);
const {
  getRandomInt,
  getRandomItem,
  getShuffleItem,
  shuffle
} = require(`../../utils`);

const FILE_NAME = `mocks.json`;
const MAX_COMMENTS = 4;

const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const SentenceRestrict = {
  MIN: 1,
  MAX: 5
};

const CardRestrict = {
  MIN: 1,
  MAX: 1000
};

const createDate = () => {
  const currentDate = new Date();
  const lastDate = new Date().setMonth(currentDate.getMonth() - 3);
  const randomDate = getRandomInt(lastDate, +currentDate);
  return new Date(randomDate);
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateCards = (count, {titles = [], categories = [], sentences = [], comments = []}) => {
  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    title: getRandomItem(titles),
    createdDate: createDate(),
    announce: getShuffleItem(sentences, SentenceRestrict.MIN, SentenceRestrict.MAX).join(``),
    fullText: getShuffleItem(sentences).join(``),
    category: getShuffleItem(categories, 1, getRandomInt(2, categories.length - 1)),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
  }));
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.log(chalk.red(err));
    return [];
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countCards = Number.parseInt(count, 10) || CardRestrict.MIN;

    if (countCards > CardRestrict.MAX) {
      console.info(chalk.red(`Не больше ${CardRestrict.MAX} публикаций`));
      process.exit(ExitCode.ERROR);
    }

    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);
    const content = JSON.stringify(generateCards(countCards, {titles, categories, sentences, comments}));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }

  }
};
