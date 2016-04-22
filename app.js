'use strict';

const PORT = process.env.PORT || 3000;

var Post = require('./models/post');

// loading libraries
const jade = require('jade');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

var app = express();

// general purpose middleware
app.use( morgan('dev') );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use( express.static('public') );
app.set('view engine', 'jade');

// routes
app.route('/api/posts')
  .get((req, res, next) => {
    // get all posts
    Post.findAll((err, posts) => {
      if(err) {
        return res.status(400).send(err);
      }
      res.json(posts);
    });
  })
  .post((req, res, next) => {
    //create a new post
    Post.create(req.body, err => {
      if(err) return res.status(400).send(err);
      res.send(null);
    });
  })

app.route('/api/posts/:id')
  .get((req, res, next) => {
    //get one post
    var id = req.params.id;
    Post.findById(id, (err, post) => {
      if(err) {
        return res.status(400).send(err);
      }
      res.send(post);
    });
  })
  .delete((req, res, next) => {
    //delete one post by ID
    var id = req.params.id;
    Post.deleteById(id, (err, post) => {
      if(err) return res.status(400).send(err);
      res.send('You have deleted the post!');
    })
  })
  .put((req, res, next) => {
    //delete one post by ID
    var id = req.params.id;
    Post.editById(id, req.body, (err, post) => {
      if(err) return res.status(400).send(err);
      res.send('You have edited the post!');
    })
  })


// GET method routes for different pages
app.get('/', (req, res, next) => {
  res.render('splash');
})

app.get('/board', (req, res, next) => {
  res.render('posts');
})

// 404 handler
app.use((req, res, next) => {
  res.status(404).send({ "error": 'Page not found! 404'});
})

// create server, and listen to PORT
app.listen(PORT, (err) => {
  console.log(err || `Server listening on port ${PORT}`);
});
