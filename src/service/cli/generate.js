'use strict';

const fs = require(`fs`);
const {ExitCode} = require(`../../constants`);
const {
  getRandomInt,
  getRandomItem,
  getShuffleItem
} = require(`../../utils`);

const FILE_NAME = `mocks.json`;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const ANNOUNCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`
];

const AnnounceRestrict = {
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

const generateCards = (count) => {
  return Array(count).fill({}).map(() => ({
    title: getRandomItem(TITLES),
    createdDate: createDate(),
    announce: getShuffleItem(ANNOUNCES, AnnounceRestrict.MIN, AnnounceRestrict.MAX).join(``),
    fullText: getShuffleItem(ANNOUNCES).join(``),
    category: getShuffleItem(CATEGORIES, 1, getRandomInt(2, CATEGORIES.length - 1))
  }));
};


module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countCards = Number.parseInt(count, 10) || CardRestrict.MIN;

    if (countCards > CardRestrict.MAX) {
      console.info(`Не больше ${CardRestrict.MAX} публикаций`);
      process.exit(ExitCode.ERROR);
    }

    const content = JSON.stringify(generateCards(countCards));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(`Operation success. File created.`);
    });

  }
};
