'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (service) => (req, res, next) => {
  const {articleId} = req.params;
  const article = service.findOne(articleId);

  if (!article) {
    return res.status(HttpCode.NOT_FOUND)
      .send(`Bad request`);
  }

  res.locals.article = article;
  return next();
};
