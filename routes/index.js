const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.render('index', {title: 'ECS 2018 - Welcome!'}))
router.get('/dashboard', (req, res) => res.render('dashboard', {title: 'Dashboard'}))
router.get('/upcoming-talks', (req, res) => res.render('upcoming-talks', {title: 'Upcoming Talks'}))
router.get('/accommodation', (req, res) => res.render('accommodation', {title: 'Accomodation'}))
router.get('/schedule', (req, res) => res.render('schedule', {title: 'ECS 2018 - Welcome!'}))
router.get('/restaurants', (req, res) => res.render('restaurants', {title: 'ECS 2018 - Welcome!'}))
router.get('/map', (req, res) => res.render('map', {title: 'ECS 2018 - Welcome!'}))
router.get('/lecture-halls', (req, res) => res.render('lecture-halls', {title: 'ECS 2018 - Welcome!'}))

module.exports = router





