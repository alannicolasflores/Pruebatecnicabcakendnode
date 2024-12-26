const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.uploadImage, userController.createUser);
router.get('/users', userController.listUsers);
router.put('/users/:id', userController.uploadImage, userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
