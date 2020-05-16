const Model = require('../lib/Model')
const UserService = require('./User')

class Message {
  constructor() {
    this.db = new Model('messages')
  }

  async get(query) {
    const messages = await this.db.get(query)
    return messages || []
  }

  async create(message) {
    const messageId = await this.db.create(message)

    const User = new UserService()
    await User.addMessage(message.emitter, messageId)

    return messageId
  }
}

module.exports = Message
