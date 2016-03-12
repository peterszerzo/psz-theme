import express from 'express'

import postSummaries from './post_summaries.json'
import post from './post.js'

const app = express()

app.use(express.static(__dirname + '/../assets'))

app.get('/testapi/posts', function(req, res) {
  res.json(postSummaries)
})

app.get('/testapi/posts/slug/:slug', function(req, res) {
  res.json(post(req.params.slug))
})

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(1999, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('Listening on post 1999')
})
