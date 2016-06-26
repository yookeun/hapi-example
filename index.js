'use strict';

const Hapi = require('hapi');
const Sqlite3 = require('sqlite3');
const db = new Sqlite3.Database('./dindin.sqlite');
const Inert = require('inert');     //Static file and directory handlers plugin for hapi.js.
const Vision = require('vision');   //Templates rendering support for hapi.js
const Cookie = require('hapi-auth-cookie');
const Token = require('hapi-auth-bearer-token');
const server = new Hapi.Server();


const validateFunc = function(token, callback) {
  db.get('SELECT * FROM users WHERE token = ?', [token], (err, result) => {
    if (err) {
      return callback(err, false);
    }
    const user = result;
    if (typeof user === 'undefined') {
      return callback(null, false);
    }
    callback(null, true, {
      id: user.id,
      username: user.username
    });
  });
};


var plugins = [Inert, Vision, Token, Cookie];

server.connection({ port: 4000});

server.bind({
  db: db,
  apiBaseUrl: 'http://localhost:4000/api',
  webBaseUrl: 'http://localhost:4000'
});



server.register(plugins, (err) => {
  if (err) {
    throw err;
  }

  //token 체크
  server.auth.strategy('api', 'bearer-access-token', {
    validateFunc: validateFunc
  });

  //session 설정
  server.auth.strategy('session', 'cookie', 'try', {
    password: '70fe4f26ff9bcb5aab079875cadeec09',     //쿠키를 복호활 패스워드
    isSecure: false       //hapi-auth-cookie는 TLS/SSL을 디폴트로 지원한다. 개발시에는 false로 한다.
  });
  server.route(require('./routes'));

/*
  server.route({
    method: 'GET',
    path: '/setName/{name}',
    handler: function(request, reply) {
      request.cookieAuth.set({
        name: encodeURIComponent(request.params.name)
      });
      reply('Name set!');
    }
  });

  server.route({
    method: 'GET',
    path: '/getName',
    handler: function(request, reply) {
      const name = request.auth.credentials.name;
      reply('Hello there '+ name);
    }
  });
*/

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: './views',
    layoutPath: './views/layout',
    layout: true,
    partialsPath: './views/partials',
    helpersPath: './views/helpers',
    isCached: false
  });
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server listening at:', server.info.uri);
  });

});
