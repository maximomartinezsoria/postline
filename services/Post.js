const Model = require('../lib/Model')
const UserService = require('./User')

class Post {
  constructor() {
    this.db = new Model('posts')
  }

  async get(query) {
    const posts = await this.db.get(query)
    return posts || []
  }

  async create(post) {
    const postId = await this.db.create(post)

    const User = new UserService()
    await User.addPost(post.user_id, postId)

    return postId
  }
}

module.exports = Post
