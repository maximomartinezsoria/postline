const express = require('express')
const passport = require('passport')
const { ObjectId } = require('mongodb')
const PostService = require('../services/Post')
const validationHandler = require('../utils/middlewares/validationHandler')
const PostSchema = require('../utils/schemas/PostSchema')

require('../utils/auth/jwtStrategy')

function postsRoutes(app) {
  const router = express.Router()

  app.use('/api/posts', router)

  const Post = new PostService()

  router.get('/:userId?/:postId?',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      let queryArgs = {}
      const { userId, postId } = req.query
      if (userId || postId) queryArgs = { $or: [{ user_id: userId }, { _id: ObjectId(postId) }] }

      const posts = await Post.get(queryArgs)
      res.status(200).json(posts)
    })

  router.post('/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(PostSchema),
    async (req, res) => {
      const postId = await Post.create(req.body)
      res.status(201).json(postId)
    })
}

module.exports = postsRoutes
