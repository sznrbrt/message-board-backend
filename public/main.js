'use strict';

$(function() {
  $('#addPost').on('click', addPost);
  $('.posts').on('click', '.deleteButton', deletePost);
  $('.posts').on('click', '.editButton', openEditPost);
  $('#editPost').click(editPost);
  renderPosts();
});



function renderPosts() {
  $.getJSON(`./api/posts`)
      .done(function(data) {
        var $posts = [];
        data.forEach(function(post){
          $posts.push(createPostItem(post.name, post.imgUrl, post.content, post.day, post.time, post.id));
        });
        $('.posts').append($posts);
      })
      .fail(function(err) {
          console.log(err);
      });
}
function openEditPost() {
  var id = $(this).closest('.aPost').data('uuid');
  var $post = $(this).closest('.aPost');
  var editablePost = {};
  editablePost.name =  $post.find('.name').text();
  editablePost.url = $post.find('.postImage').attr('src');
  editablePost.post = $post.find('.postContent').text();
  var editModal = $('.bs-edit-modal-sm');
  editModal.data('uuid', id);
  editModal.find('#edit-input-name').val(editablePost.name);
  editModal.find('#edit-input-url').val(editablePost.url);
  editModal.find('#edit-input-post').val(editablePost.post);
}

function editPost() {
  var post = {};

  newPost.addedT = moment().format('MMMM Do YYYY, h:mm a').split(',');

  var editModal = $('.bs-edit-modal-sm');
  var id = editModal.data('uuid');
  post.name = editModal.find('#edit-input-name').val();
  post.imgUrl = editModal.find('#edit-input-url').val();
  post.content = editModal.find('#edit-input-post').val();
  post.day = newPost.addedT[0] + ', ';
  post.time = newPost.addedT[1];

  if(newPost.name == '@') {
    $('#name').addClass('has-error');
    return;
  }

  if(newPost.post == '') {
    $('#post').text('This will be an empty post. Are you sure?');
    return;
  }
  if(newPost.post === 'This will be an empty post. Are you sure?') {
    newPost.post = "";
  }

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "./api/posts/" + id,
    "method": "PUT",
    "headers": {
      "cache-control": "no-cache",
      "postman-token": "6409b128-2ab5-0883-860a-56a3f0ea9861",
      "content-type": "application/x-www-form-urlencoded"
    },
    "data": {
      "name": post.name,
      "time": post.time,
      "day": post.day,
      "imgUrl": post.imgUrl,
      "content": post.content,
    }
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
  $('.modal').modal('hide');
  location.reload();
}

function deletePost(){
  var id = $(this).closest('.aPost').data('uuid');

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "./api/posts/" + id,
    "method": "DELETE",
    "headers": {
      "cache-control": "no-cache",
      "postman-token": "0d750596-6e28-46b9-17cc-151d070294ab",
      "content-type": "application/x-www-form-urlencoded"
    }
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
  $(this).closest('.aPost').remove();
}

function addPost() {
  var newPost = {};
  newPost.name = $('#input-name').val();
  newPost.url = $('#input-url').val() || "http://placehold.it/100x100";
  newPost.post = $('#post').val()
  newPost.addedT = moment().format('MMMM Do YYYY, h:mm a').split(',');
  newPost.day = newPost.addedT[0] + ', ';
  newPost.time = newPost.addedT[1];

  if(newPost.name == '@') {
    $('#name').addClass('has-error');
    return;
  }

  if(newPost.post == '') {
    $('#post').text('This will be an empty post. Are you sure?');
    return;
  }
  if(newPost.post === 'This will be an empty post. Are you sure?') {
    newPost.post = "";
  }

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "./api/posts",
    "method": "POST",
    "headers": {
      "cache-control": "no-cache",
      "postman-token": "d4f6f3e7-31d8-bdea-a442-d49be9caeb49",
      "content-type": "application/x-www-form-urlencoded"
    },
    "data": {
      "name": newPost.name,
      "time": newPost.time,
      "day": newPost.day,
      "imgUrl": newPost.url,
      "content": newPost.post
    }
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
  });

  var $postItem = createPostItem(newPost.name, newPost.url, newPost.post, newPost.day, newPost.time, newPost.id);

  $postItem.addClass('animated slideInRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $($postItem).removeClass('animated ' + 'slideInRight');
        });

  $('.posts').append($postItem);
  $('.modal').modal('hide');
  $('.newPost').addClass('animated rubberBand').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $('.newPost').removeClass('animated ' + 'rubberBand');
        });
  $('.has-error').removeClass('has-error');
}

function createPostItem(name, url, post, day, time, uuid) {
  var $postItem = $('.template').clone().removeClass('template').data('uuid', uuid).addClass('aPost');
  $postItem.find('.name').text(name);
  $postItem.find('.postImage').attr('src', url);
  $postItem.find('.postContent').text(post);
  $postItem.find('.day').text(day);
  $postItem.find('.time').text(time);
  return $postItem;
}
