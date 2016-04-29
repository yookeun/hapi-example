'use strict';

const Recipes = require('./handlers/recipes');
const Pages = require('./handlers/pages');
const Assets = require('./handlers/assets');

module.exports = [
  {
    method: 'GET',
    path: '/{param*}',
    handler: Assets.servePublicDirectory
  },
  {
    method: 'GET',
    path: '/api/recipes',
    handler: Recipes.find
  },
  {
    method: 'GET',
    path: '/api/recipes/{id}',
    handler: Recipes.findOne
  },
  {
    method: 'POST',
    path: '/api/recipes',
    handler: Recipes.create
  }
]
