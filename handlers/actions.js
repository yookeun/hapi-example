'use strict'

const Bcrypt = require('bcrypt-nodejs')

exports.login = function(request, reply) {
  const sql = 'SELECT * FROM users WHERE username = ?'
  this.db.get(sql,  [request.payload.username], (err, result) => {
    if (err) {
      throw err;
    }
    
    const user = result;
    if (!user) {
      return reply('Not authorized').code(401);
    }

    Bcrypt.compare(request.payload.password, user.password, (err, res) => {
      if (err) {
        throw err;
      }
      if (!res) {
        //return reply('Not authorized').code(401);
         return reply.redirect('/login');
      }
      request.cookieAuth.set({token: user.token});
      reply.redirect('http://localhost:4000/');
    });
  });
};
