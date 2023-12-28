const express = require('express');
const {SignUp,Login,Logout} = require('../Controller/controller');
const isLoggedin = require('../MiddleWare/auth');
const { createTask, updateTask, getTask, getAllTask, deleteTask } = require('../Controller/TaskController');


const router = express.Router();

router.route('/register').post(SignUp)
router.route('/login').post(Login)
router.route('/logout').get(Logout)
router.route('/create-task').post(isLoggedin, createTask)
router.route('/update-task/:id').patch(isLoggedin, updateTask)
router.route('/get-task/:id').get(isLoggedin, getTask)
router.route('/getall-task').get(isLoggedin, getAllTask)
router.route('/delete-task/:id').delete(isLoggedin, deleteTask)

module.exports = router