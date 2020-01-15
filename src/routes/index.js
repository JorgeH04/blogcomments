const express = require('express');
const router = express.Router();

const Task = require('../models/task');


router.get('/',  (req, res) => {
    res.render('index')
});

router.get('/contacto', async (req, res) => {
    const tasks = await Task.find();
    res.render('contacto', {
        tasks
    });
});

router.post('/add', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.redirect('contacto');
});


router.get('/bloglist/:page',   async (req, res) => {
    let perPage = 9;
    let page = req.params.page || 1;
  
    Task
      .find({}) // finding all documents
      .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
      .limit(perPage) // output just 9 items
      .exec((err, blog) => {
        Task.count((err, count) => { // count to calculate the number of pages
          if (err) return next(err);
          res.render('blog/bloglist', {
            blog,
            current: page,
            pages: Math.ceil(count / perPage)
          });
        });
      });
  });



router.get('/contacto',  (req, res) => {
    res.render('contacto')
});







router.get('/contacto',  (req, res) => {
    res.render('contacto')
});

router.get('/informacion',  (req, res) => {
    res.render('informacion')
});

router.get('/contable',  (req, res) => {
    res.render('contable')
});

router.get('/impositivo',  (req, res) => {
    res.render('impositivo')
});

router.get('/laboral',  (req, res) => {
    res.render('laboral')
});



module.exports = router;
