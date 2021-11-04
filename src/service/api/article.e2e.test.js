"use strict";

const express = require(`express`);
const request = require(`supertest`);

const article = require(`./article`);
const DataService = require(`../data-service/article`);

const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    id: `VFLj2S`,
    title: `Как начать программировать`,
    createdDate: `2021-09-12T17:02:41.146Z`,
    announce: `Он написал больше 30 хитов.Простые ежедневные упражнения помогут достичь успеха.Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    fullText: `Достичь успеха помогут ежедневные повторения.Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.Как начать действовать? Для начала просто соберитесь.Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.Программировать не настолько сложно, как об этом говорят.Из под его пера вышло 8 платиновых альбомов.Собрать камни бесконечности легко, если вы прирожденный герой.Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.Он написал больше 30 хитов.Это один из лучших рок-музыкантов.Первая большая ёлка была установлена только в 1938 году.Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?Ёлки — это не просто красивое дерево. Это прочная древесина.Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.Простые ежедневные упражнения помогут достичь успеха.Золотое сечение — соотношение двух величин, гармоническая пропорция.Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    category:
      [
        `Без рамки`,
        `Музыка`,
        `Железо`,
        `Деревья`
      ],
    comments:
      [
        {
          id: `6K_Smz`,
          text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором!`
        },
        {
          id: `kvgQ4V`,
          text: `Планируете записать видосик на эту тему? Хочу такую же футболку :-)`
        }
      ]
  },
  {
    id: `fJGRiZ`,
    title: `Борьба с прокрастинацией`,
    createdDate: `2021-10-15T06:43:41.251Z`,
    announce: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.Программировать не настолько сложно, как об этом говорят.Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.Золотое сечение — соотношение двух величин, гармоническая пропорция.","fullText":"Он написал больше 30 хитов.Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.Это один из лучших рок-музыкантов.Как начать действовать? Для начала просто соберитесь.Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.Собрать камни бесконечности легко, если вы прирожденный герой.Достичь успеха помогут ежедневные повторения.Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.Из под его пера вышло 8 платиновых альбомов.Вы можете достичь всего. Стоит только немного постараться и запастись книгами.Простые ежедневные упражнения помогут достичь успеха.Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?Первая большая ёлка была установлена только в 1938 году.Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.Программировать не настолько сложно, как об этом говорят.`,
    category:[
      `Разное`,
      `Кино`,
      `IT`,
      `Музыка`,
      `Железо`
    ],
    comments:
      [
        {
          id: `L8Zsz-`,
          text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
        },
        {
          id: `B1-g8Z`,
          text: `Совсем немного... Плюсую, но слишком много буквы!`
        },
        {
          id: `5TYnsD`,
          text: `Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
        }
      ]
  },
  {
    id: `4LHGH7`,
    title: `Рок — это протест`,
    createdDate: `2021-08-28T22:03:15.368Z`,
    announce: `Простые ежедневные упражнения помогут достичь успеха.Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.Золотое сечение — соотношение двух величин, гармоническая пропорция.Собрать камни бесконечности легко, если вы прирожденный герой.`,
    fullText: `Ёлки — это не просто красивое дерево. Это прочная древесина.Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.Золотое сечение — соотношение двух величин, гармоническая пропорция.Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.Достичь успеха помогут ежедневные повторения.Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.Вы можете достичь всего. Стоит только немного постараться и запастись книгами.Программировать не настолько сложно, как об этом говорят.Как начать действовать? Для начала просто соберитесь.Он написал больше 30 хитов.Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.Простые ежедневные упражнения помогут достичь успеха.Из под его пера вышло 8 платиновых альбомов.Это один из лучших рок-музыкантов.`,
    category:
      [
        `Деревья`,
        `Разное`,
        `Без рамки`,
        `За жизнь`,
        `Программирование`,
        `Музыка`,
        `Железо`
  ],
    comments:
      [
        {
          id: `Y237io`,
          text: `Совсем немного... Мне кажется или я уже читал это где-то?`
        },
        {
          id: `Qm6tYe`,
          text: `Это где ж такие красоты? Совсем немного... Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
        },
        {
          id: `ucEIUX`,
          text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Хочу такую же футболку :-) Совсем немного...`
        },
        {
          id: `Ufp1xx`,
          text: `Мне кажется или я уже читал это где-то?`
        }
      ]
  }
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  article(app, new DataService(cloneData));
  return app;
};

describe(`API returns a list of all articles`, () => {

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 3 articles`, () => expect(response.body.length).toBe(3));

  test(`First article's id equals "bUAlOA"`, () => expect(response.body[0].id).toBe(`VFLj2S`));

});

