'use strict';

var fs = require('fs');
var uuid = require('uuid');
var path = require('path');

var dataFile = path.join(__dirname, '../data/posts.json');

// This is going to have the job to interact with the data

// Read and return all the post
exports.findAll = function(callback) {

  fs.readFile(dataFile, (err, data) => {
    if(err){
      callback(err);
      return;
    }

    try {
      var posts = JSON.parse(data);
    } catch (err) {
      return callback(err);
    }

    callback(null, posts);
  });
}

// Create a new post and save it to the DB
exports.create = function(post, callback) {
  this.findAll((err, posts) => {
    if(err) {
      return callback(err);
    }

    if(!post.name) {
      return callback('Post must have all attributes filled out');
    }

    console.log('post:', post);
    var newPost = {
      name: post.name,
      day: post.day,
      time: post.time,
      imgUrl: post.imgUrl,
      content: post.content,
      id: uuid()
    };

    posts.push(newPost);

    fs.writeFile(dataFile, JSON.stringify(posts), err => {
      if(err) {
        return callback(err);
      }
      callback(err, newPost.id);
    });

  });
}

// Find a post by id in the DB
exports.findById= function(id, callback) {
  if(!id) return cb('id required');

  this.findAll((err, posts) => {
    if(err) {
      return callback(err);
    }
    if(!id) {
      return callback('You must define an id.');
    }

    var post = posts.filter(post => {return post.id === id})[0];

    callback(null, post);
  });
}

// Delete a post by id in the DB
exports.deleteById= function(id, callback) {
  if(!id) return cb('id required');

  this.findAll((err, posts) => {
    if(err) {
      return callback(err);
    }
    if(!id) {
      return callback('You must define an id.');
    }

    var modifiedPosts = posts.filter(post => {return post.id !== id});
    fs.writeFile(dataFile, JSON.stringify(modifiedPosts), (err, data) => {
      if(err){
        console.log(err);
        return;
      }
      callback(null, posts);
    });
  });
}

// Delete a post by id in the DB
exports.editById= function(id, post, callback) {
  console.log(post);
  console.log(id);
  if(!post || !id) return callback('id and post required');
  this.findAll((err, posts) => {
    if(err) {
      return callback(err);
    }
    if(!posts) {
      return callback('You must define a post to edit!');
    }
    post.id = id;
    var updatedPosts = posts.map(cPost => {
      if(cPost.id !== id) return cPost;
      else return post;
    });

    fs.writeFile(dataFile, JSON.stringify(updatedPosts), (err, data) => {
      if(err){
        console.log(err);
        return;
      }
      callback(null);
    });
  });
}
