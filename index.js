'use strict';

const Hapi = require('hapi');
const Sqlite3 = require('sqlite3');
const db = new Sqlite3.Database('./dindin.sqlite');
const Inert = require('inert');     //Static file and directory handlers plugin for hapi.js.
const Vision = require('vision');   //Templates rendering support for hapi.js
const Cookie = require('hapi-auth-cookie');
const server = new Hapi.Server();

var plugins = [Inert, Vision, Cookie];

server.connection({ port: 4000});

server.bind({db: db});

server.register(plugins, (err) => {
  if (err) {
    throw err;
  }
  server.auth.strategy('session', 'cookie', 'try', {
    password: '70fe4f26ff9bcb5aab079875cadeec09',     //쿠키를 복호활 패스워드
    isSecure: false       //hapi-auth-cookie는 TLS/SSL을 디폴트로 지원한다. 개발시에는 false로 한다.
  });
  server.route(require('./routes'));
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
  });1
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server listening at:', server.info.uri);
  });

});
