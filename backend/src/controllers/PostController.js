const Post = require('../models/Post')

module.exports = {
    async index(request, response) {
        const posts = await Post.find({}).sort('-createdAt')

        return response.json(posts)
    },
    async store(request, response) {
        const { data } = request.body
        const post = await Post.create(data)

        return response.json(post)
    }
}