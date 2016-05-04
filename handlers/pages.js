'use strict';

const Wreck = require('wreck');  //Node용 http 클라이언트 모듈 , restapi와 연결을 위해서 사용


exports.home = function(request, reply) {
  const apiUrl = this.apiBaseUrl + '/recipes';
  Wreck.get(apiUrl, {json: true}, (err, res, payload) => {
    if (err) {
      throw err;
    }
    console.log("apiUrl====="+apiUrl);
    reply.view('index', {
      recipies: payload
    });
  });
};

/*
exports.home = function(request, reply) {
  const recipes = [
    {
      id: 1,
      name: 'Sllicate soup',
      cuisine: 'Martian',
      serves: 100,
      prep_time: '2 hours',
      cooking_time: '12 minutes'
    },
    {
      id: 2,
      name: 'Methane trifle',
      cuisine: 'Neptunian',
      serves: 200,
      prep_time: '1 hours',
      cooking_time: '24 minutes'
    }
  ];

  reply.view('index',{recipes: recipes});
};
*/

exports.login = function(request, reply) {
  reply.view('login');
};
