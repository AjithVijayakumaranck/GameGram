const AdminLoginController = require("../Controllers/AdminLoginController")

const router = require("express").Router()

// AdminLogin........................

router.post('/adminLogin',AdminLoginController.login)

// users........................

router.get('/getusers',AdminLoginController.getUsers)

router.post('/blockhandler',AdminLoginController.blockhandler)

router.get('/getsingleuser/:id',AdminLoginController.getSingleUser)

module.exports = router