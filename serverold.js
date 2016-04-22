// 'use strict';
//
// var posts = [
//   {
//     "name": '@norb',
//     "day": 'April 20th 2016,',
//     "time": '23:23 pm',
//     "imgUrl": 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Bubblesort_Animation.gif',
//     "content": 'Bubble sort is bananas!'
//   }
// ];
//
// const PORT = process.env.PORT || 3000;
//
// const jade = require('jade');
// const http = require('http');
// const nodeStatic = require('node-static');
// const qs = require('qs');
// const file = new nodeStatic.Server('./public');
//
// http.createServer((req, res) => {
//   let html;
//   let qsParts = req.url.split('?');
//   let path = qsParts[0];
//
//   switch(path) {
//     case '/':
//       html = jade.renderFile('./views/splash.jade');
//       res.end(html);
//       break;
//     case '/board':
//       html = jade.renderFile('./views/posts.jade', {"posts": posts});
//       res.end(html);
//       break;
//   }
//
//
//   file.serve(req, res);
// })
// .listen(PORT, err => {
//   if(err) return console.log('err:', err);
//   console.log(`Node server is listening on ${PORT}`);
// });
