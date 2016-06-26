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
  },
  {
    method: 'GET',
    path: '/api/recipes',
    handler: Recipes.find
  },
  {
    method: 'GET',
    path: '/{param*}',
    handler: Assets.servePublicDirectory
  },
  {
    method: 'GET',
    path: '/recipes/{id}',
    handler: Pages.viewRecipe
  },
  {
    method: 'POST',
    path: '/api/recipes',
    config: {
      auth: 'api' //bearer-access-token사용
    },
    handler: Recipes.create
  },
  {
    method: 'GET',
    path: '/api/recipes/{id}',
    handler: Recipes.findOne
  },
  {
    method: 'GET',
    path: '/login',
    handler: Pages.login
  },
  {
    method: 'POST',
    path: '/login',
    handler: Pages.loginPost
  },
  {
    method: 'POST',
    path: '/api/login',
    config: {
      payload: {
        output:'data',
        parse: true
      }
    },
    handler: Actions.login
  },
  {
    method: 'GET',
    path: '/logout',
    handler: Pages.logout
  },
  {
    method: 'GET',
    path: '/create',
    handler: Pages.createRecipe,
    config: {
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'POST',
    path: '/create',
    handler: Pages.createRecipePost
  }

];
