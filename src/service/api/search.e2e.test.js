'use strict';

const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);

const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    id: `zpVHTd`,
    title: `Самый лучший музыкальный альбом этого года`,
    createdDate: `2021-08-22T18:45:16.194Z`,
    announce: `Золотое сечение — соотношение двух величин, гармоническая пропорция.Первая большая ёлка была установлена только в 1938 году.Из под его пера вышло 8 платиновых альбомов.Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    fullText: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.Вы можете достичь всего. Стоит только немного постараться и запастись книгами.Он написал больше 30 хитов.Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.Программировать не настолько сложно, как об этом говорят.Как начать действовать? Для начала просто соберитесь.Золотое сечение — соотношение двух величин, гармоническая пропорция.Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.Это один из лучших рок-музыкантов.Простые ежедневные упражнения помогут достичь успеха.Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.Достичь успеха помогут ежедневные повторения.Первая большая ёлка была установлена только в 1938 году.Из под его пера вышло 8 платиновых альбомов.Собрать камни бесконечности легко, если вы прирожденный герой.`,
    category: [`Деревья`],
    comments: [
      {
        id: `PVgL2f`,
        text: `Хочу такую же футболку :-)`
      },
      {
        id: `wUVBTd`,
        text: `Планируете записать видосик на эту тему?`
      },
      {
        id: `ysbHbK`,
        text: `Совсем немного...`
      }
    ]
  },
  {
    id: `lkPj8z`,
    title: `Рок — это протест`,
    createdDate: `2021-08-02T14:22:43.002Z`,
    announce: `Собрать камни бесконечности легко, если вы прирожденный герой.Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.Программировать не настолько сложно, как об этом говорят.Он написал больше 30 хитов.`,
    fullText: `Программировать не настолько сложно, как об этом говорят.Как начать действовать? Для начала просто соберитесь.Первая большая ёлка была установлена только в 1938 году.Из под его пера вышло 8 платиновых альбомов.Это один из лучших рок-музыкантов.Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.Золотое сечение — соотношение двух величин, гармоническая пропорция.Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.Простые ежедневные упражнения помогут достичь успеха.Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.Собрать камни бесконечности легко, если вы прирожденный герой.Он написал больше 30 хитов.Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.Достичь успеха помогут ежедневные повторения.`,
    category: [
      `Кино`,
      `Железо`,
      `Разное`,
      `Без рамки`,
      `Музыка`,
      `Деревья`,
      `Программирование`
    ],
    comments: [
      {
        id: `bg9_E6`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Планируете записать видосик на эту тему?`
      }
    ]
  },
  {
    id: `eWZRs6`,
    title: `Что такое золотое сечение`,
    createdDate: `2021-09-02T12:33:43.281Z`,
    announce: `Простые ежедневные упражнения помогут достичь успеха.Вы можете достичь всего. Стоит только немного постараться и запастись книгами.Как начать действовать? Для начала просто соберитесь.Достичь успеха помогут ежедневные повторения.`,
    fullText: `Он написал больше 30 хитов.Первая большая ёлка была установлена только в 1938 году.Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.Из под его пера вышло 8 платиновых альбомов.Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.Ёлки — это не просто красивое дерево. Это прочная древесина.Программировать не настолько сложно, как об этом говорят.Простые ежедневные упражнения помогут достичь успеха.Как начать действовать? Для начала просто соберитесь.Вы можете достичь всего. Стоит только немного постараться и запастись книгами.Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.Золотое сечение — соотношение двух величин, гармоническая пропорция.Достичь успеха помогут ежедневные повторения.Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.Собрать камни бесконечности легко, если вы прирожденный герой.Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
    category: [
      `Программирование`,
      `За жизнь`,
      `Без рамки`,
      `IT`,
      `Разное`
    ],
    comments: [
      {
        id: `Taw6Jk`,
        text: `Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        id: `gg8BaX`,
        text: `Это где ж такие красоты? Плюсую, но слишком много буквы!`
      }
    ]
  },
  {
    id: `PYE7_n`,
    title: `Лучшие рок-музыканты 20-века`,
    createdDate: `2021-09-19T04:19:31.194Z`,
    announce: `Ёлки — это не просто красивое дерево. Это прочная древесина.Это один из лучших рок-музыкантов.Простые ежедневные упражнения помогут достичь успеха.Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    fullText: `Достичь успеха помогут ежедневные повторения.Из под его пера вышло 8 платиновых альбомов.Как начать действовать? Для начала просто соберитесь.Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.Простые ежедневные упражнения помогут достичь успеха.Он написал больше 30 хитов.Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.Первая большая ёлка была установлена только в 1938 году.Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.Программировать не настолько сложно, как об этом говорят.Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.Собрать камни бесконечности легко, если вы прирожденный герой.Вы можете достичь всего. Стоит только немного постараться и запастись книгами.Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.Это один из лучших рок-музыкантов.Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    category: [
      `Железо`,
      `Программирование`,
      `Кино`,
      `Без рамки`
    ],
    comments: [
      {
        id: `n46vxz`,
        text: `Хочу такую же футболку :-) Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        id: `hz1d1M`,
        text: `Планируете записать видосик на эту тему?`
      },
      {
        id: `D5hqr8`,
        text: `Хочу такую же футболку :-) Плюсую, но слишком много буквы!`
      },
      {
        id: `1Iz3Ik`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`}
    ]
  },
  {
    id: `sxRzK7`,
    title: `Мы реализовали REST API, но есть одно "но"`,
    createdDate: `2021-09-06T04:30:34.510Z`,
    announce: `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.Программировать не настолько сложно, как об этом говорят.Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    fullText: `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.Как начать действовать? Для начала просто соберитесь.Из под его пера вышло 8 платиновых альбомов.Первая большая ёлка была установлена только в 1938 году.Это один из лучших рок-музыкантов.Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.Вы можете достичь всего. Стоит только немного постараться и запастись книгами.Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.Он написал больше 30 хитов.Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.Ёлки — это не просто красивое дерево. Это прочная древесина.Достичь успеха помогут ежедневные повторения.Простые ежедневные упражнения помогут достичь успеха.Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.Собрать камни бесконечности легко, если вы прирожденный герой.Золотое сечение — соотношение двух величин, гармоническая пропорция.Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    category: [
      `Музыка`
    ],
    comments: [
      {
        id: `bVhm7S`,
        text: `Согласен с автором! Плюсую, но слишком много буквы! Это где ж такие красоты?`
      }
    ]
  }
];

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns article based on search query`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `это протест`
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`1 article found`, () => expect(response.body.length).toBe(1));

  test(`Article has correct id`, () => expect(response.body[0].id).toBe(`lkPj8z`));
});

test(`API returns code 404 if nothing is found`,
    () => request(app)
      .get(`/search`)
      .query({
        query: `Продам свою душу`
      })
      .expect(HttpCode.NOT_FOUND)
);

test(`API returns 400 when query string is absent`,
    () => request(app)
      .get(`/search`)
      .expect(HttpCode.BAD_REQUEST)
);
