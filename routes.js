'use strict';

const Recipes = require('./handlers/recipes');
const Pages = require('./handlers/pages');
const Assets = require('./handlers/assets');
const Actions = require('./handlers/actions')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: Pages.home
  },{
    method: 'GET',
    path: '/api/recipes',
    handler: Recipes.find
  },{
    method: 'GET',
    path: '/{param*}',
    handler: Assets.servePublicDirectory
  },{
    method: 'GET',
    path: '/recipes/{id}',
    handler: Recipes.findOne
  },{
    method: 'POST',
    path: '/api/recipes',
    config: {
      auth: 'api' //bearer-access-token사용
    },
    handler: Recipes.create
  },{
    method: 'GET',
    path: '/login',
    handler: Pages.login
  },{
    method: 'POST',
    path: '/login',
    handler: Actions.login
  }

]
