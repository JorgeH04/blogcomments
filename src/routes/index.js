const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const Comment = require('../models/comment');

router.get('/', async (req, res) => {
  res.render('portada')
});


router.get('/allposts', async (req, res) => {
  const post = await Post
  .find()
  .sort({ timestamp: -1 });
  const comments = await Comment
  .find({post_id: post._id})
  .sort({ timestamp: -1 });
  res.render('allposts', {
    post, comments
  });
});


router.post('/add', async (req, res) => {
  const task = new Post(req.body);
  await task.save();
  res.redirect('/indexbackend/1');
});



router.get('/postRedirect/:post_id', async (req, res) => {
    const { post_id } = req.params;
    const post = await Post.findById(post_id);
    const count = await Comment.countDocuments(post_id);
    const comments = await Comment.
    find({post_id: post._id})
    .sort({ timestamp: -1 });

    //console.log(post);
    //res.send('recibido');
     res.render('postRedirect', {post, comments, count});
  });


  router.get('/postbackend/:post_id', async (req, res) => {
    const { post_id } = req.params;
    const post = await Post.findById(post_id);
    const comments = await Comment.find({post_id: post._id});
    //console.log(post);
    //res.send('recibido');
     res.render('postbackend', {post, comments});
  });  


  //router.get('/allposts/:post_id', async (req, res) => {
    //const { post_id } = req.params;
    //const post = await Post.findById(post_id);
    //const comments = await Comment.find({post_id: post._id});
    //console.log(post);
    //res.send('recibido');
    // res.redirect('allpostsRedirect', {post, comments});
  //});

  router.post('/post/:post_id/comment', async (req, res, next) => {
    const post = await Post.findById(req.params.post_id);
    if (post) {
      const newComment = new Comment(req.body);
      newComment.post_id = post._id
      //console.log(newComment);  
      await newComment.save();
      res.redirect('/postRedirect/' + post._id + '#' + newComment._id )
    }
    //console.log(newComment);  
    //console.log(req.params.post_id);  
  });
    
  

  router.get('/index/:page',   async (req, res) => {

    let perPage = 9;
    let page = req.params.page || 1;
  
    Post
      .find({}) // finding all documents
      .sort({ timestamp: -1 })
      .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
      .limit(perPage) // output just 9 items
      .exec((err, post) => {
        Post.countDocuments((err, count) => { // count to calculate the number of pages
          if (err) return next(err);
          res.render('index', {
            post,
            current: page,
            pages: Math.ceil(count / perPage)
          });
        });
      });
  });




router.get('/indexbackend/:page',   async (req, res) => {
    let perPage = 9;
    let page = req.params.page || 1;
  
    Post
      .find({}) // finding all documents
      .sort({ timestamp: -1 })
      .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
      .limit(perPage) // output just 9 items
      .exec((err, post) => {
        Post.countDocuments((err, count) => { // count to calculate the number of pages
          if (err) return next(err);
          res.render('indexbackend', {
            post,
            current: page,
            pages: Math.ceil(count / perPage)
          });
        });
      });
  });



  router.get('/delete/:id', async (req, res, next) => {
    const { id } = req.params;
    await Post.remove({_id: id});
    res.redirect('/indexbackend/1');
  });


  router.get('/delete/comment/:id', async (req, res, next) => {
    const { id } = req.params;
    await Comment.deleteOne({_id: id});
    res.redirect('/indexbackend/1');
  });

 




module.exports = router;
