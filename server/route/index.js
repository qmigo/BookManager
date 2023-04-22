const router = require('express').Router()
const authenticateUser = require('../middleware/authMiddleware')

const {
    addBook,
    deleteBook,
    listAllBook
} = require('../controllers/book')

const {
    register,
    login,
    dashboard
} = require('../controllers/user')

router.route('/book/').post(authenticateUser ,addBook).get(listAllBook)
router.route('/book/:bookId').delete(authenticateUser, deleteBook)

router.route('/auth/login').post(login)
router.route('/auth/register').post(register)
router.route('/user').get(authenticateUser, dashboard)

module.exports = router
