'use strict';

const {Router} = require(`express`);
const getMockData = require(`../lib/get-mock-data`);
const category = require(`../api/category`);
const article = require(`../api/article`);
const search = require(`../api/search`);

const {
  CategoryService,
  SearchService,
  ArticleService,
} = require(`../data-service`);


const app = new Router();

(async () => {
  const mockData = await getMockData();

  category(app, new CategoryService(mockData));
  article(app, new ArticleService(mockData));
  search(app, new SearchService(mockData));
})();

module.exports = app;
