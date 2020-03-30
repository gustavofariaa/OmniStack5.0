const Post = require('../models/Post')

module.exports = {
    async store(request, response) {
        const { _id } = request.body
        const post = await Post.findById(_id)

        post.set({ likes: post.likes + 1 })
        await post.save()

        return response.json(post)
    }
}