const { Router } = require('express')

const PostController = require('./controllers/PostController')
const LikeController = require('./controllers/LikeController')

const routes = Router()

routes.get('/posts', PostController.index)
routes.post('/posts', PostController.store)

routes.post('/likes', LikeController.store)

module.exports = routes