const { MongoClient, ObjectId } = require('mongodb')
const config = require('../config')

const mongoURI = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}test?retryWrites=true&w=majority`

class Model {
  constructor(collection) {
    this.client = new MongoClient(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    this.dbName = config.dbName
    this.collection = collection
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect((error) => {
        if (error) reject(error)

        console.log('MongoDB connected successfully')
        const connection = this.client.db(this.dbName).collection(this.collection)
        resolve(connection)
      })
    })
  }

  async get(query) {
    const db = await this.connect()
    const result = await db.find(query).toArray()

    return result
  }

  async findOne(query) {
    const db = await this.connect()
    const result = await db.findOne(query)
    return result
  }

  async findById(id) {
    const db = await this.connect()
    const result = await db.findOne({ _id: ObjectId(id) })
    return result
  }

  async create(data) {
    const db = await this.connect()
    const inserted = await db.insertOne(data)
    return inserted.insertedId
  }

  async update(id, data) {
    const db = await this.connect()
    const updated = await db.updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
    return updated.upsertedId || id
  }

  async delete(id) {
    const db = await this.connect()
    await db.deleteOne({ _id: ObjectId(id) })
    return id
  }
}

module.exports = Model
