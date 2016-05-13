'use strict';

const Wreck = require('wreck');  //HTTP Client Utilities : Node용 http 클라이언트 모듈 , restapi와 연결을 위해서 사용



/**
* 초기화면
*/
exports.home = function(request, reply) {
  const apiUrl = this.apiBaseUrl + '/recipes';
  Wreck.get(apiUrl, {json: true}, (err, res, payload) => {
    if (err) {
      throw err;
    }
    reply.view('index', {
      recipes: payload
    });
  });
};

exports.viewRecipe = function(request, reply) {

  const apiUrl = this.apiBaseUrl + '/recipes/'+request.params.id;
  Wreck.get(apiUrl, {json: true}, (err, res, payload) => {
    if (err) {
      throw err;
    }
    console.log("request.params.id=="+request.params.id);
    reply.view('recipe', {recipe: payload});
  });
};

exports.login = function(request, reply) {
  reply.view('login');
};
