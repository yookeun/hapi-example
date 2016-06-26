'use strict';


//HTTP Client Utilities : Node용 http 클라이언트 모듈 , restapi와 연결을 위해서 사용
const Wreck = require('wreck');


/**
 * 내역페이지
 * @param request
 * @param reply
 */
exports.home = function(request, reply) {
  const apiUrl = this.apiBaseUrl + '/recipes';
  Wreck.get(apiUrl, {json: true}, (err, res, payload) => {
    if (err) {
      throw err;
    }
    reply.view('index', {
      recipes: payload,
      user: request.auth.credentials
    });
  });
};

/**
 * 상세 내역 페이지
 * @param request
 * @param reply
 */
exports.viewRecipe = function(request, reply) {

  const apiUrl = this.apiBaseUrl + '/recipes/'+request.params.id;
  Wreck.get(apiUrl, {json: true}, (err, res, payload) => {
    if (err) {
      throw err;
    }
    reply.view('recipe', {recipe: payload});
  });
};

exports.login = function(request, reply) {
  reply.view('login');
};

exports.loginPost = function(request, reply) {
  const apiUrl = this.apiBaseUrl + '/login';
  Wreck.post(apiUrl, {
    payload: JSON.stringify(request.payload),
    json: true
  },(err, res, payload) => {
    if (err) {
      throw err;
    }

    if (res.statusCode !== 200) {
      return reply.redirect(this.webBaseUrl + '/login');
    }

    request.cookieAuth.set({
      token: payload.token,
      id: payload.id
    });

    reply.redirect(this.webBaseUrl);
  });
};


exports.logout = function (request, reply) {
  request.cookieAuth.clear();
  reply.redirect(this.webBaseUrl);
};

exports.createRecipe = function(request, reply) {
  reply.view('create', {
    user: request.auth.credentials
  });
};

exports.createRecipePost = function(request, reply) {
  const apiUrl = this.apiBaseUrl + '/recipes';
  const token = request.auth.credentials.token;

  Wreck.post(apiUrl, {
    payload: JSON.stringify(request.payload),
    headers: {
      'Authorization' : 'Bearer ' + token
    }
  },(err, res, payload) => {
    if (err) {
      throw err;
    }
    reply.redirect(this.webBaseUrl);
  });
}
