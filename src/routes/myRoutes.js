const express = require('express'); // Express import.
const router = express.Router();
const myRoutesController = require('../controller/myRoutesController'); // Controller .

router

    //Home
    .get('/',myRoutesController.getHome)
    
    //login
    .get('/login',myRoutesController.getLogin)

    
    // The login page "post" for the proper data retrieval from the database using the 'postLogin' module.

    .post('/login',myRoutesController.postLogin)

    //Register
    .get('/register',myRoutesController.getRegister)

    // The registration page "post" for the proper insertion of data into the database using the 'postRegister' module.
    .post('/register',myRoutesController.postRegister)

    //Product List
    .get('/list',myRoutesController.getList)

    //Products
    .get('/product',myRoutesController.getProduct)

    //Logout
    .get('/logout',myRoutesController.getLogout);

module.exports = router;