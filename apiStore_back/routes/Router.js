const express = require('express');
const UserController = require('../controllers/UserController');
const ProductsController = require('../controllers/ProductsController');
const { Router }= require ("express");

const router = Router();

//Users routes
router.get('/users', UserController.find);
router.get('/user/:id', UserController.findById);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);
router.post('/login', UserController.login);
router.post('/register', UserController.register);

//Products routes
router.get('/products', ProductsController.find);
router.get('/product/:id', ProductsController.findById);
router.post('/products', ProductsController.create);
router.put('/product/:id', ProductsController.update);
router.delete('/product/:id', ProductsController.delete);

module.exports = router;