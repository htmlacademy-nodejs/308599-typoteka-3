'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const newArticle = Object
      .assign({id: nanoid(MAX_ID_LENGTH), comments: []}, article);

    this._articles.push(newArticle);
    return newArticle;
  }

  drop(id) {
    const article = this._articles.find((item) => item.id === id);

    if (!article) {
      return null;
    }

    this._articles = this._articles.filter((item) => item.id !== id);
    return article;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((item) => item.id === id);
  }

  update(id, article) {
    const oldArticles = this._articles
      .find((item) => item.id === id);

    return Object.assign(oldArticles, article);
  }

  createComment(articleId, comment) {
    const article = this.findOne(articleId);
    article.comments.push({
      id: nanoid(MAX_ID_LENGTH),
      text: comment.text
    });

    return article.comments;
  }

  dropComment(articleId, commentId) {
    const article = this.findOne(articleId);
    let comments = article.comments;
    comments = comments.filter((item) => item.id !== commentId);
    this.update(articleId, article);

    return comments;
  }
}

module.exports = ArticleService;
