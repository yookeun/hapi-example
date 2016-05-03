'use strict';

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
