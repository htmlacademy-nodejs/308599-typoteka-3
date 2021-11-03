'use strict';

class CategoryService {
  constructor(articles) {
    this._artiles = articles;
  }

  findAll() {
    const categories = this._artiles.reduce((acc, article) => {
      article.category.forEach((category) => acc.add(category));
      return acc;
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;
