const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')
const Model = require('../lib/Model')

class User {
  constructor() {
    this.db = new Model('users')
  }

  async get(query) {
    const users = await this.db.get(query)
    return users || []
  }

  async findOne(query) {
    const user = await this.db.findOne(query)
    return user
  }

  async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = {
      ...data,
      password: hashedPassword,
      messages: [],
      posts: [],
    }

    const userId = await this.db.create(user)
    return userId
  }

  async update(id, data) {
    const userId = await this.db.update(id, data)
    return userId
  }

  async addMessage(id, messageId) {
    try {
      const user = await this.db.findOne({ _id: ObjectId(id) })
      user.messages = [...user.messages, messageId]
      const userId = await this.db.update(id, user)
      return userId
    } catch (e) {
      next(e)
    }
  }

  async addPost(id, postId) {
    try {
      const user = await this.db.findOne({ _id: ObjectId(id) })
      user.posts = [...user.posts, postId]
      const userId = await this.db.update(id, user)
      return userId
    } catch (e) {
      next(e)
    }
  }
}

module.exports = User
