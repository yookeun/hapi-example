'use strict';

const Recipes = require('./handlers/recipes');
const Pages = require('./handlers/pages');
const Assets = require('./handlers/assets');
const Actions = require('./handlers/actions')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: Recipes.find
    //handler: Pages.home
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
