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
