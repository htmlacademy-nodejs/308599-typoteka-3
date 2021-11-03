'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const articleValidator = require(`../middlewares/article-validator`);
const articleExist = require(`../middlewares/article-exist`);
const commentValidator = require(`../middlewares/comment-validator`);
const commentExist = require(`../middlewares/comment-exist`);

module.exports = (app, articleService) => {
  const route = new Router();

  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    res.status(HttpCode.OK).json(articles);
  });

  route.get(`/:articleId`, (req, res) => {
    const {articleId} = req.params;
    const article = articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found ${articleId}`);
    }

    return res.status(HttpCode.OK)
      .json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(article);
  });

  route.put(`/:articleId`, articleExist(articleService), (req, res) => {
    const {articleId} = req.params;
    const article = articleService.update(articleId, req.body);

    return res.status(HttpCode.OK)
      .json(article);
  });

  route.delete(`/:articleId`, articleExist(articleService), (req, res) => {
    const {articleId} = req.params;
    const article = articleService.drop(articleId);

    return res.status(HttpCode.OK)
      .json(article);
  });

  route.get(`/:articleId/comments`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    return res.status(HttpCode.OK)
      .json(article.comments);
  });

  route.post(`/:articleId/comments`, [articleExist(articleService), commentValidator], (req, res) => {
    const {articleId} = req.params;
    const comment = articleService.createComment(articleId, req.body);
    return res.status(HttpCode.OK)
      .json(comment);
  });

  route.delete(`/:articleId/comments/:commentId`, [articleExist(articleService), commentExist], (req, res) => {
    const {articleId, commentId} = req.params;
    const comment = articleService.dropComment(articleId, commentId);

    return res.status(HttpCode.OK)
      .json(comment);
  });

};