describe(`API returns an article with given id`, () => {

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/VFLj2S`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`article's title is "Как начать программировать"`, () => expect(response.body.title).toBe(`Как начать программировать`));

});

describe(`API creates an article if data is valid`, () => {

  const newArticle = {
    title: `Дам погладить котика`,
    category: `Котики`,
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
    fullText: `Дам погладить котика. Дорого. Не гербалайф Дам погладить котика. Дорого. Не гербалайф Дам погладить котика. Дорого. Не гербалайф`,
  };

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Articles count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(4))
  );

});

describe(`API refuses to create an article if data is invalid`, () => {

  const newArticle = {
    title: `Дам погладить котика`,
    category: `Котики`,
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
    fullText: `Дам погладить котика. Дорого. Не гербалайф Дам погладить котика. Дорого. Не гербалайф Дам погладить котика. Дорого. Не гербалайф`,
  };

  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badOffer = {...newArticle};
      delete badOffer[key];
      await request(app)
        .post(`/articles`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

});

describe(`API changes existent article`, () => {

  const newArticle = {
    title: `Дам погладить котика`,
    category: `Котики`,
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
    fullText: `Дам погладить котика. Дорого. Не гербалайф Дам погладить котика. Дорого. Не гербалайф Дам погладить котика. Дорого. Не гербалайф`,
  };

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/VFLj2S`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Article is really changed`, () => request(app)
    .get(`/articles/VFLj2S`)
    .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`))
  );

});

test(`API returns status code 404 when trying to change non-existent article`, () => {

  const app = createAPI();

  const validArticle = {
    title: `Дам погладить котика`,
    category: `Котики`,
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
    fullText: `Дам погладить котика. Дорого. Не гербалайф Дам погладить котика. Дорого. Не гербалайф Дам погладить котика. Дорого. Не гербалайф`,
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {

  const app = createAPI();

  const invalidArticle = {
    title: `Дам погладить котика`,
    category: `Котики`,
    announce: `Дам погладить котика. Дорого. Не гербалайф`,
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/fJGRiZ`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`fJGRiZ`));

  test(`article count is 2 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(2))
  );

});

test(`API refuses to delete non-existent article`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

describe(`API returns a list of comments to given article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/VFLj2S/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 2 comments`, () => expect(response.body.length).toBe(2));

  test(`First comment's id is "6K_Smz"`, () => expect(response.body[0].id).toBe(`6K_Smz`));

});

describe(`API creates a comment if data is valid`, () => {

  const newComment = {
    text: `Валидному комментарию достаточно этого поля`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles/VFLj2S/comments`)
      .send(newComment);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, () => request(app)
    .get(`/articles/VFLj2S/comments`)
    .expect((res) => expect(res.body.length).toBe(3))
  );

});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
    .post(`/articles/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {

  const app = createAPI();

  return request(app)
    .post(`/articles/VFLj2S/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);

});

describe(`API correctly deletes a comment`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/VFLj2S/comments/kvgQ4V`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns comment deleted`, () => expect(response.body.id).toBe(`kvgQ4V`));

  test(`Comments count is 1 now`, () => request(app)
    .get(`/articles/VFLj2S/comments`)
    .expect((res) => expect(res.body.length).toBe(1))
  );

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/VFLj2S/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete a comment to non-existent offer`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST/comments/kvgQ4V`)
    .expect(HttpCode.NOT_FOUND);

});
