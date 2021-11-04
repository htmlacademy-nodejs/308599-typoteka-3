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
    const newComment = {
      id: nanoid(MAX_ID_LENGTH),
      text: comment.text
    };

    article.comments.push(newComment);

    return newComment;
  }

  dropComment(article, commentId) {
    const dropComment = article.comments
      .find((item) => item.id === commentId);

    if (!dropComment) {
      return null;
    }

    article.comments = article.comments
      .filter((item) => item.id !== commentId);

    return dropComment;
  }
}

module.exports = ArticleService;
